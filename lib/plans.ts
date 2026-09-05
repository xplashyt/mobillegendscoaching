export interface Plan {
  id: string;
  name: string;
  priceCOP: number;
  modules: number;
  summary: string;
  includes: string[];
  popular?: boolean;
  duration: string;
  exercises: number;
  format: string;
  players: string;
  signal: string;
}

export const plans: Plan[] = [
  {
    id: "nx5-ajuste-controles",
    name: "Ajuste de controles",
    priceCOP: 4000,
    modules: 1,
    summary: "Una revisión breve para que HUD, cámara y sensibilidad acompañen tus decisiones.",
    includes: [
      "Lista guiada para revisar HUD y cámara",
      "Prueba de apuntado, movimiento y selección",
      "Tres ajustes para practicar durante una semana",
      "Entrega digital coordinada por correo"
    ],
    duration: "35 min",
    exercises: 3,
    format: "Guía",
    players: "1 jugador",
    signal: "Calibración"
  },
  {
    id: "nx5-dominio-linea",
    name: "Dominio de línea",
    priceCOP: 10000,
    modules: 2,
    summary: "Fundamentos para administrar oleadas, intercambios y visión sin regalar presión.",
    includes: [
      "Lectura de oleadas y ventanas de regreso",
      "Intercambios con propósito y control de recursos",
      "Zonas seguras, arbustos y señales del minimapa",
      "Rutina de práctica de siete días"
    ],
    duration: "1 h 20",
    exercises: 7,
    format: "Video + guía",
    players: "1 jugador",
    signal: "Línea"
  },
  {
    id: "nx5-mapa-rotaciones",
    name: "Mapa y rotaciones",
    priceCOP: 25000,
    modules: 3,
    summary: "Aprende cuándo sostener tu línea, cuándo moverte y qué objetivo paga la rotación.",
    includes: [
      "Lectura de posiciones visibles y faltantes",
      "Preparación de Turtle y presión en lado opuesto",
      "Prioridad de línea antes de invadir o pelear",
      "Hoja de revisión posterior a cada partida"
    ],
    duration: "2 h 15",
    exercises: 10,
    format: "Video + tablero",
    players: "1 jugador",
    signal: "Macro"
  },
  {
    id: "nx5-ruta-rango",
    name: "Ruta de rango",
    priceCOP: 69900,
    modules: 6,
    summary: "El recorrido completo para conectar mecánica, línea, mapa, objetivos y revisión propia.",
    includes: [
      "Diagnóstico de rol, hábitos y objetivo de práctica",
      "Controles, cámara y ejecución esencial",
      "Línea, oleadas, rotaciones y visión",
      "Preparación de Turtle, Lord y asedio",
      "Plantilla para revisar tus propias partidas",
      "Rutina semanal que se puede ajustar"
    ],
    popular: true,
    duration: "5 h 40",
    exercises: 21,
    format: "Ruta completa",
    players: "1 jugador",
    signal: "Sistema"
  },
  {
    id: "nx5-analisis-individual",
    name: "Análisis individual",
    priceCOP: 100000,
    modules: 4,
    summary: "Revisión enfocada en tus partidas para encontrar el patrón que más decisiones te cuesta.",
    includes: [
      "Revisión de hasta dos partidas grabadas",
      "Mapa de tres errores prioritarios",
      "Sesión individual de retroalimentación",
      "Rutina personalizada por rol",
      "Resumen de decisiones por correo"
    ],
    duration: "90 min en vivo",
    exercises: 8,
    format: "1 a 1",
    players: "1 jugador",
    signal: "Corrección"
  },
  {
    id: "nx5-mesa-draft",
    name: "Mesa de draft",
    priceCOP: 150000,
    modules: 5,
    summary: "Una sesión para alinear roles, condiciones de victoria y respuesta del equipo antes de entrar al mapa.",
    includes: [
      "Roles, comodidad y reserva de héroes del equipo",
      "Condiciones de victoria y orden de prioridad",
      "Plan básico de picks, respuestas y bans",
      "Revisión de una partida del equipo",
      "Protocolo corto de comunicación"
    ],
    duration: "2 h en vivo",
    exercises: 12,
    format: "Equipo",
    players: "Hasta 5",
    signal: "Draft"
  },
  {
    id: "nx5-temporada-equipo",
    name: "Temporada en equipo",
    priceCOP: 494000,
    modules: 8,
    summary: "Cuatro semanas de observación y ajuste para convertir cinco decisiones sueltas en un sistema.",
    includes: [
      "Diagnóstico inicial del equipo",
      "Seis sesiones de trabajo en vivo",
      "Revisión semanal de partidas",
      "Objetivos medibles por rol",
      "Ajuste de draft y protocolo de objetivos",
      "Cierre con plan para continuar sin acompañamiento"
    ],
    duration: "4 semanas",
    exercises: 28,
    format: "Seguimiento",
    players: "Hasta 5",
    signal: "Temporada"
  }
];

export function formatCOP(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(value);
}

export function getPlan(planId: string) {
  return plans.find((plan) => plan.id === planId);
}
