import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { FormPanel } from '../components/FormPanel'
import { TemplatePreview } from '../components/TemplatePreview'
import { bridgeRender } from '../services/bridge'
import {
  getCustomer,
  getDocument,
  createDocument,
  updateDocument,
  seedIfNeeded,
} from '../services/storage'
import { Customer, DocumentRecord } from '../types'

export const DocumentEditorPage: React.FC = () => {
  const { id, docId } = useParams<{ id: string; docId: string }>()
  const navigate = useNavigate()
  const mode = docId ? 'edit' : 'create'

  const [customer, setCustomer] = useState<Customer | undefined>()
  const [existingDoc, setExistingDoc] = useState<DocumentRecord | undefined>()
  const [title, setTitle] = useState('')
  // Live form state — updated on every FormEngine onChange
  const [formData, setFormData] = useState<Record<string, unknown>>({})
  // Stable seed passed to FormViewer once on load — never changes after that
  // so FormEngine doesn't reload/reset the form on every keystroke
  const [initialFormData, setInitialFormData] = useState<Record<string, unknown> | undefined>()
  const [renderedHtml, setRenderedHtml] = useState('')
  const [isRendering, setIsRendering] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle')
  const [leftWidth, setLeftWidth] = useState(50)

  useEffect(() => {
    seedIfNeeded()
    if (!id) return
    const cust = getCustomer(id)
    setCustomer(cust)

    if (mode === 'edit' && docId) {
      const doc = getDocument(docId)
      if (doc) {
        setExistingDoc(doc)
        setTitle(doc.title)
        setFormData(doc.formData)        // populate live state for save
        setInitialFormData(doc.formData) // seed FormViewer once — stable ref
        // Kick off the initial render; subsequent changes go through the reactive useEffect
        bridgeRender(id, doc.formData).then(setRenderedHtml)
      }
    } else {
      setTitle('')
      setFormData({})
      setInitialFormData(undefined)
      // formData is already {} so the reactive useEffect won't fire — render once manually
      bridgeRender(id, {}).then(setRenderedHtml)
    }
  }, [id, docId, mode])

  // ── Reactive render: fires whenever formData changes ─────────────────────
  // This is the bridge: FormEngine state → injector → LiquidJS → preview.
  // Using useEffect guarantees the preview updates on *every* onChange,
  // not just when Save is clicked.
  useEffect(() => {
    if (!id) return
    let cancelled = false
    setIsRendering(true)
    const timer = setTimeout(async () => {
      const html = await bridgeRender(id, formData)
      if (!cancelled) {
        setRenderedHtml(html)
        setIsRendering(false)
      }
    }, 300)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [formData, id])

  // Ref-based dedup: FormEngine fires onFormDataChange during its own render cycle,
  // which would cause setFormData → re-render → FormEngine fires again → infinite loop.
  const lastDataRef = useRef<string>('')

  const handleDataChange = useCallback((data: Record<string, unknown>) => {
    const serialized = JSON.stringify(data)
    if (serialized === lastDataRef.current) return
    lastDataRef.current = serialized
    setFormData(data)
  }, [])

  const handleSave = async () => {
    if (!id || !customer) return
    setIsSaving(true)
    setSaveStatus('idle')
    try {
      // renderedHtml is already up to date from the reactive useEffect.
      // Re-render once more here to get a fresh snapshot for the saved record.
      const html = await bridgeRender(id, formData)
      setRenderedHtml(html)

      if (mode === 'edit' && existingDoc) {
        updateDocument(existingDoc.id, {
          title: title || 'Untitled Document',
          formData,
          renderedHtml: html,
        })
      } else {
        const doc = createDocument({
          customerId: id,
          title: title || 'Untitled Document',
          formData,
          renderedHtml: html,
        })
        navigate(`/customer/${id}/document/${doc.id}/edit`, { replace: true })
      }
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2500)
    } catch {
      setSaveStatus('error')
    } finally {
      setIsSaving(false)
    }
  }

  // ── Resizable divider ──────────────────────────────────────────────────────
  const isResizing = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault()
    isResizing.current = true
    const onMove = (ev: MouseEvent) => {
      if (!isResizing.current || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const pct = ((ev.clientX - rect.left) / rect.width) * 100
      setLeftWidth(Math.min(Math.max(pct, 25), 75))
    }
    const onUp = () => {
      isResizing.current = false
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  if (!customer) {
    return (
      <div className="page">
        <div className="empty-state">
          <div className="empty-state__icon">404</div>
          <div className="empty-state__title">Customer not found</div>
          <div className="empty-state__body">
            <Link to="/" style={{ color: 'var(--accent)' }}>Go to customers</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="editor-shell">
      {/* ── Toolbar ── */}
      <div className="editor-toolbar">
        <Link to={`/customer/${id}`} className="btn btn-ghost btn-sm" style={{ padding: '5px 8px' }}>
          ← Back
        </Link>
        <div style={{ width: 1, height: 20, background: 'var(--border-soft)', flexShrink: 0 }} />
        <input
          className="editor-toolbar__title-input"
          type="text"
          placeholder="Untitled Document"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <div style={{ fontSize: 11, color: 'var(--text-hint)', fontFamily: 'var(--mono)', flexShrink: 0 }}>
          {customer.name}
        </div>
        {saveStatus === 'saved' && (
          <span style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, flexShrink: 0 }}>✓ Saved</span>
        )}
        {saveStatus === 'error' && (
          <span style={{ fontSize: 12, color: 'var(--danger)', flexShrink: 0 }}>✕ Save failed</span>
        )}
        {mode === 'edit' && existingDoc && (
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigate(`/customer/${id}/document/${existingDoc.id}/view`)}
            style={{ flexShrink: 0 }}
          >
            View Full
          </button>
        )}
        <button className="btn btn-primary" onClick={handleSave} disabled={isSaving} style={{ flexShrink: 0 }}>
          {isSaving ? 'Saving…' : mode === 'edit' ? 'Save Changes' : 'Create Document'}
        </button>
      </div>

      {/* ── Two-panel body ── */}
      <div className="editor-body" ref={containerRef}>
        {/* Left: Form */}
        <div
          className="editor-panel editor-panel--left"
          style={{ flex: `0 0 ${leftWidth}%`, maxWidth: `${leftWidth}%` }}
        >
          <div className="editor-panel__header">
            <span className="editor-panel__title">Form Input</span>
            <span style={{ fontSize: 10, color: 'var(--text-hint)', fontFamily: 'var(--mono)' }}>
              {customer.name}
            </span>
          </div>
          <div className="editor-panel__content">
            {/* FormEngine renders the entire form — including repeating row fields.
                The bridge+injector assembles arrays from numbered fields (s1_uts, s2_uts…) */}
            <FormPanel
              formSchema={customer.formSchema}
              initialData={initialFormData}
              onDataChange={handleDataChange}
            />
          </div>
        </div>

        {/* Resize handle */}
        <div className="resize-handle" onMouseDown={startResize} />

        {/* Right: Preview */}
        <div
          className="editor-panel editor-panel--right"
          style={{ flex: `0 0 ${100 - leftWidth}%`, maxWidth: `${100 - leftWidth}%` }}
        >
          <div className="editor-panel__header">
            <span className="editor-panel__title">Live Preview</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {isRendering && (
                <span style={{ fontSize: 10, color: 'var(--text-hint)', fontFamily: 'var(--mono)' }}>
                  rendering…
                </span>
              )}
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-muted)' }} />
            </div>
          </div>
          <div className="editor-panel__content--no-pad">
            <TemplatePreview renderedHtml={renderedHtml} isLoading={false} />
          </div>
        </div>
      </div>

      {/* ── Status bar ── */}
      <div className="status-bar">
        <div className="status-bar__dot" />
        <span>
          {mode === 'edit' ? 'Editing document' : 'Creating new document'} · {customer.name}
        </span>
        {Object.keys(formData).length > 0 && (
          <span>· {Object.keys(formData).length} fields</span>
        )}
      </div>
    </div>
  )
}
