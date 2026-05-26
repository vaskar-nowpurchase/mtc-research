import { Liquid } from 'liquidjs'

// Singleton LiquidJS engine
const engine = new Liquid({
  strictFilters: false,
  strictVariables: false,
  lenientIf: true,
})

/**
 * Render a LiquidJS template with the provided data.
 * Returns the rendered HTML string or an error message HTML.
 */
export async function renderTemplate(
  template: string,
  data: Record<string, unknown>
): Promise<string> {
  try {
    const html = await engine.parseAndRender(template, data)
    return html
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return `<div style="
      font-family: monospace;
      padding: 16px;
      background: #FDECEA;
      color: #C0392B;
      border: 1px solid #EF9A9A;
      border-radius: 4px;
      margin: 16px;
      font-size: 12px;
      line-height: 1.6;
    ">
      <strong>Template Render Error</strong><br/>
      ${message}
    </div>`
  }
}

export { engine }
