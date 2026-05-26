/**
 * Template Bridge — single entry point that DocumentEditorPage calls.
 *
 * Flow:
 *   raw FormEngine state
 *     → extractFormData()          normalise / strip empties
 *     → customerInjector(data)     customer-specific field mapping
 *     → renderTemplate(html, data) LiquidJS render
 *     → HTML string
 *
 * Adding a new customer = add one entry to INJECTORS.
 */
import { extractFormData } from './extractor'
import { vishwakarmaInject } from './injectors/vishwakarmaInjector'
import { abcCastingsInject } from './injectors/abcCastingsInjector'
import { renderTemplate } from '../liquid'
import { getCustomer } from '../storage'

type InjectorFn = (data: Record<string, unknown>) => Record<string, unknown>

// ── Injector registry ─────────────────────────────────────────────────────────
const INJECTORS: Record<string, InjectorFn> = {
  'cust-001-vishwakarma':   vishwakarmaInject,
  'cust-002-abc-castings':  abcCastingsInject,
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Given a customer ID and raw FormEngine state, returns fully-rendered HTML.
 * Falls back to passing the raw state straight to LiquidJS if no injector
 * is registered (safe default for future customers).
 */
export async function bridgeRender(
  customerId: string,
  rawFormState: Record<string, unknown>
): Promise<string> {
  const customer = getCustomer(customerId)
  if (!customer) {
    return `<div style="padding:20px;color:red">Customer not found: ${customerId}</div>`
  }

  const extracted = extractFormData(rawFormState)

  const injector = INJECTORS[customerId]
  const templateData = injector
    ? injector(extracted)
    : extracted

  return renderTemplate(customer.template, templateData)
}
