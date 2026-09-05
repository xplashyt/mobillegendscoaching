export interface ObjectiveDecision {
  phase: string;
  signal: string;
  decision: string;
  avoid: string;
}

export const objectiveDecisions: ObjectiveDecision[] = [
  {
    phase: "Antes de Turtle",
    signal: "Oleada empujada y rivales visibles",
    decision: "Llegar primero, guardar habilidades y cerrar entradas",
    avoid: "Empezar el objetivo sin información del Jungler rival"
  },
  {
    phase: "Torre exterior cae",
    signal: "Una línea gana espacio de rotación",
    decision: "Mover presión hacia otra línea o la jungla cercana",
    avoid: "Seguir avanzando solo y regalar la ventaja"
  },
  {
    phase: "Lord disponible",
    signal: "Ventaja numérica, Retribution rival no disponible o lado opuesto presionado",
    decision: "Controlar visión y elegir entre forzar, atraer o girar",
    avoid: "Golpear Lord mientras el rival tiene entrada gratuita"
  },
  {
    phase: "Asedio de base",
    signal: "Oleadas sincronizadas y recursos clave disponibles",
    decision: "Esperar la oleada, abrir espacio y golpear la estructura",
    avoid: "Perseguir eliminaciones lejos de la condición de victoria"
  }
];

export const rolePositions = [
  { short: "EXP", name: "EXP Laner", job: "Sostener presión lateral y dar frente a la pelea." },
  { short: "GOLD", name: "Gold Laner", job: "Escalar con seguridad y convertir espacio en daño." },
  { short: "MID", name: "Mid Laner", job: "Limpiar rápido y conectar ambos lados del mapa." },
  { short: "JGL", name: "Jungler", job: "Marcar el ritmo y asegurar objetivos neutrales." },
  { short: "ROAM", name: "Roamer", job: "Crear información, protección e iniciación." }
];

export const rankRoute = [
  "Warrior",
  "Elite",
  "Master",
  "Grandmaster",
  "Epic",
  "Legend",
  "Mythic",
  "Mythical Honor",
  "Mythical Glory",
  "Mythical Immortal"
];
