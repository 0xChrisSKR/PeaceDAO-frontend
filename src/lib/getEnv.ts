const cache = new Map<string, string | undefined>();

function toSnakeCase(value: string): string {
  return value
    .replace(/^NEXT_PUBLIC_/i, "")
    .replace(/([a-z\d])([A-Z])/g, "$1_$2")
    .replace(/[-\s]+/g, "_")
    .toUpperCase();
}

function buildCandidates(key: string): string[] {
  const trimmed = key.trim();
  if (!trimmed) return [];

  const withoutPrefix = trimmed.replace(/^NEXT_PUBLIC_/i, "");
  const upper = trimmed.toUpperCase();
  const lower = trimmed.toLowerCase();
  const snake = toSnakeCase(trimmed);
  const snakeLower = snake.toLowerCase();
  const upperWithoutPrefix = withoutPrefix.toUpperCase();

  const candidates = new Set<string>([
    trimmed,
    withoutPrefix,
    upper,
    lower,
    upperWithoutPrefix,
    snake,
    snakeLower,
    `NEXT_PUBLIC_${trimmed}`,
    `NEXT_PUBLIC_${upper}`,
    `NEXT_PUBLIC_${lower}`,
    `NEXT_PUBLIC_${upperWithoutPrefix}`,
    `NEXT_PUBLIC_${snake}`,
    `NEXT_PUBLIC_${snakeLower}`
  ]);

  return Array.from(candidates).filter(Boolean);
}

export function getEnv(key: string): string | undefined {
  if (cache.has(key)) {
    return cache.get(key);
  }

  const candidates = buildCandidates(key);
  for (const candidate of candidates) {
    const value = process.env[candidate];
    if (typeof value === "string" && value.length > 0) {
      cache.set(key, value);
      return value;
    }
  }

  cache.set(key, undefined);
  return undefined;
}

export default getEnv;
