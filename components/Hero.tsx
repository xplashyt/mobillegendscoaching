import { Firma } from "@/components/Firma";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden border-b-2 border-tinta bg-niebla">
      <div className="mx-auto grid min-h-[680px] max-w-[1440px] grid-cols-1 gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:px-12 lg:py-20">
        <div className="relative z-10 max-w-[650px]">
          <p className="mb-7 inline-flex border-l-4 border-jade bg-papel px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-cobalto">
            Coaching independiente · Mobile Legends
          </p>
          <h1 className="font-display text-[clamp(3.7rem,7.4vw,7.8rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.06em] text-cobalto">
            Cinco roles.<br />
            <span className="text-jade">Una sola</span><br />
            lectura.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-tinta/80">
            Entrena línea, rotaciones, objetivos y coordinación para tomar mejores decisiones en cada fase de la partida. Tú juegas; nosotros analizamos y enseñamos.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#rutas" className="border-2 border-tinta bg-objetivo px-6 py-4 text-center font-display font-bold uppercase tracking-wide shadow-[6px_6px_0_#111A22] transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none">
              Ver rutas de entrenamiento
            </a>
            <a href="#metodo" className="border-2 border-tinta bg-papel px-6 py-4 text-center font-display font-bold uppercase tracking-wide hover:bg-white">
              Cómo funciona
            </a>
          </div>
          <p className="mt-7 flex items-start gap-3 text-sm font-semibold leading-6 text-cobalto">
            <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-alerta" />
            Nunca pedimos tu contraseña ni jugamos en tu cuenta. No ofrecemos boosting, scripts ni promesas de rango.
          </p>
        </div>
        <div className="relative min-w-0 lg:pl-5">
          <div className="absolute -left-4 -top-7 hidden font-display text-[8rem] font-extrabold leading-none text-cobalto/5 lg:block" aria-hidden="true">05</div>
          <Firma />
        </div>
      </div>
    </section>
  );
}
