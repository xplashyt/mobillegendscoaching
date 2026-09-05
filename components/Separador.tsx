const phases = ["Líneas", "Turtle", "Rotación", "Lord", "Base"];

export function Separador() {
  return (
    <div className="overflow-hidden border-y-2 border-tinta bg-objetivo py-4" aria-hidden="true">
      <div className="mx-auto grid min-w-[760px] max-w-[1440px] grid-cols-5 px-8">
        {phases.map((phase, index) => (
          <div key={phase} className="relative flex items-center">
            <span className={`relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-tinta font-display text-xs font-extrabold ${index === 1 || index === 3 ? "bg-cobalto text-papel" : "bg-papel text-tinta"}`}>{index + 1}</span>
            <span className="mx-3 font-display text-sm font-bold uppercase tracking-[0.08em]">{phase}</span>
            {index < phases.length - 1 && <span className="h-0 flex-1 border-t-2 border-dashed border-tinta/60" />}
          </div>
        ))}
      </div>
    </div>
  );
}
