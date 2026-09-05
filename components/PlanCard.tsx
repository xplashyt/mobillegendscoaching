import { Icono } from "@/components/Icono";
import { formatCOP, type Plan } from "@/lib/plans";

const layouts = [
  "md:col-span-5",
  "md:col-span-7",
  "md:col-span-6",
  "md:col-span-12 xl:col-span-8",
  "md:col-span-6 xl:col-span-4",
  "md:col-span-7",
  "md:col-span-5"
] as const;

export function PlanCard({ plan, index, onSelect }: { plan: Plan; index: number; onSelect: (plan: Plan) => void }) {
  return (
    <article className={`relative flex min-w-0 flex-col border-2 border-tinta ${layouts[index % layouts.length]} ${plan.popular ? "bg-cobalto text-papel xl:grid xl:grid-cols-[.88fr_1.12fr]" : "bg-papel"}`}>
      <div className={`relative flex min-w-0 flex-col p-6 sm:p-8 ${plan.popular ? "border-b-2 border-niebla/30 xl:border-b-0 xl:border-r-2" : "border-b-2 border-tinta"}`}>
        <div className="mb-8 flex items-start justify-between gap-4">
          <span className={`text-xs font-bold uppercase tracking-[0.18em] ${plan.popular ? "text-objetivo" : "text-jade"}`}>{plan.signal}</span>
          <span className={`grid h-10 w-10 place-items-center rounded-full border-2 font-display text-sm font-extrabold ${plan.popular ? "border-objetivo text-objetivo" : "border-cobalto text-cobalto"}`} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        </div>
        {plan.popular && <p className="mb-3 w-fit bg-objetivo px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-tinta">Ruta central</p>}
        <h3 className="font-display text-4xl font-extrabold uppercase leading-[0.92] tracking-[-0.03em] sm:text-5xl">{plan.name}</h3>
        <p className={`mt-5 max-w-lg leading-6 ${plan.popular ? "text-papel/75" : "text-tinta/70"}`}>{plan.summary}</p>
        <div className="mt-auto pt-9">
          <p className={`text-xs font-bold uppercase tracking-[0.16em] ${plan.popular ? "text-niebla/65" : "text-cobalto/65"}`}>Pago único</p>
          <p className={`font-display text-5xl font-extrabold tracking-[-0.05em] sm:text-6xl ${plan.popular ? "text-objetivo" : "text-alerta"}`}>{formatCOP(plan.priceCOP)}</p>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-6 sm:p-8">
        <dl className={`grid grid-cols-3 gap-px border ${plan.popular ? "border-niebla/25 bg-niebla/25" : "border-tinta/20 bg-tinta/20"}`}>
          {[
            [String(plan.modules).padStart(2, "0"), "Bloques"],
            [String(plan.exercises).padStart(2, "0"), "Prácticas"],
            [plan.duration, "Duración"]
          ].map(([value, label]) => (
            <div key={label} className={`min-w-0 p-3 ${plan.popular ? "bg-cobalto" : "bg-papel"}`}>
              <dt className={`text-[9px] font-bold uppercase tracking-[0.13em] ${plan.popular ? "text-niebla/60" : "text-cobalto/60"}`}>{label}</dt>
              <dd className="mt-1 truncate font-display text-lg font-bold uppercase">{value}</dd>
            </div>
          ))}
        </dl>
        <ul className="my-6 space-y-3">
          {plan.includes.map((item, itemIndex) => (
            <li key={item} className="flex gap-3 text-sm leading-5">
              <span className={`mt-1 h-3 w-3 shrink-0 rotate-45 border ${plan.popular ? "border-objetivo" : "border-jade"}`} aria-hidden="true" />
              <span>{item}</span>
              <span className="sr-only">Punto {itemIndex + 1}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-col gap-4 border-t border-current/20 pt-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-[0.14em] ${plan.popular ? "text-niebla/60" : "text-cobalto/60"}`}>Formato · jugadores</p>
            <p className="mt-1 font-display text-lg font-bold uppercase">{plan.format} · {plan.players}</p>
          </div>
          <button type="button" onClick={() => onSelect(plan)} aria-label={`Elegir ${plan.name}`} className={`flex items-center justify-center gap-3 border-2 px-5 py-3 font-display text-lg font-bold uppercase tracking-wide transition-transform hover:-translate-y-0.5 ${plan.popular ? "border-objetivo bg-objetivo text-tinta" : "border-tinta bg-tinta text-papel"}`}>
            Abrir ficha <Icono name="flecha" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  );
}
