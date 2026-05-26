/**
 * Normalises raw FormEngine state before it reaches an injector.
 * - Strips null / undefined / empty-string values
 * - Coerces scalar values to strings
 * - Passes arrays through as-is so custom array components (e.g. ApproverList)
 *   are not flattened to "[object Object]"
 */
export function extractFormData(
  raw: Record<string, unknown>
): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(raw)) {
    if (v === null || v === undefined || v === '') continue
    out[k] = Array.isArray(v) ? v : String(v)
  }
  return out
}
