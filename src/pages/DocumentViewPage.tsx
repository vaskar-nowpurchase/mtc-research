import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { DocumentRecord, Customer } from '../types'
import { getDocument, getCustomer, seedIfNeeded } from '../services/storage'

export const DocumentViewPage: React.FC = () => {
  const { id, docId } = useParams<{ id: string; docId: string }>()
  const navigate = useNavigate()
  const [doc, setDoc] = useState<DocumentRecord | undefined>()
  const [customer, setCustomer] = useState<Customer | undefined>()

  useEffect(() => {
    seedIfNeeded()
    if (docId) setDoc(getDocument(docId))
    if (id) setCustomer(getCustomer(id))
  }, [id, docId])

  const handlePrint = () => {
    const iframe = document.querySelector<HTMLIFrameElement>('.view-page__iframe')
    iframe?.contentWindow?.print()
  }

  if (!doc || !customer) {
    return (
      <div className="page">
        <div className="empty-state">
          <div className="empty-state__icon">404</div>
          <div className="empty-state__title">Document not found</div>
          <div className="empty-state__body">
            <Link to="/" style={{ color: 'var(--accent)' }}>
              Back to home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="view-page">
      <div className="view-page__toolbar">
        <Link
          to={`/customer/${id}`}
          className="btn btn-ghost btn-sm"
        >
          ← Back
        </Link>

        <div
          style={{
            width: 1,
            height: 20,
            background: 'var(--border-soft)',
            flexShrink: 0,
          }}
        />

        <div className="view-page__title">{doc.title || 'Untitled Document'}</div>

        <div
          style={{
            fontSize: 11,
            color: 'var(--text-hint)',
            fontFamily: 'var(--mono)',
          }}
        >
          {customer.name}
        </div>

        <button
          className="btn btn-secondary btn-sm"
          onClick={() => navigate(`/customer/${id}/document/${docId}/edit`)}
        >
          Edit
        </button>

        <button className="btn btn-primary btn-sm" onClick={handlePrint}>
          🖨 Print
        </button>
      </div>

      <iframe
        className="view-page__iframe"
        title="Document View"
        srcDoc={doc.renderedHtml}
        sandbox="allow-same-origin allow-popups allow-modals"
      />
    </div>
  )
}
