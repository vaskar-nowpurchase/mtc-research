export interface CustomerFeatures {
  approvers?: boolean   // show dynamic approver list alongside the form
}

export interface Customer {
  id: string
  name: string
  description: string
  formSchema: string    // JSON.stringify of FormEngine schema
  template: string      // LiquidJS HTML template string
  features?: CustomerFeatures
  createdAt: string
}

export interface DocumentRecord {
  id: string
  customerId: string
  title: string
  formData: Record<string, unknown>
  renderedHtml: string
  createdAt: string
  updatedAt: string
}
