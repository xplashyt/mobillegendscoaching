export type IconName = "linea" | "objetivo" | "draft" | "equipo" | "tarjeta" | "correo" | "flecha" | "escudo";

export function Icono({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "square" as const,
    strokeLinejoin: "miter" as const
  };

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      {name === "linea" && <><path d="M3 20C5 11 11 13 12 5M7 21c5-7 9-4 14-16M12 22c2-5 6-5 9-7" {...common} /><path d="m10 4 2-2 2 2-2 2Z" {...common} /></>}
      {name === "objetivo" && <><circle cx="12" cy="12" r="9" {...common} /><circle cx="12" cy="12" r="4" {...common} /><path d="M12 1v4M23 12h-4M12 23v-4M1 12h4" {...common} /></>}
      {name === "draft" && <><path d="M3 4h7v7H3ZM14 4h7v7h-7ZM3 15h7v6H3ZM14 15h7v6h-7Z" {...common} /><path d="m5 7 1.5 1.5L9 6M16 7h3M16 18h3" {...common} /></>}
      {name === "equipo" && <><path d="m12 2 3 4-3 4-3-4ZM4 8l3 4-3 4-3-4ZM20 8l3 4-3 4-3-4ZM8 16l4-3 4 3-4 6Z" {...common} /><path d="M7 12h10M12 10v3" {...common} /></>}
      {name === "tarjeta" && <><rect x="2" y="5" width="20" height="14" {...common} /><path d="M2 9h20M6 15h5" {...common} /></>}
      {name === "correo" && <><path d="M2 5h20v14H2Z" {...common} /><path d="m3 7 9 7 9-7" {...common} /></>}
      {name === "flecha" && <><path d="M3 12h17M14 6l6 6-6 6" {...common} /></>}
      {name === "escudo" && <><path d="M12 2 20 5v6c0 5-3.2 8.8-8 11-4.8-2.2-8-6-8-11V5Z" {...common} /><path d="m8.5 12 2.2 2.2 4.8-5" {...common} /></>}
    </svg>
  );
}
