import React, { useEffect, useRef } from 'react'

interface TemplatePreviewProps {
  renderedHtml: string
  isLoading?: boolean
}

// Extract everything inside <body>…</body> (or the full string if no body tag).
function extractBody(html: string): string {
  const m = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  return m ? m[1] : html
}

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  renderedHtml,
  isLoading = false,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const initializedRef = useRef(false)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return
    const doc = iframe.contentDocument || iframe.contentWindow?.document
    if (!doc) return

    if (!initializedRef.current) {
      // First render: full write so <head> / <style> are set correctly.
      doc.open()
      doc.write(renderedHtml)
      doc.close()
      initializedRef.current = true
    } else {
      // Subsequent renders: only swap body content — no full reload, no flash.
      if (doc.body) {
        doc.body.innerHTML = extractBody(renderedHtml)
      }
    }
  }, [renderedHtml])

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <span style={{ fontSize: '20px', opacity: 0.4 }}>⏳</span>
        Rendering preview…
      </div>
    )
  }

  return (
    <iframe
      ref={iframeRef}
      className="preview-iframe"
      title="Document Preview"
      sandbox="allow-same-origin allow-popups"
    />
  )
}
