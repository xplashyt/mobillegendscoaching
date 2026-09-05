const facts = [
  ["01", "Pago único", "Sin renovaciones ni cobros automáticos."],
  ["02", "Tarjeta con Wompi", "Los datos sensibles no pasan por nuestro servidor."],
  ["03", "Entrega coordinada", "Te contactamos al correo usado en el pago."],
] as const;

export function TrustBar() {
  return (
    <section aria-label="Datos del servicio" className="border-b-2 border-tinta bg-papel">
      <div className="mx-auto grid max-w-[1440px] divide-y-2 divide-tinta sm:grid-cols-3 sm:divide-x-2 sm:divide-y-0">
        {facts.map(([number, title, copy]) => (
          <div key={number} className="grid grid-cols-[44px_1fr] gap-4 px-5 py-7 sm:px-7 lg:px-10">
            <span className="font-display text-2xl font-extrabold text-jade">{number}</span>
            <div>
              <h2 className="font-display text-base font-bold uppercase tracking-wide text-cobalto">{title}</h2>
              <p className="mt-1 text-sm leading-5 text-tinta/70">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
