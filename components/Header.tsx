function Mark() {
  return (
    <svg viewBox="0 0 44 44" className="h-9 w-9" aria-hidden="true">
      <path d="M22 3 39 13v18L22 41 5 31V13Z" fill="#173A63" stroke="#111A22" strokeWidth="2" />
      <circle cx="22" cy="22" r="7" fill="#D5A021" stroke="#111A22" strokeWidth="2" />
      <path d="M22 3v12M39 13l-11 6M39 31l-11-6M22 41V29M5 31l11-6M5 13l11 6" stroke="#E8EEF3" strokeWidth="2" />
    </svg>
  );
}

export function Header() {
  return (
    <header className="relative z-20 border-b-2 border-tinta bg-papel">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#inicio" className="flex items-center gap-3" aria-label="Nexo Cinco, inicio">
          <Mark />
          <span className="font-display text-xl font-extrabold uppercase tracking-[-0.03em] text-cobalto">
            Nexo <span className="text-jade">Cinco</span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-semibold lg:flex" aria-label="Navegación principal">
          <a href="#metodo" className="hover:text-jade">Método</a>
          <a href="#rutas" className="hover:text-jade">Rutas</a>
          <a href="#tablero" className="hover:text-jade">Tablero de juego</a>
          <a href="#preguntas" className="hover:text-jade">Preguntas</a>
        </nav>
        <a href="#rutas" className="border-2 border-tinta bg-objetivo px-4 py-2 font-display text-sm font-bold uppercase tracking-wide shadow-[4px_4px_0_#111A22] transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none">
          <span className="sm:hidden">Ver rutas</span>
          <span className="hidden sm:inline">Elegir entrenamiento</span>
        </a>
      </div>
    </header>
  );
}
