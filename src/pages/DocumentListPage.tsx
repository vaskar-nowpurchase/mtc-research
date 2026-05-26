import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Customer, DocumentRecord } from '../types'
import {
  getCustomer,
  getDocumentsByCustomer,
  deleteDocument,
  seedIfNeeded,
} from '../services/storage'

export const DocumentListPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [customer, setCustomer] = useState<Customer | undefined>()
  const [documents, setDocuments] = useState<DocumentRecord[]>([])

  const load = () => {
    if (!id) return
    seedIfNeeded()
    setCustomer(getCustomer(id))
    setDocuments(getDocumentsByCustomer(id))
  }

  useEffect(() => {
    load()
  }, [id])

  const handleDelete = (docId: string) => {
    if (!confirm('Delete this document? This cannot be undone.')) return
    deleteDocument(docId)
    load()
  }

  if (!customer) {
    return (
      <div className="page">
        <div className="empty-state">
          <div className="empty-state__icon">404</div>
          <div className="empty-state__title">Customer not found</div>
          <div className="empty-state__body">
            <Link to="/" style={{ color: 'var(--accent)' }}>
              Back to customers
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">{customer.name}</div>
          <div className="page-subtitle">{customer.description}</div>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate(`/customer/${id}/create`)}
        >
          <span style={{ fontSize: 16, lineHeight: 1 }}>+</span>
          New Document
        </button>
      </div>

      {documents.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon">📄</div>
          <div className="empty-state__title">No documents yet</div>
          <div className="empty-state__body">
            Create your first document for {customer.name} to get started.
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/customer/${id}/create`)}
            style={{ marginTop: 8 }}
          >
            Create Document
          </button>
        </div>
      ) : (
        <div>
          <div
            style={{
              fontSize: 11,
              color: 'var(--text-hint)',
              fontFamily: 'var(--mono)',
              marginBottom: 12,
            }}
          >
            {documents.length} document{documents.length !== 1 ? 's' : ''}
          </div>
          <div className="doc-list">
            {documents
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
              )
              .map(doc => (
                <DocItem
                  key={doc.id}
                  doc={doc}
                  customerId={id!}
                  onDelete={() => handleDelete(doc.id)}
                  onView={() =>
                    navigate(`/customer/${id}/document/${doc.id}/view`)
                  }
                  onEdit={() =>
                    navigate(`/customer/${id}/document/${doc.id}/edit`)
                  }
                />
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

interface DocItemProps {
  doc: DocumentRecord
  customerId: string
  onDelete: () => void
  onView: () => void
  onEdit: () => void
}

const DocItem: React.FC<DocItemProps> = ({ doc, onDelete, onView, onEdit }) => {
  const updated = new Date(doc.updatedAt)
  const formattedUpdated = updated.toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="doc-item">
      <div className="doc-item__icon">📄</div>
      <div className="doc-item__info">
        <div className="doc-item__title">{doc.title || 'Untitled Document'}</div>
        <div className="doc-item__meta">Updated {formattedUpdated}</div>
      </div>
      <div className="doc-item__actions">
        <button className="btn btn-secondary btn-sm" onClick={onView}>
          View
        </button>
        <button className="btn btn-secondary btn-sm" onClick={onEdit}>
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={onDelete}
          title="Delete document"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
