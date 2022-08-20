const idCounter: Record<string, number> = {};
export function getUUID(prefix = '_default'): string {
  if (!idCounter[prefix]) {
    idCounter[prefix] = 0;
  }
  return `${prefix}_${++idCounter[prefix]}`;
}
