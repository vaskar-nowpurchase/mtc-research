import React from 'react'
import archUrl from '../../docs/ARCHITECTURE.md?url'
import workingUrl from '../../docs/WORKING.md?url'

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

const Code: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code style={{
    fontFamily: 'var(--mono)', fontSize: 11, padding: '1px 5px',
    background: 'var(--bg)', border: '1px solid var(--border-soft)',
    borderRadius: 3, color: 'var(--accent)',
  }}>
    {children}
  </code>
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

const DecisionCard: React.FC<{ problem: string; decision: string; why: string }> = ({ problem, decision, why }) => (
  <Card style={{ padding: '16px 20px' }}>
    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-hint)', fontFamily: 'var(--mono)', marginBottom: 6 }}>Problem</div>
    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>{problem}</div>
    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--accent-muted)', fontFamily: 'var(--mono)', marginBottom: 6 }}>Decision</div>
    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{decision}</div>
    <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{why}</div>
  </Card>
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
          A schema-driven, per-customer industrial document generation system. A form schema and an HTML template
          are all that's needed per customer — filling the form renders the certificate live in a split-pane
          editor with no additional frontend code.
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
      <SectionHeading>What this system does</SectionHeading>
      <Sub>
        Industrial companies generate the same class of documents repeatedly — Material Test Certificates,
        Product Inspection Reports, quality certificates — for different customers with different formats.
        This POC demonstrates a configurable pipeline where each customer's document type is defined purely
        in data (a JSON form schema + an HTML template), with no React code written per customer.
      </Sub>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 40 }}>
        {[
          { icon: '📋', title: 'Schema-driven forms', body: 'FormEngine renders a full MUI form from a JSON schema. Field types, labels, layout, and grouping are all defined in the customer config — no React code per customer.' },
          { icon: '⚡', title: 'Live template preview', body: 'Every keystroke flows through the bridge pipeline and re-renders the LiquidJS template with a 300 ms debounce. The right panel mirrors the exact printed output.' },
          { icon: '🔌', title: 'Pluggable per-customer logic', body: 'Each customer gets one injector file that maps flat form fields to structured template variables. Adding a customer = one injector + one registry entry.' },
        ].map(({ icon, title, body }) => (
          <Card key={title}>
            <div style={{ fontSize: 22, marginBottom: 10 }}>{icon}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>{title}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{body}</div>
          </Card>
        ))}
      </div>

      <Divider />

      {/* 2 — System Layers */}
      <SectionLabel>Architecture</SectionLabel>
      <SectionHeading>System layers</SectionHeading>
      <Sub>The app is built in five clearly separated layers. Each layer has one responsibility and can be replaced independently.</Sub>

      <Card style={{ marginBottom: 40, padding: '8px 0 0' }}>
        <LayerRow label="Persistence" tags={['LocalStorage → REST API', 'storage.ts']} color="var(--accent-muted)"
          desc="POC uses LocalStorage for zero-infra simplicity. storage.ts is the single persistence boundary — swapping it for REST API calls requires changes only in this one file." />
        <LayerRow label="Form Engine" tags={['FormViewer', 'muiView', 'define()']} color="#1565C0"
          desc="Renders a schema-driven MUI form. getForm() is memoised to prevent re-initialisation on every render. Custom components (e.g. ApproverList) are pre-registered via muiView.define()." />
        <LayerRow label="Bridge" tags={['extractFormData()', 'INJECTORS', 'customerInjector()']} color="var(--accent)"
          desc="Three-stage pipeline: (1) extractor normalises raw state, (2) INJECTORS registry routes by customer ID, (3) injector maps fields to structured template variables and assembles repeating arrays." />
        <LayerRow label="Template Engine" tags={['LiquidJS v10', 'renderTemplate()']} color="#E67E22"
          desc="Singleton LiquidJS engine with strictFilters:false and strictVariables:false. Missing variables default to empty without throwing. Supports {{ var | default }}, {% for %} loops, and {% if %} conditionals." />
        <LayerRow label="Preview Iframe" tags={['TemplatePreview', 'body.innerHTML patch']} color="#8E44AD"
          desc="Full CSS isolation. First render uses contentDocument.write() to initialise the <head>. All subsequent updates patch only body.innerHTML — no white flash on every keystroke." />
        <div style={{ height: 8 }} />
      </Card>

      {/* 3 — Pipeline Diagram */}
      <SectionLabel>Data Flow — High Level</SectionLabel>
      <SectionHeading>From keystroke to rendered certificate</SectionHeading>
      <Sub>Every field change triggers the same pipeline. One-directional — form state flows forward, rendered HTML flows back to the preview.</Sub>

      <Card style={{ marginBottom: 8, padding: '20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'stretch', marginBottom: 10 }}>
          <PipelineStep n={1} label="FormEngine" sub="onFormDataChange fires on every field change" accent />
          <PipelineStep n={2} label="lastDataRef dedup" sub="JSON.stringify comparison blocks identical payloads" />
          <PipelineStep n={3} label="setFormData()" sub="React state update triggers useEffect" />
          <PipelineStep n={4} label="300 ms debounce" sub="collapses rapid keystrokes into a single render call" lastInRow />
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
      <SectionLabel>Data Flow — Detailed</SectionLabel>
      <SectionHeading>Step-by-step walkthrough</SectionHeading>
      <Sub>Each step corresponds to a distinct code boundary. Understanding where one ends and the next begins is key to extending the system.</Sub>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}>
        <Card style={{ padding: '0 24px' }}>
          <StepCard n={1} title="App bootstraps & seeds data"
            what="On first visit, seedIfNeeded() checks for the mtc_seeded_vN flag. If absent, it writes SAMPLE_CUSTOMERS with their formSchema JSON strings and LiquidJS templates."
            how="Bumping the version suffix forces a re-seed after schema changes — document records are preserved in a separate key."
            file="services/storage.ts → seedIfNeeded()" />
          <StepCard n={2} title="Customer config loaded in editor"
            what="getCustomer(id) retrieves the Customer record. In edit mode, getDocument(docId) retrieves saved formData and seeds the form."
            how="Two state slices: initialFormData (set once, stable FormViewer seed) and formData (live, updated on every onChange). FormEngine treats initialData as reactive — passing live state would reset the form on every keystroke."
            file="pages/DocumentEditorPage.tsx" />
          <StepCard n={3} title="FormEngine renders the form"
            what="FormPanel passes customer.formSchema to FormViewer via a stable getForm() callback. Custom components like ApproverList are registered into muiView before first render."
            how="define(Component, 'ApproverList').props({ value: array.valued }).build().model — the component reads its value prop and writes back via field.setValue() from useComponentData()."
            file="components/FormPanel.tsx" />
          <StepCard n={4} title="User types → onFormDataChange fires"
            what="FormEngine fires onFormDataChange on every field change and also during its own mount cycle. Without dedup this causes an infinite re-render loop."
            how="lastDataRef holds JSON.stringify of the last-seen payload. Matching strings are dropped before reaching setState — no re-render, loop broken."
            file="DocumentEditorPage.tsx → handleDataChange" />
          <StepCard n={5} title="useEffect detects change and debounces"
            what="useEffect([formData, id]) fires when formData reference changes. A 300 ms setTimeout debounce collapses rapid keystrokes."
            how="If another change arrives within 300 ms, the cleanup calls clearTimeout and a new timer starts. Only the last change in a burst triggers bridgeRender."
            file="DocumentEditorPage.tsx → reactive render effect" />
        </Card>
        <Card style={{ padding: '0 24px' }}>
          <StepCard n={6} title="extractFormData normalises the state"
            what="Strips null, undefined, and empty-string values. Coerces scalars to String(v). Passes arrays through as-is."
            how="Arrays from custom components like ApproverList must not be stringified — String([{name:'A'}]) = '[object Object]' would corrupt the data before it reaches the injector."
            file="services/bridge/extractor.ts" />
          <StepCard n={7} title="INJECTORS registry routes to customer injector"
            what="bridgeRender() looks up the customer ID in the INJECTORS map. No injector registered = extracted data passed directly to LiquidJS as a safe fallback."
            how="Adding a customer: one injector file + one entry in INJECTORS. Nothing else changes."
            file="services/bridge/index.ts → INJECTORS" />
          <StepCard n={8} title="Customer injector builds template variables"
            what="Maps extracted form field keys to the variable names used in the LiquidJS template. Assembles repeating arrays from numbered slots or reads pre-built arrays."
            how="Fixed-slot pattern: item1_desc…item8_desc mapped to inspectionItems[]. Pre-built array: data['approvers'] read directly from the ApproverList widget."
            file="services/bridge/injectors/[customer]Injector.ts" />
          <StepCard n={9} title="LiquidJS renders the template"
            what="Singleton engine with strictVariables:false renders the HTML template with the injected data. Missing variables default to empty — the preview always renders on partial input."
            how="Templates use standard Liquid: {{ inspector | default: '—' }}, {% for a in approvers %}, forloop.index for 1-based row numbers."
            file="services/liquid.ts → renderTemplate()" />
          <StepCard n={10} title="Iframe preview updates without flash"
            what="First render: contentDocument.write(fullHtml) initialises <head> and styles. All subsequent renders: doc.body.innerHTML = extracted body content only."
            how="Since styles are in <head> from the first write, re-renders are in-place with no blank flash — critical for a smooth live-editing experience."
            file="components/TemplatePreview.tsx" />
        </Card>
      </div>

      <Divider />

      {/* 5 — Customer onboarding */}
      <SectionLabel>Extensibility</SectionLabel>
      <SectionHeading>Adding a new customer</SectionHeading>
      <Sub>Three artefacts are all that is needed. The editor, preview, and save/load work automatically for every new customer.</Sub>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 40 }}>
        {[
          { step: '01', label: 'Form schema JSON', desc: 'A FormEngine schema object defining all form fields — text inputs, date pickers, dropdowns, repeating slot rows. Stored on the Customer record and fetched at runtime.', eg: '{ key: "Screen", type: "Screen", children: [...] }' },
          { step: '02', label: 'LiquidJS HTML template', desc: 'A complete HTML document with inline CSS and LiquidJS tags for all dynamic values. Supports {{ var }}, {% for %} loops, and {% if %} conditionals.', eg: '{{ inspector | default: "—" }}' },
          { step: '03', label: 'Customer injector + registry', desc: 'One TypeScript file that maps extracted form fields to template variable names. Registered in INJECTORS with the customer ID as key.', eg: "INJECTORS['cust-003-...'] = myInject" },
        ].map(({ step, label, desc, eg }) => (
          <Card key={step} style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 12, right: 16, fontSize: 32, fontWeight: 800, color: 'var(--accent-light)', fontFamily: 'var(--mono)', lineHeight: 1 }}>{step}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 8 }}>{label}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 10 }}>{desc}</div>
            <div style={{ fontSize: 11, fontFamily: 'var(--mono)', padding: '6px 10px', background: 'var(--bg)', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)', wordBreak: 'break-all' }}>{eg}</div>
          </Card>
        ))}
      </div>

      <Divider />

      {/* 6 — Design decisions */}
      <SectionLabel>Design Decisions</SectionLabel>
      <SectionHeading>Why it was built this way</SectionHeading>
      <Sub>Each non-obvious architectural choice was made to solve a specific problem.</Sub>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 40 }}>
        <DecisionCard problem="FormEngine fires onFormDataChange during its own render/mount cycle, not just on user input." decision="Ref-based deduplication via JSON.stringify" why="Comparing serialised form state on every callback means identical payloads are silently dropped before reaching setState. Breaks the re-render loop without timeouts or suppressions." />
        <DecisionCard problem="Passing live form state as initialData to FormViewer caused the form to reset on every keystroke." decision="Separate initialFormData (set once) from formData (live)" why="FormEngine treats initialData as a reactive prop — any change re-initialises the form. Splitting into two slices gives FormViewer a stable seed while the editor tracks live changes separately." />
        <DecisionCard problem="iframe content flickered white on every keystroke because the entire document was rewritten." decision="Full document.write() once, then body.innerHTML patches only" why="The <head> contains the certificate's CSS. Rewriting the full document clears and re-parses styles, causing a visible flash. After the first write, only the body needs updating." />
        <DecisionCard problem="Adding dynamic UI (approver list) without breaking the all-data-through-FormEngine contract." decision="Register custom components via define() + muiView.define()" why="FormEngine's define() API wraps any React component into the schema system. The component reads its value prop and writes back via field.setValue(). The array flows through the same onFormDataChange callback as every other field." />
        <DecisionCard problem="Repeating table rows can't be dynamic without custom UI or a native FormEngine repeater." decision="Fixed-slot numbered fields assembled into arrays by the injector" why="Defining item1_description…item8_description as static FormEngine fields is the zero-custom-component solution. The injector maps them into an array and filters empty rows. Tradeoff: fixed maximum row count." />
        <DecisionCard problem="LiquidJS throws errors for undefined variables in strict mode, breaking the preview on partial input." decision="Singleton engine with strictVariables:false and lenientIf:true" why="A certificate template with 40+ variables would error on every keystroke during early form filling. Lenient mode means the preview always renders — unfilled fields show blank or the | default value." />
      </div>

      <Divider />

      {/* 7 — File map */}
      <SectionLabel>Codebase</SectionLabel>
      <SectionHeading>Key files and their roles</SectionHeading>
      <Sub>The project is intentionally flat. Every meaningful file has one clear responsibility.</Sub>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 40 }}>
        <Card style={{ padding: '0 0 8px' }}>
          <div style={{ padding: '12px 16px 8px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-hint)', borderBottom: '1px solid var(--border-soft)' }}>Core</div>
          <FileRow path="src/types/index.ts" role="Customer, DocumentRecord, CustomerFeatures types" />
          <FileRow path="src/services/storage.ts" role="LocalStorage CRUD + seed logic (POC only)" />
          <FileRow path="src/services/liquid.ts" role="LiquidJS singleton + renderTemplate()" />
          <FileRow path="src/data/customers.ts" role="SAMPLE_CUSTOMERS — formSchema + template per customer" />
        </Card>
        <Card style={{ padding: '0 0 8px' }}>
          <div style={{ padding: '12px 16px 8px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-hint)', borderBottom: '1px solid var(--border-soft)' }}>Bridge</div>
          <FileRow path="src/services/bridge/index.ts" role="bridgeRender() + INJECTORS registry" />
          <FileRow path="src/services/bridge/extractor.ts" role="Normalises raw FormEngine state" />
          <FileRow path=".../vishwakarmaInjector.ts" role="MTC field mapping + testSamples[] assembly" />
          <FileRow path=".../abcCastingsInjector.ts" role="PIR field mapping + inspectionItems[] + approvers[]" />
        </Card>
        <Card style={{ padding: '0 0 8px' }}>
          <div style={{ padding: '12px 16px 8px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-hint)', borderBottom: '1px solid var(--border-soft)' }}>Components</div>
          <FileRow path="src/components/FormPanel.tsx" role="FormViewer wrapper — stable getForm, custom component registration" />
          <FileRow path="src/components/TemplatePreview.tsx" role="Iframe with first-write / body-patch strategy" />
          <FileRow path="src/components/ApproverListWidget.tsx" role="Custom FormEngine component registered via define()" />
        </Card>
        <Card style={{ padding: '0 0 8px' }}>
          <div style={{ padding: '12px 16px 8px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-hint)', borderBottom: '1px solid var(--border-soft)' }}>Pages</div>
          <FileRow path="src/pages/DocumentEditorPage.tsx" role="Split-pane editor — state, debounce, dedup, resize, save" />
          <FileRow path="src/pages/DocumentListPage.tsx" role="Per-customer document list" />
          <FileRow path="src/pages/DocumentViewPage.tsx" role="Full-screen rendered certificate view" />
          <FileRow path="src/pages/CustomerListPage.tsx" role="Customer selection grid" />
        </Card>
      </div>


      <Divider />

      {/* 8 — Docs */}
      <SectionLabel>Documentation</SectionLabel>
      <SectionHeading>Reference docs</SectionHeading>
      <Sub>Two markdown files ship with this project — one covering the architecture and one covering the detailed working flow.</Sub>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 40 }}>
        {[
          {
            url: archUrl,
            filename: 'ARCHITECTURE.md',
            title: 'Architecture',
            desc: 'Covers the POC idea, core concept, system layers, how to add a new customer, and an honest pros/cons assessment of the approach.',
          },
          {
            url: workingUrl,
            filename: 'WORKING.md',
            title: 'Detailed Working',
            desc: 'A 12-step walkthrough of the full data pipeline, the complete tech stack table, key files, and a POC-vs-production replacement guide.',
          },
        ].map(({ url, filename, title, desc }) => (
          <a
            key={filename}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
            onMouseEnter={(e) => {
              (e.currentTarget.firstElementChild as HTMLElement).style.borderColor = 'var(--accent)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget.firstElementChild as HTMLElement).style.borderColor = 'var(--border-soft)'
            }}
          >
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border-soft)',
              borderRadius: 'var(--radius)', padding: '20px 24px', boxShadow: 'var(--shadow-sm)',
              display: 'flex', gap: 16, alignItems: 'flex-start',
              cursor: 'pointer', transition: 'border-color 0.15s',
            }}>
              <div style={{
                flexShrink: 0, width: 40, height: 40, borderRadius: 'var(--radius-sm)',
                background: 'var(--accent-light)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 18,
              }}>
                📄
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{title}</div>
                <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--accent)', marginBottom: 6 }}>{filename}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{desc}</div>
              </div>
              <div style={{ flexShrink: 0, marginLeft: 'auto', paddingLeft: 12, color: 'var(--text-hint)', fontSize: 14 }}>↗</div>
            </div>
          </a>
        ))}
      </div>

      <Divider />

      {/* 9 — Pros & Cons — renumbered */}
      <SectionLabel>Evaluation</SectionLabel>
      <SectionHeading>Pros & cons of this approach</SectionHeading>
      <Sub>An honest assessment of what this architecture genuinely improves and where the hard limits still sit.</Sub>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 40 }}>
        <Card style={{ padding: '0 0 4px', borderTop: '3px solid var(--accent)' }}>
          <div style={{ padding: '14px 20px 10px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--accent)', borderBottom: '1px solid var(--border-soft)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 16 }}>✓</span> Strengths
          </div>
          {[
            { title: 'MTC creation and updates become trivial', body: 'Adding or modifying a certificate type no longer requires scattering changes across multiple React components. It becomes a data operation — update the form schema JSON and the LiquidJS template on the backend, and the editor picks it up at runtime automatically.' },
            { title: 'Frontend becomes genuinely lightweight', body: 'Once backed by an API, the frontend fetches both the form schema and the HTML template from the server at runtime. The frontend ships zero customer-specific form code or template markup — it is a pure rendering shell. New customers and document types happen on the backend without a frontend deployment.' },
            { title: 'Devs can build forms without touching UI code', body: "FormEngine's JSON schema is composable. A developer can author a complete, multi-section MUI form entirely in JSON — no JSX, no component files, no stylesheet. The editor renders it correctly with no further changes." },
            { title: 'Templates live where they belong — the backend', body: 'Storing LiquidJS templates server-side means a single source of truth for every certificate layout. Version control, access control, and change history all happen on the backend. The frontend just renders whatever the API returns.' },
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
            <span style={{ fontSize: 16 }}>!</span> Limitations
          </div>
          {[
            { title: 'Still not self-serve for non-developers', body: 'A non-technical user — even with AI assistance — cannot independently build a complete MTC from scratch. Authoring a valid FormEngine schema and a correctly structured LiquidJS template still requires developer knowledge. This system reduces developer involvement per customer but does not eliminate it.' },
            { title: 'Template authoring moves to the backend, not away from devs', body: 'Templates are no longer hardcoded in the frontend, but they still need to be written, tested, and deployed to the backend by someone with technical skills. Non-devs cannot create or modify templates on their own — the problem shifts rather than disappears.' },
            { title: 'Complex templates still need custom injector code', body: 'Simple, structurally similar certificates can use a generic common injector. But certificates with unusual data structures, computed fields, or non-standard repeating sections still require a developer to write a customer-specific injector or bridge function. The more bespoke the certificate, the more code is still needed.' },
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
