import { Customer, DocumentRecord } from '../types'
import { SAMPLE_CUSTOMERS } from '../data/customers'
import { v4 as uuidv4 } from 'uuid'

const KEYS = {
  CUSTOMERS: 'mtc_customers',
  DOCUMENTS: 'mtc_documents',
  SEEDED: 'mtc_seeded_v3',
} as const

// ── Helpers ──────────────────────────────────────────────────────────────────

function getJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function setJson<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

// ── Seed on first load ────────────────────────────────────────────────────────

export function seedIfNeeded(): void {
  const seeded = localStorage.getItem(KEYS.SEEDED)
  if (seeded) return

  setJson(KEYS.CUSTOMERS, SAMPLE_CUSTOMERS)
  setJson(KEYS.DOCUMENTS, [])
  localStorage.setItem(KEYS.SEEDED, 'true')
}

// ── Customers ─────────────────────────────────────────────────────────────────

export function getCustomers(): Customer[] {
  return getJson<Customer[]>(KEYS.CUSTOMERS, [])
}

export function getCustomer(id: string): Customer | undefined {
  return getCustomers().find(c => c.id === id)
}

export function createCustomer(data: Omit<Customer, 'id' | 'createdAt'>): Customer {
  const customer: Customer = {
    ...data,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  }
  const all = getCustomers()
  setJson(KEYS.CUSTOMERS, [...all, customer])
  return customer
}

export function updateCustomer(id: string, data: Partial<Customer>): Customer | undefined {
  const all = getCustomers()
  const idx = all.findIndex(c => c.id === id)
  if (idx === -1) return undefined
  const updated = { ...all[idx], ...data }
  all[idx] = updated
  setJson(KEYS.CUSTOMERS, all)
  return updated
}

export function deleteCustomer(id: string): void {
  const all = getCustomers().filter(c => c.id !== id)
  setJson(KEYS.CUSTOMERS, all)
  // Also delete related documents
  const docs = getDocuments().filter(d => d.customerId !== id)
  setJson(KEYS.DOCUMENTS, docs)
}

// ── Documents ─────────────────────────────────────────────────────────────────

export function getDocuments(): DocumentRecord[] {
  return getJson<DocumentRecord[]>(KEYS.DOCUMENTS, [])
}

export function getDocumentsByCustomer(customerId: string): DocumentRecord[] {
  return getDocuments().filter(d => d.customerId === customerId)
}

export function getDocument(id: string): DocumentRecord | undefined {
  return getDocuments().find(d => d.id === id)
}

export function createDocument(
  data: Omit<DocumentRecord, 'id' | 'createdAt' | 'updatedAt'>
): DocumentRecord {
  const now = new Date().toISOString()
  const doc: DocumentRecord = {
    ...data,
    id: uuidv4(),
    createdAt: now,
    updatedAt: now,
  }
  const all = getDocuments()
  setJson(KEYS.DOCUMENTS, [...all, doc])
  return doc
}

export function updateDocument(
  id: string,
  data: Partial<Omit<DocumentRecord, 'id' | 'customerId' | 'createdAt'>>
): DocumentRecord | undefined {
  const all = getDocuments()
  const idx = all.findIndex(d => d.id === id)
  if (idx === -1) return undefined
  const updated: DocumentRecord = {
    ...all[idx],
    ...data,
    updatedAt: new Date().toISOString(),
  }
  all[idx] = updated
  setJson(KEYS.DOCUMENTS, all)
  return updated
}

export function deleteDocument(id: string): void {
  const all = getDocuments().filter(d => d.id !== id)
  setJson(KEYS.DOCUMENTS, all)
}
