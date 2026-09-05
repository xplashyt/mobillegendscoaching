import { getPlan } from "@/lib/plans";

const REFERENCE_PREFIX = "nx5-";

export function buildReference(planId: string) {
  if (!planId.startsWith(REFERENCE_PREFIX) || !getPlan(planId)) {
    throw new Error("El plan no es válido.");
  }
  return `${planId}-${Date.now()}`;
}

export function parseReference(reference: string) {
  // Se lee desde la derecha porque el id válido del plan también contiene guiones.
  const parts = reference.split("-");
  const timestamp = parts.at(-1);
  const planId = parts.slice(0, -1).join("-");

  if (!timestamp || !/^\d+$/.test(timestamp) || !planId.startsWith(REFERENCE_PREFIX)) {
    return null;
  }

  const plan = getPlan(planId);
  return plan ? { plan, timestamp: Number(timestamp) } : null;
}

export function isNexoCincoReference(reference: string) {
  return reference.startsWith(REFERENCE_PREFIX) && parseReference(reference) !== null;
}
