"use client";

import { useCallback, useState } from "react";
import { CheckoutPanel } from "@/components/CheckoutPanel";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Icono, type IconName } from "@/components/Icono";
import { PlanCard } from "@/components/PlanCard";
import { Separador } from "@/components/Separador";
import { Tabla } from "@/components/Tabla";
import { TrustBar } from "@/components/TrustBar";
import { rankRoute, rolePositions } from "@/lib/datos";
import { plans, type Plan } from "@/lib/plans";
import { CORREO_CONTACTO, HORAS_DE_ENTREGA } from "@/lib/contacto";

const pillars: Array<{ marker: string; title: string; copy: string; icon: IconName }> = [
  {
    marker: "LÍNEA",
    title: "Gana espacio antes de buscar la baja",
    copy: "Trabajamos oleadas, intercambios, arbustos, visión y ventanas de regreso para que tu línea tenga un propósito.",
    icon: "linea"
  },
  {
    marker: "MAPA",
    title: "Muévete por una razón verificable",
    copy: "Leemos héroes visibles, prioridad de líneas y recursos disponibles antes de rotar, invadir o iniciar un objetivo.",
    icon: "objetivo"
  },
  {
    marker: "DRAFT",
    title: "Define cómo quiere ganar el equipo",
    copy: "Ordenamos posiciones, comodidad, condiciones de victoria y respuestas para que cinco picks formen una composición.",
    icon: "draft"
  }
];

const steps = [
  ["01", "Elige una ficha", "Compara el problema, el formato y el alcance. Todos los precios son pagos únicos."],
  ["02", "Paga con tarjeta", "Wompi procesa la transacción. Nexo Cinco nunca recibe tu número ni tu CVC."],
  ["03", "Coordinamos por correo", `Con el pago aprobado, te escribimos en máximo ${HORAS_DE_ENTREGA} horas hábiles para organizar la entrega.`]
];

const questions = [
  ["¿Me garantizan llegar a Mythic?", "No. El coaching puede mejorar cómo practicas y decides, pero el rango depende de tu desempeño, tu equipo, el emparejamiento y las reglas de cada temporada."],
  ["¿Necesitan entrar a mi cuenta?", "Nunca. Tú juegas desde tu dispositivo y conservas el control. No pedimos contraseña, códigos de verificación, acceso al correo ni control remoto."],
  ["¿Qué diferencia hay entre posición y clase?", "La posición describe tu responsabilidad en el mapa —EXP, Gold, Mid, Jungler o Roamer—. Fighter, Tank, Assassin, Mage, Marksman y Support son clases de héroe; no son la misma cosa."],
  ["¿Cómo recibo el entrenamiento y qué hago si no me contactan?", `Después de que Wompi confirme el pago, nos comunicamos al correo que escribiste para coordinar la entrega. Si pasan ${HORAS_DE_ENTREGA} horas hábiles, escribe a ${CORREO_CONTACTO} con la referencia o el comprobante.`],
  ["¿Qué pasa si Wompi rechaza el pago?", "Verás el mensaje exacto de la pasarela y una explicación prudente. Puedes corregir los datos o probar una sola vez con otra tarjeta; no hay cobros automáticos."],
  ["¿Ofrecen boosting, joki, hacks o mods?", "No. Nexo Cinco enseña al jugador. No jugamos partidas por encargo, no vendemos cuentas y no usamos scripts, map hacks, mods ni herramientas de ventaja."]
];

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const closeCheckout = useCallback(() => setSelectedPlan(null), []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-niebla text-tinta">
      <Header />
      <Hero />
      <TrustBar />

      <section id="metodo" className="border-b-2 border-tinta bg-papel px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-8 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
            <div><p className="text-sm font-bold uppercase tracking-[0.2em] text-jade">Qué entrenamos</p><h2 className="mt-3 font-display text-6xl font-extrabold uppercase leading-[0.85] tracking-[-0.045em] text-cobalto sm:text-7xl">La partida no se arregla con una sola jugada.</h2></div>
            <p className="max-w-2xl text-lg leading-7 text-tinta/65 lg:justify-self-end">Separamos ejecución, información y coordinación. Así puedes señalar qué decisión se repite antes de perder una línea, llegar tarde a Turtle o forzar un Lord sin ventaja.</p>
          </div>
          <div className="mt-12 grid border-2 border-tinta lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <article key={pillar.marker} className={`min-w-0 p-7 sm:p-9 ${index > 0 ? "border-t-2 border-tinta lg:border-l-2 lg:border-t-0" : ""}`}>
                <div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-full bg-cobalto text-objetivo"><Icono name={pillar.icon} /></span><span className="font-display text-sm font-bold uppercase tracking-[0.12em] text-alerta">{pillar.marker}</span></div>
                <h3 className="mt-8 font-display text-4xl font-extrabold uppercase leading-[0.92] text-cobalto">{pillar.title}</h3>
                <p className="mt-5 leading-6 text-tinta/65">{pillar.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-tinta bg-niebla px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[.55fr_1.45fr] lg:items-center">
          <div className="min-w-0"><p className="text-sm font-bold uppercase tracking-[0.2em] text-jade">Formación de cinco</p><h2 className="mt-3 break-words font-display text-[2.45rem] font-extrabold uppercase leading-[0.88] tracking-[-0.04em] text-cobalto sm:text-6xl">Una posición. Una responsabilidad visible.</h2><p className="mt-5 max-w-lg leading-6 text-tinta/65">La clase del héroe no reemplaza la tarea de la posición. Entrenamos qué información necesita cada rol y qué decisión debe comunicar.</p></div>
          <ol className="grid border-2 border-tinta bg-papel sm:grid-cols-5">
            {rolePositions.map((role, index) => (
              <li key={role.short} className={`relative min-w-0 p-5 ${index > 0 ? "border-t-2 border-tinta sm:border-l-2 sm:border-t-0" : ""}`}>
                <span className={`grid h-10 w-10 place-items-center rounded-full border-2 border-tinta font-display text-xs font-extrabold ${index === 2 ? "bg-objetivo" : index % 2 ? "bg-jade text-white" : "bg-cobalto text-white"}`}>{role.short}</span>
                <strong className="mt-5 block font-display text-xl font-extrabold uppercase text-cobalto">{role.name}</strong>
                <p className="mt-3 text-sm leading-5 text-tinta/65">{role.job}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Separador />

      <section id="rutas" className="bg-niebla px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><p className="text-sm font-bold uppercase tracking-[0.2em] text-jade">Fichas de entrenamiento</p><h2 className="mt-3 max-w-4xl font-display text-6xl font-extrabold uppercase leading-[0.85] tracking-[-0.045em] text-cobalto sm:text-7xl">Escoge la decisión que vas a trabajar primero.</h2></div>
            <div className="border-l-4 border-alerta pl-5 lg:max-w-xs"><p className="font-semibold">Siete alcances, un cobro cada uno.</p><p className="mt-1 text-sm leading-5 text-tinta/60">No hay suscripción ni renovación. La entrega se coordina al correo registrado.</p></div>
          </div>
          <div className="mt-12 grid min-w-0 grid-cols-1 gap-5 md:grid-cols-12">
            {plans.map((plan, index) => <PlanCard key={plan.id} plan={plan} index={index} onSelect={setSelectedPlan} />)}
          </div>
        </div>
      </section>

      <section className="border-y-2 border-tinta bg-objetivo px-5 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1440px] gap-9 lg:grid-cols-[.55fr_1.45fr] lg:items-center">
          <div><p className="text-sm font-bold uppercase tracking-[0.18em] text-cobalto">Escalera competitiva</p><h2 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.88] text-cobalto">El rango cambia. El criterio queda.</h2><p className="mt-4 max-w-md text-sm leading-6 text-tinta/70">No publicamos estrellas ni umbrales: pueden cambiar. La práctica se diseña para sobrevivir al siguiente parche.</p></div>
          <ol className="grid grid-cols-2 border-2 border-tinta bg-papel sm:grid-cols-5">
            {rankRoute.map((rank, index) => <li key={rank} className="min-w-0 border-b border-r border-tinta/25 p-3 sm:p-4"><span className="text-[10px] font-bold text-jade">{String(index + 1).padStart(2, "0")}</span><strong className="mt-1 block break-words font-display text-lg font-extrabold uppercase text-cobalto">{rank}</strong></li>)}
          </ol>
        </div>
      </section>

      <Tabla />

      <section id="entrega" className="border-b-2 border-tinta bg-papel px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-jade">Del pago a la entrega</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[.62fr_1.38fr]"><h2 className="font-display text-6xl font-extrabold uppercase leading-[0.85] tracking-[-0.045em] text-cobalto sm:text-7xl">Tres llamadas. Sin pasos escondidos.</h2><div className="border-t-2 border-tinta">{steps.map(([number, title, copy]) => <article key={number} className="grid gap-4 border-b-2 border-tinta py-7 sm:grid-cols-[70px_220px_1fr] sm:items-start"><span className="font-display text-4xl font-extrabold text-alerta">{number}</span><h3 className="font-display text-3xl font-extrabold uppercase text-cobalto">{title}</h3><p className="max-w-xl leading-6 text-tinta/65">{copy}</p></article>)}</div></div>
        </div>
      </section>

      <section className="border-b-2 border-tinta bg-jade px-5 py-14 text-papel sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
          <div><Icono name="escudo" className="h-14 w-14 text-objetivo" /><h2 className="mt-5 font-display text-5xl font-extrabold uppercase leading-[0.88]">Tu cuenta se queda contigo.</h2></div>
          <div className="grid gap-px border border-papel/25 bg-papel/25 sm:grid-cols-2"><div className="bg-jade p-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-objetivo">Sí hacemos</p><p className="mt-3 leading-6 text-papel/80">Analizamos grabaciones, explicamos decisiones, proponemos prácticas y coordinamos sesiones.</p></div><div className="bg-jade p-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-objetivo">Nunca hacemos</p><p className="mt-3 leading-6 text-papel/80">Pedir contraseñas o códigos, jugar por ti, acceder remotamente o instalar herramientas externas.</p></div></div>
        </div>
      </section>

      <section id="preguntas" className="border-b-2 border-tinta bg-niebla px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[.62fr_1.38fr]">
          <div><p className="text-sm font-bold uppercase tracking-[0.2em] text-jade">Antes de pagar</p><h2 className="mt-3 font-display text-6xl font-extrabold uppercase leading-[0.85] tracking-[-0.045em] text-cobalto sm:text-7xl">Preguntas de lobby.</h2><p className="mt-6 max-w-sm leading-6 text-tinta/65">Una ruta clara explica límites, entrega y seguridad antes de pedir la tarjeta.</p></div>
          <div className="border-t-2 border-tinta">{questions.map(([question, answer], index) => <details key={question} className="group border-b-2 border-tinta"><summary className="flex cursor-pointer list-none items-center gap-5 py-6 font-display text-2xl font-bold uppercase text-cobalto sm:text-3xl"><span className="text-sm text-alerta">{String(index + 1).padStart(2, "0")}</span><span className="flex-1">{question}</span><span className="text-alerta transition-transform group-open:rotate-45">+</span></summary><p className="max-w-2xl pb-7 pl-10 leading-6 text-tinta/70">{answer}</p></details>)}</div>
        </div>
      </section>

      <section className="bg-alerta px-5 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-tinta">Siguiente llamada</p><h2 className="mt-2 max-w-4xl font-display text-5xl font-extrabold uppercase leading-[0.86] tracking-[-0.04em] text-tinta sm:text-6xl">No necesitas repetir la partida. Necesitas leerla mejor.</h2></div><a href="#rutas" className="shrink-0 border-2 border-tinta bg-papel px-8 py-4 text-center font-display text-xl font-extrabold uppercase shadow-[6px_6px_0_#111A22]">Comparar fichas</a></div>
      </section>

      <Footer />
      <CheckoutPanel plan={selectedPlan} onClose={closeCheckout} />
    </main>
  );
}
