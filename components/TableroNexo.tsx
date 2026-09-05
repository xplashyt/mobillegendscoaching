const roles = [
  { label: "EXP", x: "11%", y: "17%", delay: "480ms", tone: "bg-alerta text-white" },
  { label: "MID", x: "42%", y: "9%", delay: "560ms", tone: "bg-cobalto text-white" },
  { label: "JUNGLA", x: "69%", y: "24%", delay: "640ms", tone: "bg-jade text-white" },
  { label: "ROAM", x: "24%", y: "67%", delay: "720ms", tone: "bg-tinta text-white" },
  { label: "GOLD", x: "66%", y: "75%", delay: "800ms", tone: "bg-objetivo text-tinta" },
];

export function TableroNexo() {
  return (
    <figure className="relative border-2 border-tinta bg-cobalto p-3 shadow-board sm:p-5" aria-labelledby="tablero-title">
      <div className="mb-3 flex items-center justify-between border-b border-niebla/40 pb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-niebla">
        <figcaption id="tablero-title">Tablero de partida // NX5</figcaption>
        <span className="text-objetivo">Lectura macro</span>
      </div>
      <div className="relative aspect-[5/4] overflow-hidden border border-niebla/45 bg-[#24527a]">
        <svg viewBox="0 0 500 400" className="absolute inset-0 h-full w-full" role="img" aria-label="Mapa táctico de tres líneas y dos objetivos">
          <path d="M38 349C125 349 161 294 222 242S377 128 461 49" fill="none" stroke="#E8EEF3" strokeOpacity=".25" strokeWidth="42" />
          <path d="M42 350 458 50" fill="none" stroke="#E8EEF3" strokeOpacity=".25" strokeWidth="42" />
          <path d="M39 349C64 238 155 183 243 165s158-46 217-116" fill="none" stroke="#E8EEF3" strokeOpacity=".25" strokeWidth="42" />
          <path className="board-route" pathLength="1" d="M42 350C125 350 158 298 220 246S378 126 458 50" fill="none" stroke="#D5A021" strokeWidth="4" />
          <path className="board-route" pathLength="1" d="M42 350 458 50" fill="none" stroke="#E8EEF3" strokeWidth="4" style={{ animationDelay: "120ms" }} />
          <path className="board-route" pathLength="1" d="M42 350C68 240 156 187 245 167s156-48 213-117" fill="none" stroke="#D64C5E" strokeWidth="4" style={{ animationDelay: "240ms" }} />
          <path d="M20 375 42 330l22 45Z" fill="#16836F" stroke="#111A22" strokeWidth="5" />
          <path d="m436 25 22 45 22-45Z" fill="#D64C5E" stroke="#111A22" strokeWidth="5" />
          <g transform="translate(242 203)">
            <circle r="37" fill="#173A63" stroke="#D5A021" strokeWidth="5" />
            <path d="M-17 6 0-17 18 6 0 19Z" fill="#D5A021" />
            <text x="0" y="55" fill="#F8FAFB" fontSize="13" textAnchor="middle" fontWeight="700">TURTLE</text>
          </g>
          <g transform="translate(337 116)">
            <circle r="29" fill="#173A63" stroke="#E8EEF3" strokeWidth="4" />
            <path d="m-15 10 4-27 11 9 11-9 4 27-15 9Z" fill="#E8EEF3" />
            <text x="0" y="45" fill="#F8FAFB" fontSize="13" textAnchor="middle" fontWeight="700">LORD</text>
          </g>
        </svg>
        {roles.map((role) => (
          <span
            key={role.label}
            className={`role-chip absolute border-2 border-tinta px-2 py-1 font-display text-[10px] font-bold tracking-wider shadow-[3px_3px_0_#111A22] sm:text-xs ${role.tone}`}
            style={{ left: role.x, top: role.y, animationDelay: role.delay }}
          >
            {role.label}
          </span>
        ))}
        <div className="absolute bottom-3 right-3 border border-niebla/50 bg-cobalto px-3 py-2 text-right text-[10px] uppercase tracking-[0.12em] text-niebla">
          <span className="block text-objetivo">Objetivo activo</span>
          <span>decidir antes de pelear</span>
        </div>
      </div>
    </figure>
  );
}
