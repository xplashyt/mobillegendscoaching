import { CORREO_CONTACTO, HORAS_DE_ENTREGA } from "@/lib/contacto";

export function Footer() {
  return (
    <footer className="bg-tinta px-5 py-14 text-papel sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[.75fr_1.25fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center border-2 border-objetivo font-display text-xl font-extrabold text-objetivo">N5</span>
            <div><strong className="block font-display text-3xl font-extrabold uppercase leading-none">Nexo Cinco</strong><span className="text-xs font-bold uppercase tracking-[0.16em] text-niebla/55">Coaching independiente</span></div>
          </div>
          <a className="mt-7 inline-block border-b border-objetivo pb-1 font-semibold text-objetivo" href={`mailto:${CORREO_CONTACTO}`}>{CORREO_CONTACTO}</a>
          <p className="mt-2 text-sm text-papel/60">Respuesta y coordinación de entrega en un máximo de {HORAS_DE_ENTREGA} horas hábiles.</p>
        </div>
        <div className="grid gap-8 border-t border-papel/20 pt-8 sm:grid-cols-2 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <div><h2 className="text-xs font-bold uppercase tracking-[0.18em] text-objetivo">Transparencia</h2><p className="mt-4 text-sm leading-6 text-papel/65">Vendemos contenido educativo en video y sesiones de acompañamiento. No vendemos insumos, equipos, cuentas, diamantes ni licencias; tampoco garantizamos resultados o un rango. Las compras de menores requieren autorización de un adulto.</p></div>
          <div><h2 className="text-xs font-bold uppercase tracking-[0.18em] text-objetivo">Juego limpio</h2><p className="mt-4 text-sm leading-6 text-papel/65">Servicio independiente, no afiliado, patrocinado ni aprobado por MOONTON Games. Mobile Legends: Bang Bang y sus signos pertenecen a sus titulares. No usamos contraseñas, acceso remoto, boosting, hacks, mods ni scripts.</p></div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1440px] flex-col gap-3 border-t border-papel/20 pt-6 text-xs font-bold uppercase tracking-[0.11em] text-niebla/50 sm:flex-row sm:justify-between"><span>© 2026 Nexo Cinco</span><span>Pagos procesados por Wompi · Pago único</span></div>
    </footer>
  );
}
