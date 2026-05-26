import React from 'react'
import { BrowserRouter, Route, Routes, Link, useLocation } from 'react-router-dom'
import { CustomerListPage } from './pages/CustomerListPage'
import { DocumentListPage } from './pages/DocumentListPage'
import { DocumentEditorPage } from './pages/DocumentEditorPage'
import { DocumentViewPage } from './pages/DocumentViewPage'
import { AboutPage } from './pages/AboutPage'

// ── Breadcrumb bar (shown on most pages except editor/view) ───────────────────
const TopNav: React.FC = () => {
  const location = useLocation()

  const isEditorOrView =
    location.pathname.includes('/create') ||
    location.pathname.includes('/edit') ||
    location.pathname.includes('/view')

  if (isEditorOrView) return null

  return (
    <nav className="top-nav">
      <Link to="/" className="top-nav__logo">
        <div className="top-nav__logo-dot" />
        MTC Research
      </Link>
      <div className="top-nav__breadcrumbs">
        <span className="top-nav__sep">/</span>
        <span style={{ color: 'var(--text-hint)' }}>Document Builder</span>
      </div>
      <div className="top-nav__spacer" />
      <Link to="/about" style={{ fontSize: 11, color: 'var(--text-hint)', fontFamily: 'var(--mono)', textDecoration: 'none' }}>
        About
      </Link>
      <span
        style={{
          fontSize: 11,
          color: 'var(--text-hint)',
          fontFamily: 'var(--mono)',
          marginLeft: 16,
        }}
      >
        POC v0.1
      </span>
    </nav>
  )
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <TopNav />
        <Routes>
          <Route path="/" element={<CustomerListPage />} />
          <Route path="/customer/:id" element={<DocumentListPage />} />
          <Route path="/customer/:id/create" element={<DocumentEditorPage />} />
          <Route
            path="/customer/:id/document/:docId/edit"
            element={<DocumentEditorPage />}
          />
          <Route
            path="/customer/:id/document/:docId/view"
            element={<DocumentViewPage />}
          />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
