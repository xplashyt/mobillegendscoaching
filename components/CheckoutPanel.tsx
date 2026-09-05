"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Icono } from "@/components/Icono";
import { CORREO_CONTACTO, HORAS_DE_ENTREGA } from "@/lib/contacto";
import { buildReference } from "@/lib/orders";
import { formatCOP, type Plan } from "@/lib/plans";
import {
  formatCardNumber,
  formatExpiry,
  isCardFormValid,
  tokenizeCard,
  WompiClientError
} from "@/lib/wompi-client";

type Phase = "form" | "procesando" | "aprobado" | "rechazado" | "expirado";
type TransactionStatus = "PENDING" | "APPROVED" | "DECLINED" | "VOIDED" | "ERROR";

interface BrowserTransaction {
  id: string;
  reference: string;
  status: TransactionStatus;
  status_message?: string | null;
  processor_response_code?: string | null;
}

interface AcceptanceLinks {
  terms: string;
  personalData: string;
}

interface AcceptancePayload extends Partial<AcceptanceLinks> {
  code?: "WOMPI_NOT_CONFIGURED" | "WOMPI_UNAVAILABLE";
}

interface ApiPayload extends Partial<BrowserTransaction> {
  message?: string;
  details?: string[];
}

interface FailureInfo {
  title: string;
  raw: string;
  explanation: string;
  details: string[];
  code?: string | null;
}

function failureInfo(rawMessage: string, code?: string | null, details: string[] = []): FailureInfo {
  const raw = rawMessage || "La pasarela no devolvió un motivo específico.";
  const text = `${code ?? ""} ${raw}`.toLowerCase();

  if (/ws05|por motivos de seguridad|security/.test(text)) {
    return {
      title: "Pago rechazado por seguridad",
      raw,
      code,
      details,
      explanation: "Este código no significa necesariamente que falten fondos ni confirma que exista fraude. Revisa los datos y prueba una sola vez con otra tarjeta."
    };
  }
  if (/fondos|cupo|insufficient|\b51\b/.test(text)) {
    return { title: "Fondos o cupo insuficiente", raw, code, details, explanation: "El banco no autorizó el valor. Revisa el cupo disponible o utiliza otra tarjeta." };
  }
  if (/vencid|expired|\b54\b/.test(text)) {
    return { title: "Tarjeta vencida", raw, code, details, explanation: "Comprueba la fecha o utiliza una tarjeta vigente." };
  }
  if (/cvc|cvv|security code|\bn7\b/.test(text)) {
    return { title: "Revisa el código de seguridad", raw, code, details, explanation: "Vuelve al formulario y escribe el CVC/CVV de la tarjeta." };
  }
  if (/bloquead|blocked|not permitted|no permitida|\b57\b/.test(text)) {
    return { title: "Operación no permitida", raw, code, details, explanation: "Consulta con tu banco si la tarjeta está habilitada para compras por internet." };
  }
  if (/sandbox|ambiente de pruebas|test card/.test(text)) {
    return { title: "La tarjeta no corresponde al ambiente", raw, code, details, explanation: "Las tarjetas reales requieren las cuatro llaves de producción. Las llaves de prueba solo admiten tarjetas de sandbox." };
  }
  if (/fraud|riesgo|risk/.test(text)) {
    return { title: "Revisión de seguridad", raw, code, details, explanation: "La ruta de pago aplicó un control antifraude. Esto no confirma fraude; prueba una sola vez con otra tarjeta o consulta con el banco." };
  }

  return { title: "El pago no pasó", raw, code, details, explanation: "Revisa los datos, intenta una sola vez con otra tarjeta y conserva la referencia si necesitas soporte." };
}

export function CheckoutPanel({ plan, onClose }: { plan: Plan | null; onClose: () => void }) {
  return plan ? <CheckoutContent key={plan.id} plan={plan} onClose={onClose} /> : null;
}

function CheckoutContent({ plan, onClose }: { plan: Plan; onClose: () => void }) {
  const open = true;
  const dialogRef = useRef<HTMLElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [phase, setPhase] = useState<Phase>("form");
  const [email, setEmail] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptance, setAcceptance] = useState<AcceptanceLinks | null>(null);
  const [acceptanceState, setAcceptanceState] = useState<"loading" | "preview" | "error">("loading");
  const [transaction, setTransaction] = useState<BrowserTransaction | null>(null);
  const [failure, setFailure] = useState<FailureInfo | null>(null);
  const [reference, setReference] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [copied, setCopied] = useState(false);

  const [expMonth = "", expYear = ""] = expiry.split("/");
  const card = useMemo(
    () => ({ number: cardNumber, cvc, expMonth, expYear, cardHolder }),
    [cardNumber, cvc, expMonth, expYear, cardHolder]
  );
  const canPay = Boolean(plan && acceptedTerms && acceptance && isCardFormValid(card, email));

  useEffect(() => {
    const frame = requestAnimationFrame(() => emailRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex='-1'])"
      ));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    fetch("/api/wompi/acceptance", { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        const data = (await response.json()) as AcceptancePayload;
        if (!response.ok || !data.terms || !data.personalData) {
          setAcceptanceState(data.code === "WOMPI_NOT_CONFIGURED" ? "preview" : "error");
          return;
        }
        setAcceptance({ terms: data.terms, personalData: data.personalData });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setAcceptanceState("error");
      });
    return () => controller.abort();
  }, [open]);

  useEffect(() => {
    if (!open || phase !== "procesando") return;
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [open, phase]);

  useEffect(() => {
    if (!open || phase !== "procesando" || transaction?.status !== "PENDING") return;
    let active = true;
    let timer: number | undefined;
    const started = Date.now();

    const check = async () => {
      if (!active) return;
      if (Date.now() - started >= 5 * 60 * 1000) {
        setPhase("expirado");
        return;
      }
      try {
        const response = await fetch(`/api/wompi/status/${encodeURIComponent(transaction.id)}`, { cache: "no-store" });
        const data = (await response.json()) as ApiPayload;
        if (response.ok && data.id && data.status) {
          const next = data as BrowserTransaction;
          setTransaction(next);
          if (next.status === "APPROVED") setPhase("aprobado");
          if (["DECLINED", "VOIDED", "ERROR"].includes(next.status)) {
            setFailure(failureInfo(next.status_message ?? "", next.processor_response_code));
            setPhase("rechazado");
          }
        }
      } catch {
        // La consulta continúa hasta recibir un estado final o completar cinco minutos.
      }
      if (active) timer = window.setTimeout(check, 2500);
    };

    timer = window.setTimeout(check, 2500);
    return () => {
      active = false;
      if (timer) window.clearTimeout(timer);
    };
  }, [open, phase, transaction?.id, transaction?.status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canPay || !plan) return;
    setPhase("procesando");
    setElapsed(0);
    setFailure(null);

    const nextReference = buildReference(plan.id);
    setReference(nextReference);

    try {
      const token = await tokenizeCard(card);
      const response = await fetch("/api/wompi/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          fullName: cardHolder.trim(),
          email: email.trim(),
          reference: nextReference,
          acceptedTerms: true
        })
      });
      const data = (await response.json()) as ApiPayload;

      if (!response.ok || !data.id || !data.status) {
        setFailure(failureInfo(data.message ?? "Wompi no pudo crear la transacción.", data.processor_response_code, data.details));
        setPhase("rechazado");
        return;
      }

      const next = data as BrowserTransaction;
      setTransaction(next);
      if (next.status === "APPROVED") setPhase("aprobado");
      else if (next.status === "PENDING") setPhase("procesando");
      else {
        setFailure(failureInfo(next.status_message ?? "", next.processor_response_code));
        setPhase("rechazado");
      }
    } catch (error) {
      const raw = error instanceof Error ? error.message : "No fue posible iniciar el pago.";
      const safe = raw.includes("NEXT_PUBLIC_WOMPI") ? "El pago todavía no está configurado." : raw;
      const details = error instanceof WompiClientError ? error.details : [];
      setFailure(failureInfo(safe, null, details));
      setPhase("rechazado");
    }
  }

  async function copyReference() {
    if (!reference) return;
    await navigator.clipboard.writeText(reference);
    setCopied(true);
  }

  const shownTransactionId = transaction?.id ?? "Pendiente de asignación";
  const extraDetails = failure?.details.filter((detail) => detail !== failure.raw) ?? [];

  return (
    <div className="fixed inset-0 z-50 bg-tinta/80" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="checkout-title" className="checkout-drawer h-full w-full max-w-[920px] overflow-y-auto border-r-4 border-objetivo bg-niebla shadow-[18px_0_0_rgb(17_26_34/28%)]">
        <header className="sticky top-0 z-10 flex items-center justify-between gap-5 border-b-2 border-tinta bg-papel px-5 py-4 sm:px-8">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-jade">Mesa de pago // tarjeta</p>
            <h2 id="checkout-title" className="truncate font-display text-3xl font-extrabold uppercase text-cobalto">{plan.name}</h2>
          </div>
          <div className="flex items-center gap-5">
            <strong className="hidden font-display text-3xl font-extrabold text-alerta sm:block">{formatCOP(plan.priceCOP)}</strong>
            <button type="button" onClick={onClose} className="grid h-11 w-11 place-items-center border-2 border-tinta font-display text-2xl font-bold" aria-label="Cerrar pago">×</button>
          </div>
        </header>

        {phase === "form" && (
          <form onSubmit={submit} className="px-5 py-7 sm:px-8 sm:py-9">
            <div className="grid border-2 border-tinta bg-cobalto text-papel sm:grid-cols-[1fr_auto]">
              <div className="p-5 sm:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-objetivo">Ficha seleccionada</p>
                <h3 className="mt-2 font-display text-4xl font-extrabold uppercase leading-[0.9]">{plan.name}</h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-papel/70">{plan.summary}</p>
              </div>
              <dl className="grid grid-cols-2 border-t-2 border-niebla/30 sm:w-[250px] sm:border-l-2 sm:border-t-0">
                <div className="p-4"><dt className="text-[10px] uppercase tracking-[0.14em] text-niebla/55">Formato</dt><dd className="mt-1 font-display font-bold uppercase">{plan.format}</dd></div>
                <div className="border-l border-niebla/25 p-4"><dt className="text-[10px] uppercase tracking-[0.14em] text-niebla/55">Cobro</dt><dd className="mt-1 font-display font-bold uppercase">Único</dd></div>
              </dl>
            </div>

            <div className="mt-8 flex items-end justify-between gap-4 border-b-2 border-tinta pb-5">
              <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-cobalto">Total de la ficha</p><strong className="font-display text-5xl font-extrabold tracking-[-0.04em] text-alerta">{formatCOP(plan.priceCOP)}</strong></div>
              <div className="flex items-center gap-2 text-right text-sm font-semibold text-cobalto"><Icono name="escudo" className="h-6 w-6" />Procesado por Wompi</div>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label className="sm:col-span-2"><span className="field-label">Correo para coordinar la entrega</span><input ref={emailRef} name="email" type="email" inputMode="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="field-input" placeholder="tu@correo.com" /></label>
              <label className="sm:col-span-2"><span className="field-label">Nombre del titular</span><input name="card-holder" type="text" autoComplete="cc-name" required value={cardHolder} onChange={(event) => setCardHolder(event.target.value)} className="field-input uppercase" placeholder="COMO APARECE EN LA TARJETA" /></label>
              <label className="sm:col-span-2"><span className="field-label">Número de tarjeta</span><input name="card-number" type="text" inputMode="numeric" autoComplete="cc-number" required value={cardNumber} onChange={(event) => setCardNumber(formatCardNumber(event.target.value))} className="field-input tracking-[0.14em]" placeholder="0000 0000 0000 0000" maxLength={23} /></label>
              <label><span className="field-label">Vencimiento</span><input name="card-expiry" type="text" inputMode="numeric" autoComplete="cc-exp" required value={expiry} onChange={(event) => setExpiry(formatExpiry(event.target.value))} className="field-input tracking-[0.14em]" placeholder="MM/AA" maxLength={5} /></label>
              <label><span className="field-label">CVC / CVV</span><input name="card-cvc" type="password" inputMode="numeric" autoComplete="cc-csc" required value={cvc} onChange={(event) => setCvc(event.target.value.replace(/\D/g, "").slice(0, 4))} className="field-input tracking-[0.18em]" placeholder="•••" maxLength={4} /></label>
            </div>

            <div className="mt-6 border-y border-tinta/20 py-5" aria-live="polite">
              {acceptance ? (
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-5"><input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[#16836F]" /><span>Acepto los <a href={acceptance.terms} target="_blank" rel="noreferrer" className="font-bold underline">términos de Wompi</a> y la <a href={acceptance.personalData} target="_blank" rel="noreferrer" className="font-bold underline">autorización de datos personales</a>.</span></label>
              ) : acceptanceState === "preview" ? <p className="text-sm text-cobalto/75">Vista previa del formulario. Al colocar las cuatro llaves de Wompi, los contratos y el pago se activan sin cambiar el código.</p> : acceptanceState === "error" ? <p className="text-sm font-semibold text-alerta">No pudimos conectar con Wompi en este momento. Vuelve a abrir el formulario para reintentar o <a href={`mailto:${CORREO_CONTACTO}`} className="underline">contacta soporte</a>.</p> : <p className="text-sm text-cobalto">Cargando contratos de pago…</p>}
            </div>

            <button type="submit" disabled={!canPay} className="mt-6 flex w-full items-center justify-center gap-3 bg-tinta px-6 py-4 font-display text-2xl font-extrabold uppercase tracking-wide text-papel transition-colors enabled:hover:bg-cobalto disabled:cursor-not-allowed disabled:opacity-40"><Icono name="tarjeta" className="h-6 w-6" />Pagar {formatCOP(plan.priceCOP)}</button>
            <p className="mt-4 text-center text-xs leading-5 text-tinta/55">El número y el CVC se cifran en tu navegador y van directamente a Wompi. Nexo Cinco no los recibe ni los almacena.</p>
          </form>
        )}

        {phase === "procesando" && (
          <div className="grid min-h-[calc(100vh-82px)] place-items-center px-6 py-16 text-center" aria-live="polite" role="status">
            <div className="max-w-xl"><div className="mx-auto grid h-24 w-24 place-items-center rounded-full border-4 border-tinta bg-objetivo font-display text-3xl font-extrabold">{elapsed}s</div><p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-jade">Confirmando con Wompi</p><h3 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.9] text-cobalto">Tu pago está en proceso</h3><p className="mt-5 text-lg leading-7 text-tinta/65">No cierres esta ventana ni repitas el cobro. Estamos esperando el estado final de la transacción.</p>{reference && <p className="mt-6 break-all text-xs font-semibold text-cobalto">Ref. {reference}</p>}</div>
          </div>
        )}

        {phase === "aprobado" && (
          <div className="px-6 py-10 sm:px-10" aria-live="polite">
            <span className="grid h-16 w-16 place-items-center rounded-full border-4 border-jade font-display text-xl font-extrabold text-jade">OK</span>
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-jade">Pago confirmado</p>
            <h3 className="mt-3 max-w-2xl font-display text-5xl font-extrabold uppercase leading-[0.9] text-cobalto sm:text-6xl">La ficha ya quedó registrada.</h3>
            <p className="mt-5 max-w-2xl text-lg leading-7">Recibimos tu pago. Nos comunicaremos contigo a este correo para coordinar la entrega, en un máximo de {HORAS_DE_ENTREGA} horas hábiles.</p>
            <dl className="mt-8 divide-y divide-tinta/20 border-y-2 border-tinta">
              <div className="grid gap-1 py-4 sm:grid-cols-[150px_1fr]"><dt className="text-xs font-bold uppercase tracking-[0.14em] text-cobalto">Entrenamiento</dt><dd className="font-semibold">{plan.name}</dd></div>
              <div className="grid gap-1 py-4 sm:grid-cols-[150px_1fr]"><dt className="text-xs font-bold uppercase tracking-[0.14em] text-cobalto">Correo</dt><dd className="break-all font-semibold">{email}</dd></div>
              <div className="grid gap-1 py-4 sm:grid-cols-[150px_1fr]"><dt className="text-xs font-bold uppercase tracking-[0.14em] text-cobalto">Referencia</dt><dd className="break-all text-sm font-semibold tracking-[0.04em]">{reference}</dd></div>
              <div className="grid gap-1 py-4 sm:grid-cols-[150px_1fr]"><dt className="text-xs font-bold uppercase tracking-[0.14em] text-cobalto">ID Wompi</dt><dd className="break-all text-sm font-semibold tracking-[0.04em]">{shownTransactionId}</dd></div>
              <div className="grid gap-1 py-4 sm:grid-cols-[150px_1fr]"><dt className="text-xs font-bold uppercase tracking-[0.14em] text-cobalto">Total</dt><dd className="font-display text-2xl font-extrabold text-alerta">{formatCOP(plan.priceCOP)}</dd></div>
            </dl>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row"><button type="button" onClick={copyReference} className="bg-tinta px-6 py-3 font-display text-lg font-bold uppercase text-papel">{copied ? "Referencia copiada" : "Copiar referencia"}</button><a href={`mailto:${CORREO_CONTACTO}?subject=${encodeURIComponent(`Pago ${reference}`)}`} className="border-2 border-tinta px-6 py-3 text-center font-display text-lg font-bold uppercase">Contactar soporte</a></div>
            <p className="mt-5 text-sm text-tinta/65">Si no recibes contacto dentro del plazo, escribe a <a className="font-bold underline" href={`mailto:${CORREO_CONTACTO}?subject=${encodeURIComponent(`Pago ${reference}`)}`}>{CORREO_CONTACTO}</a> con la referencia o el comprobante.</p>
          </div>
        )}

        {phase === "rechazado" && failure && (
          <div className="px-6 py-10 sm:px-10" aria-live="assertive">
            <span className="grid h-16 w-16 place-items-center rounded-full border-4 border-alerta font-display text-3xl font-extrabold text-alerta">!</span>
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-alerta">Estado no aprobado</p>
            <h3 className="mt-3 max-w-2xl font-display text-5xl font-extrabold uppercase leading-[0.9] text-cobalto sm:text-6xl">{failure.title}</h3>
            <p className="mt-5 max-w-2xl text-lg font-semibold leading-7">{failure.explanation}</p>
            <div className="mt-7 border-l-4 border-alerta bg-papel p-5"><p className="text-xs font-bold uppercase tracking-[0.14em] text-cobalto">Mensaje exacto de la pasarela</p><p className="mt-2 whitespace-pre-wrap leading-6">{failure.raw}</p>{failure.code && <p className="mt-3 text-sm font-semibold tracking-[0.04em] text-cobalto">Código: {failure.code}</p>}{extraDetails.length > 0 && <ul className="mt-4 list-inside list-disc space-y-1 text-sm">{extraDetails.map((detail) => <li key={detail}>{detail}</li>)}</ul>}</div>
            {reference && <p className="mt-5 break-all text-xs font-semibold tracking-[0.04em] text-cobalto">Ref. {reference}</p>}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row"><button type="button" onClick={() => setPhase("form")} className="bg-tinta px-6 py-3 font-display text-lg font-bold uppercase text-papel">Corregir datos</button><a href={`mailto:${CORREO_CONTACTO}?subject=${encodeURIComponent(`Ayuda con pago ${reference}`)}`} className="border-2 border-tinta px-6 py-3 text-center font-display text-lg font-bold uppercase">Pedir ayuda</a></div>
          </div>
        )}

        {phase === "expirado" && (
          <div className="grid min-h-[calc(100vh-82px)] place-items-center px-6 py-16 text-center" aria-live="polite"><div className="max-w-xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-jade">La consulta llegó a cinco minutos</p><h3 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.9] text-cobalto">El pago sigue en proceso</h3><p className="mt-5 text-lg leading-7 text-tinta/65">No significa que haya fallado. Cuando Wompi lo confirme, nos comunicaremos al correo registrado. Conserva esta referencia.</p><p className="mt-6 break-all border-2 border-tinta bg-papel p-4 text-sm font-semibold tracking-[0.04em]">{reference}</p><a href={`mailto:${CORREO_CONTACTO}?subject=${encodeURIComponent(`Pago pendiente ${reference}`)}`} className="mt-6 inline-block bg-tinta px-6 py-3 font-display text-lg font-bold uppercase text-papel">Contactar soporte</a></div></div>
        )}
      </section>
    </div>
  );
}
