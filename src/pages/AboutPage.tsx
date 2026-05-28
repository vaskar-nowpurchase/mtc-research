import React from 'react'

// ── Primitives ────────────────────────────────────────────────────────────────

const Divider = () => (
  <div style={{ height: 1, background: 'var(--border-soft)', margin: '40px 0' }} />
)

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
    color: 'var(--accent-muted)', fontFamily: 'var(--mono)', marginBottom: 10,
    display: 'flex', alignItems: 'center', gap: 8,
  }}>
    <div style={{ width: 20, height: 1, background: 'var(--accent-muted)' }} />
    {children}
  </div>
)

const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, letterSpacing: '-0.3px' }}>
    {children}
  </h2>
)

const Sub: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 640, marginBottom: 24 }}>
    {children}
  </p>
)

const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{
    background: 'var(--surface)', border: '1px solid var(--border-soft)',
    borderRadius: 'var(--radius)', padding: '20px 24px', boxShadow: 'var(--shadow-sm)', ...style,
  }}>
    {children}
  </div>
)

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{
    display: 'inline-block', fontSize: 11, fontFamily: 'var(--mono)',
    padding: '2px 8px', borderRadius: 3,
    background: 'var(--accent-light)', color: 'var(--accent)',
    border: '1px solid #2A5C4522',
  }}>
    {children}
  </span>
)

// ── Compound components ───────────────────────────────────────────────────────

const PipelineStep: React.FC<{
  n: number; label: string; sub: string
  accent?: boolean; lastInRow?: boolean
}> = ({ n, label, sub, accent, lastInRow }) => (
  <div style={{ display: 'flex', alignItems: 'stretch', flex: 1, minWidth: 0 }}>
    <div style={{
      flex: 1, background: accent ? 'var(--accent)' : 'var(--surface)',
      border: `1.5px solid ${accent ? 'var(--accent)' : 'var(--border-soft)'}`,
      borderRadius: 'var(--radius-sm)', padding: '14px 16px',
      display: 'flex', flexDirection: 'column', gap: 6,
      boxShadow: accent ? '0 2px 8px rgba(42,92,69,0.18)' : 'var(--shadow-sm)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
          background: accent ? 'rgba(255,255,255,0.25)' : 'var(--accent-light)',
          color: accent ? '#fff' : 'var(--accent)',
          fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {n}
        </span>
        <span style={{
          fontSize: 12, fontWeight: 700, fontFamily: 'var(--mono)',
          color: accent ? '#fff' : 'var(--text-primary)',
        }}>
          {label}
        </span>
      </div>
      <span style={{
        fontSize: 11, color: accent ? 'rgba(255,255,255,0.75)' : 'var(--text-secondary)',
        lineHeight: 1.5,
      }}>
        {sub}
      </span>
    </div>
    {!lastInRow && (
      <div style={{
        width: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--accent-muted)', fontSize: 16, flexShrink: 0,
      }}>→</div>
    )}
  </div>
)

const StepCard: React.FC<{ n: number; title: string; what: string; how: string; file?: string }> = ({ n, title, what, how, file }) => (
  <div style={{
    display: 'grid', gridTemplateColumns: '40px 1fr', gap: 16,
    padding: '18px 0', borderBottom: '1px solid var(--border-soft)',
  }}>
    <div style={{
      width: 32, height: 32, borderRadius: '50%',
      background: 'var(--accent-light)', border: '1.5px solid var(--accent)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 13, fontWeight: 700, color: 'var(--accent)', flexShrink: 0,
    }}>
      {n}
    </div>
    <div>
      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 4 }}>{what}</div>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{how}</div>
      {file && <div style={{ marginTop: 6 }}><Tag>{file}</Tag></div>}
    </div>
  </div>
)

const LayerRow: React.FC<{ label: string; tags: string[]; desc: string; color?: string }> = ({ label, tags, desc, color = 'var(--border-soft)' }) => (
  <div style={{
    display: 'grid', gridTemplateColumns: '140px 240px 1fr',
    gap: 16, padding: '14px 16px', borderLeft: `3px solid ${color}`,
    marginBottom: 8, background: 'var(--bg)', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
  }}>
    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', paddingTop: 2 }}>{label}</span>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, alignContent: 'flex-start' }}>
      {tags.map(t => <Tag key={t}>{t}</Tag>)}
    </div>
    <span style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{desc}</span>
  </div>
)

const FileRow: React.FC<{ path: string; role: string }> = ({ path, role }) => (
  <div style={{
    display: 'grid', gridTemplateColumns: '1fr 1.6fr',
    gap: 16, padding: '8px 12px', borderBottom: '1px solid var(--border-soft)', alignItems: 'center',
  }}>
    <code style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--accent)' }}>{path}</code>
    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{role}</span>
  </div>
)

// ── Page ─────────────────────────────────────────────────────────────────────

export const AboutPage: React.FC = () => (
  <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 80px' }}>

    {/* Hero */}
    <div style={{ background: 'var(--accent)', padding: '40px 40px 36px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff', opacity: 0.6 }} />
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--mono)' }}>
            POC v0.1 · MTC Research
          </span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', letterSpacing: '-0.5px', marginBottom: 12 }}>
          Metal Cloud — Document Builder
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', maxWidth: 680, lineHeight: 1.75, marginBottom: 24 }}>
          A POC that shows how new MTC requests can be implemented with ease and minimal frontend code.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['React 18 + TypeScript', 'FormEngine v9', 'LiquidJS v10', 'MUI v7', 'Vite'].map(t => (
            <span key={t} style={{
              fontSize: 11, padding: '4px 10px', borderRadius: 99,
              background: 'rgba(255,255,255,0.15)', color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)', fontFamily: 'var(--mono)',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>

    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 40px 0' }}>

      {/* 1 — Overview */}
      <SectionLabel>Overview</SectionLabel>
      <SectionHeading>What this is</SectionHeading>
      <Sub>
        Each customer has a form schema (built with FormEngine) and an HTML template (stored in the database).
        Both are fetched from the API into the frontend at runtime. Fill the form — the document renders live on the right side.
      </Sub>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 40 }}>
        {[
          { title: 'Schema-driven forms', body: 'The form schema is built using FormEngine and fetched from the API. It defines all fields, layout, and grouping. No React code is written per customer — just update the schema on the backend.' },
          { title: 'Live template preview', body: 'The LiquidJS template is stored in the database and fetched at runtime. Every keystroke flows through the bridge pipeline and re-renders the template with a 300ms debounce. The right panel mirrors the exact printed output.' },
          { title: 'Bridge pipeline', body: 'A three-step pipeline connects the form to the template: extract (clean raw form state) → inject (map fields to template variables) → render (LiquidJS produces HTML). Each customer has one injector file.' },
        ].map(({ title, body }) => (
          <Card key={title}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>{title}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{body}</div>
          </Card>
        ))}
      </div>

      <Divider />

      {/* 2 — System Layers */}
      <SectionLabel>Architecture</SectionLabel>
      <SectionHeading>System layers</SectionHeading>
      <Sub>Four layers, each with one responsibility. Any layer can be replaced without touching the others.</Sub>

      <Card style={{ marginBottom: 40, padding: '8px 0 0' }}>
        <LayerRow label="Storage" tags={['localStorage → REST API', 'storage.ts']} color="var(--accent-muted)"
          desc="POC uses localStorage. All reads and writes go through storage.ts — switching to a real API only requires changes in this one file." />
        <LayerRow label="Form Engine" tags={['FormViewer', 'muiView', 'define()']} color="#1565C0"
          desc="Renders a full MUI form from the customer's JSON schema. getForm() is memoised so the form doesn't reset on every keystroke. Custom widgets like ApproverList are registered via muiView.define()." />
        <LayerRow label="Bridge" tags={['extractFormData()', 'INJECTORS', 'customerInjector()']} color="var(--accent)"
          desc="Three steps: (1) extractor strips nulls and coerces scalars, (2) INJECTORS registry routes to the right customer injector, (3) injector maps fields to template variables and assembles arrays." />
        <LayerRow label="Preview" tags={['TemplatePreview', 'body.innerHTML patch']} color="#8E44AD"
          desc="Renders HTML inside an iframe for CSS isolation. First load writes the full document including head and styles. All updates after that only patch body.innerHTML — no white flash." />
        <div style={{ height: 8 }} />
      </Card>

      {/* 3 — Pipeline Diagram */}
      <SectionLabel>Data Flow</SectionLabel>
      <SectionHeading>From keystroke to rendered certificate</SectionHeading>
      <Sub>Every field change triggers the same pipeline. Form state flows forward, rendered HTML flows back to the preview.</Sub>

      <Card style={{ marginBottom: 8, padding: '20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'stretch', marginBottom: 10 }}>
          <PipelineStep n={1} label="FormEngine" sub="onFormDataChange fires on every field change" accent />
          <PipelineStep n={2} label="Dedup check" sub="JSON.stringify comparison drops identical payloads" />
          <PipelineStep n={3} label="setFormData()" sub="React state update triggers useEffect" />
          <PipelineStep n={4} label="300ms debounce" sub="collapses rapid keystrokes into one render call" lastInRow />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 8, color: 'var(--accent-muted)', fontSize: 16, marginBottom: 10 }}>↓</div>
        <div style={{ display: 'flex', alignItems: 'stretch', flexDirection: 'row-reverse' }}>
          <PipelineStep n={8} label="iframe body patch" sub="body.innerHTML — no flash, no full reload" accent />
          <PipelineStep n={7} label="LiquidJS render" sub="template + variables → rendered HTML string" />
          <PipelineStep n={6} label="customerInjector()" sub="maps fields → structured template variables" />
          <PipelineStep n={5} label="extractFormData()" sub="strips empties, coerces scalars, passes arrays" lastInRow />
        </div>
      </Card>
      <div style={{ display: 'flex', gap: 16, fontSize: 11, color: 'var(--text-hint)', fontFamily: 'var(--mono)', marginBottom: 40 }}>
        <span><span style={{ display: 'inline-block', width: 10, height: 10, background: 'var(--accent)', borderRadius: 2, marginRight: 5, verticalAlign: 'middle' }} />FormEngine & iframe boundary</span>
        <span>·</span>
        <span>Steps 1–4 left-to-right, then 5–8 right-to-left</span>
      </div>

      <Divider />

      {/* 4 — Detailed Steps */}
      <SectionLabel>Detailed Walkthrough</SectionLabel>
      <SectionHeading>Step by step</SectionHeading>
      <Sub>Each step corresponds to a distinct code boundary.</Sub>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}>
        <Card style={{ padding: '0 24px' }}>
          <StepCard n={1} title="App loads & seeds data"
            what="On first visit, seedIfNeeded() checks for the mtc_seeded flag. If absent, it writes sample customer data to localStorage."
            how="Bumping the version suffix forces a re-seed after schema changes. Document records are preserved in a separate key."
            file="services/storage.ts" />
          <StepCard n={2} title="Editor loads customer config"
            what="getCustomer(id) retrieves the customer record. In edit mode, getDocument(docId) loads saved formData."
            how="Two state slices are set: initialFormData (passed to FormViewer once, never changes) and formData (tracks live changes). FormEngine resets the form if initialData changes — splitting them prevents that."
            file="pages/DocumentEditorPage.tsx" />
          <StepCard n={3} title="FormEngine renders the form"
            what="FormPanel passes the customer's formSchema to FormViewer via a stable getForm() callback."
            how="Custom components like ApproverList are registered into muiView before first render via define() + muiView.define()."
            file="components/FormPanel.tsx" />
          <StepCard n={4} title="User types → onChange fires"
            what="FormEngine fires onFormDataChange on every field change and also during its own mount cycle."
            how="lastDataRef holds a JSON.stringify of the last payload. Matching strings are dropped before setState — breaks the infinite re-render loop."
            file="DocumentEditorPage.tsx → handleDataChange" />
          <StepCard n={5} title="useEffect debounces the render"
            what="useEffect fires when formData changes. A 300ms setTimeout debounce collapses rapid keystrokes."
            how="If another change arrives within 300ms, the previous timer is cleared and a new one starts. Only the last change in a burst triggers bridgeRender."
            file="DocumentEditorPage.tsx" />
        </Card>
        <Card style={{ padding: '0 24px' }}>
          <StepCard n={6} title="extractFormData cleans the state"
            what="Strips null, undefined, and empty-string values. Coerces scalars to String(v). Passes arrays through unchanged."
            how="Arrays from widgets like ApproverList must not be stringified — String([{name:'A'}]) becomes '[object Object]' and corrupts the data."
            file="services/bridge/extractor.ts" />
          <StepCard n={7} title="INJECTORS routes to customer injector"
            what="bridgeRender() looks up the customer ID in the INJECTORS map."
            how="If no injector is registered, extracted data is passed straight to LiquidJS as a fallback. Each customer has one injector file."
            file="services/bridge/index.ts" />
          <StepCard n={8} title="Injector builds template variables"
            what="Maps extracted form field keys to the variable names the LiquidJS template expects."
            how="Numbered row fields (item1_desc…item8_desc) are assembled into arrays (inspectionItems[]). The approvers array from ApproverList is read directly."
            file="services/bridge/injectors/" />
          <StepCard n={9} title="LiquidJS renders the template"
            what="Singleton engine with strictVariables:false renders the HTML template with injected data. Missing variables default to empty — the preview always renders on partial input."
            how="Templates use {{ var | default: '—' }}, {% for %} loops, and {% if %} conditionals."
            file="services/liquid.ts" />
          <StepCard n={10} title="iframe preview updates"
            what="First render: contentDocument.write(fullHtml) sets the full document including head and styles. Every render after: doc.body.innerHTML is swapped."
            how="Styles stay in head from the first write. Re-renders are in-place with no white flash."
            file="components/TemplatePreview.tsx" />
        </Card>
      </div>

      <Divider />

      {/* 5 — File map */}
      <SectionLabel>Codebase</SectionLabel>
      <SectionHeading>Key files</SectionHeading>
      <Sub>Every file has one clear responsibility.</Sub>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 40 }}>
        <Card style={{ padding: '0 0 8px' }}>
          <div style={{ padding: '12px 16px 8px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-hint)', borderBottom: '1px solid var(--border-soft)' }}>Core</div>
          <FileRow path="src/types/index.ts" role="Customer, DocumentRecord, CustomerFeatures types" />
          <FileRow path="src/services/storage.ts" role="All localStorage reads/writes — swap for API calls in production" />
          <FileRow path="src/services/liquid.ts" role="LiquidJS singleton + renderTemplate()" />
          <FileRow path="src/data/customers.ts" role="Sample customer schemas and templates (POC only)" />
        </Card>
        <Card style={{ padding: '0 0 8px' }}>
          <div style={{ padding: '12px 16px 8px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-hint)', borderBottom: '1px solid var(--border-soft)' }}>Bridge</div>
          <FileRow path="src/services/bridge/index.ts" role="bridgeRender() + INJECTORS registry" />
          <FileRow path="src/services/bridge/extractor.ts" role="Cleans raw FormEngine state" />
          <FileRow path=".../vishwakarmaInjector.ts" role="Field mapping for Vishwakarma MTC" />
          <FileRow path=".../abcCastingsInjector.ts" role="Field mapping for ABC Castings PIR" />
        </Card>
        <Card style={{ padding: '0 0 8px' }}>
          <div style={{ padding: '12px 16px 8px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-hint)', borderBottom: '1px solid var(--border-soft)' }}>Components</div>
          <FileRow path="src/components/FormPanel.tsx" role="FormViewer wrapper — stable getForm, custom component registration" />
          <FileRow path="src/components/TemplatePreview.tsx" role="Iframe with first-write / body-patch strategy" />
          <FileRow path="src/components/ApproverListWidget.tsx" role="Dynamic approver rows — custom FormEngine widget" />
        </Card>
        <Card style={{ padding: '0 0 8px' }}>
          <div style={{ padding: '12px 16px 8px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-hint)', borderBottom: '1px solid var(--border-soft)' }}>Pages</div>
          <FileRow path="src/pages/DocumentEditorPage.tsx" role="Main editor — state, debounce, dedup, save" />
          <FileRow path="src/pages/DocumentListPage.tsx" role="List of saved documents for a customer" />
          <FileRow path="src/pages/DocumentViewPage.tsx" role="Full-screen view + print" />
          <FileRow path="src/pages/CustomerListPage.tsx" role="Customer selection screen" />
        </Card>
      </div>

      <Divider />

      {/* 6 — Pros & Cons */}
      <SectionLabel>Evaluation</SectionLabel>
      <SectionHeading>Pros & cons</SectionHeading>
      <Sub>An honest assessment of what this approach improves and where the limits still are.</Sub>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 40 }}>
        <Card style={{ padding: '0 0 4px', borderTop: '3px solid var(--accent)' }}>
          <div style={{ padding: '14px 20px 10px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--accent)', borderBottom: '1px solid var(--border-soft)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 16 }}>✓</span> Pros
          </div>
          {[
            { title: 'MTC creation and updates become trivial', body: 'Adding or modifying a certificate type no longer requires changing multiple React components. It becomes a data operation — update the form schema and the template on the backend, and the editor picks it up at runtime.' },
            { title: 'Frontend becomes genuinely lightweight', body: 'The frontend fetches both the form schema and the HTML template from the server at runtime. It ships zero customer-specific form code or template markup — it is a pure rendering shell. New customers and document types happen on the backend without a frontend deployment.' },
            { title: 'Devs can build forms without touching UI code', body: "FormEngine's JSON schema is composable. A developer can author a complete, multi-section MUI form entirely in JSON — no JSX, no component files, no stylesheet." },
            { title: 'Templates live where they belong — the backend', body: 'Storing LiquidJS templates server-side means a single source of truth for every certificate layout. Version control, access control, and change history all happen on the backend.' },
          ].map(({ title, body }, i) => (
            <div key={i} style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-soft)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0, marginTop: 2, width: 20, height: 20, borderRadius: '50%', background: 'var(--accent-light)', color: 'var(--accent)', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{body}</div>
              </div>
            </div>
          ))}
        </Card>

        <Card style={{ padding: '0 0 4px', borderTop: '3px solid var(--danger)' }}>
          <div style={{ padding: '14px 20px 10px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--danger)', borderBottom: '1px solid var(--border-soft)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 16 }}>!</span> Cons
          </div>
          {[
            { title: 'Still not self-serve for non-developers', body: 'A non-technical user cannot independently build a complete MTC from scratch. Authoring a valid FormEngine schema and a correctly structured LiquidJS template still requires developer knowledge. This reduces developer involvement per customer but does not eliminate it.' },
            { title: 'Template authoring moves to the backend, not away from devs', body: 'Templates are no longer hardcoded in the frontend, but they still need to be written, tested, and deployed by someone with technical skills. The problem shifts rather than disappears.' },
            { title: 'Complex templates still need custom injector code', body: 'Simple, structurally similar certificates can use a generic injector. But certificates with unusual data structures, computed fields, or non-standard repeating sections still require a developer to write a customer-specific injector. The more bespoke the certificate, the more code is still needed.' },
          ].map(({ title, body }, i) => (
            <div key={i} style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-soft)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0, marginTop: 2, width: 20, height: 20, borderRadius: '50%', background: 'var(--danger-light)', color: 'var(--danger)', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{body}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>

    </div>
  </div>
)
