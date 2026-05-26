/**
 * ABC Castings — Product Inspection Report injector.
 *
 * Assembles the `inspectionItems` array from fixed-slot row fields
 * (item1_description … item8_result) and passes scalar fields through.
 */
export function abcCastingsInject(
  data: Record<string, unknown>
): Record<string, unknown> {
  const g = (k: string) => String(data[k] ?? '')

  const inspectionItems = [1, 2, 3, 4, 5, 6, 7, 8]
    .map(i => ({
      itemNo:        g(`item${i}_itemNo`) || String(i),
      description:   g(`item${i}_description`),
      specification: g(`item${i}_specification`),
      actual:        g(`item${i}_actual`),
      result:        g(`item${i}_result`),
    }))
    .filter(r => r.description || r.actual)

  // approvers comes in as a pre-assembled array from the ApproverList widget
  const rawApprovers = data['approvers']
  const approvers = Array.isArray(rawApprovers)
    ? (rawApprovers as Array<{ name?: string; role?: string }>).filter(a => a.name)
    : null

  return {
    inspectionDate: g('inspectionDate'),
    inspector:      g('inspector'),
    productName:    g('productName'),
    batchNo:        g('batchNo'),
    dimension_spec: g('dimension_spec'),
    dimension_act:  g('dimension_act'),
    weight_spec:    g('weight_spec'),
    weight_act:     g('weight_act'),
    surfaceFinish:  g('surfaceFinish'),
    hardness_val:   g('hardness_val'),
    status:         g('status'),
    remarks:        g('remarks'),

    inspectionItems: inspectionItems.length > 0 ? inspectionItems : null,
    approvers,
  }
}
