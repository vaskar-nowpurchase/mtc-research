/**
 * Vishwakarma Founders — Material Test Certificate injector.
 *
 * Responsibilities:
 *  1. Pass scalar fields straight through to the template.
 *  2. Assemble the `testSamples` array from fixed-slot row fields
 *     (s1_sampleNo … s5_elongation) defined in the FormEngine schema.
 *     Only non-empty rows are included so the {% for %} loop in the
 *     template stays clean.
 */
export function vishwakarmaInject(
  data: Record<string, unknown>
): Record<string, unknown> {
  const g = (k: string) => String(data[k] ?? '')

  // Build testSamples array — filter rows where at least one cell is filled
  const testSamples = [1, 2, 3, 4, 5]
    .map(i => ({
      sampleNo:  g(`s${i}_sampleNo`),
      uts:       g(`s${i}_uts`),
      yield:     g(`s${i}_yield`),
      hardness:  g(`s${i}_hardness`),
      elongation:g(`s${i}_elongation`),
    }))
    .filter(r => r.sampleNo || r.uts || r.hardness || r.elongation)

  return {
    // ── Basic info ────────────────────────────────
    customerName:   g('customerName'),
    partName:       g('partName'),
    partNumber:     g('partNumber'),
    materialSpec:   g('materialSpec'),
    reportNo:       g('reportNo'),
    heatNumber:     g('heatNumber'),
    invoiceNumber:  g('invoiceNumber'),
    issueDate:      g('issueDate'),

    // ── Chemical properties ───────────────────────
    chemC_spec:     g('chemC_spec'),
    chemC_avg:      g('chemC_avg'),
    chemSi_spec:    g('chemSi_spec'),
    chemSi_avg:     g('chemSi_avg'),
    chemMn_spec:    g('chemMn_spec'),
    chemMn_avg:     g('chemMn_avg'),
    chemP_spec:     g('chemP_spec'),
    chemP_avg:      g('chemP_avg'),
    chemS_spec:     g('chemS_spec'),
    chemS_avg:      g('chemS_avg'),
    chemMg_spec:    g('chemMg_spec'),
    chemMg_avg:     g('chemMg_avg'),
    chemCe_spec:    g('chemCe_spec'),
    chemCe_avg:     g('chemCe_avg'),

    // ── Mechanical properties ─────────────────────
    uts_spec:       g('uts_spec'),
    uts_obs:        g('uts_obs'),
    yield_spec:     g('yield_spec'),
    yield_obs:      g('yield_obs'),
    hardness_spec:  g('hardness_spec'),
    hardness_obs:   g('hardness_obs'),
    elongation_spec:g('elongation_spec'),
    elongation_obs: g('elongation_obs'),

    // ── Microstructure distribution ───────────────
    nodularity:     g('nodularity'),
    noduleCount:    g('noduleCount'),
    pearlite:       g('pearlite'),
    ferrite:        g('ferrite'),
    others:         g('others'),

    // ── Footer ────────────────────────────────────
    remarks:        g('remarks'),
    createdBy:      g('createdBy'),
    approvedBy:     g('approvedBy'),

    // ── Repeating rows (assembled from form slots) ─
    testSamples: testSamples.length > 0 ? testSamples : null,
  }
}
