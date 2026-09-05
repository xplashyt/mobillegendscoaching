import { objectiveDecisions } from "@/lib/datos";

export function Tabla() {
  return (
    <section id="tablero" className="border-b-2 border-tinta bg-cobalto px-5 py-20 text-papel sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-objetivo">Hoja de llamada / objetivos</p>
            <h2 className="mt-3 font-display text-6xl font-extrabold uppercase leading-[0.86] tracking-[-0.04em] sm:text-7xl">No todo objetivo se empieza golpeándolo.</h2>
          </div>
          <p className="max-w-2xl text-lg leading-7 text-papel/70 lg:justify-self-end">Esta hoja no da una orden automática. Resume las señales que conviene leer para que el equipo decida antes de gastar recursos.</p>
        </div>
        <div className="mt-12 min-w-0 overflow-x-auto border-2 border-niebla/35">
          <table className="w-full min-w-[860px] border-collapse text-left">
            <thead className="bg-tinta text-objetivo">
              <tr>{["Ventana", "Señal que buscas", "Llamada útil", "Evita"].map((heading) => <th key={heading} className="border-r border-niebla/20 px-5 py-4 text-xs font-bold uppercase tracking-[0.16em] last:border-r-0">{heading}</th>)}</tr>
            </thead>
            <tbody>
              {objectiveDecisions.map((row, index) => (
                <tr key={row.phase} className="border-t border-niebla/25">
                  <td className="px-5 py-5 align-top"><span className="mr-3 text-xs font-bold text-objetivo">{String(index + 1).padStart(2, "0")}</span><strong className="font-display text-xl uppercase">{row.phase}</strong></td>
                  <td className="px-5 py-5 text-papel/75">{row.signal}</td>
                  <td className="px-5 py-5 font-semibold">{row.decision}</td>
                  <td className="px-5 py-5 text-papel/65">{row.avoid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-5 text-niebla/60">Punto de partida para revisar partidas. El parche, la composición y la información visible cambian cada decisión.</p>
      </div>
    </section>
  );
}
