# Metal Cloud — Document Builder: Architecture

> POC v0.1 · MTC Research

A schema-driven, per-customer industrial document generation system. A form schema and an HTML template are all that's needed per customer — filling the form renders the certificate live in a split-pane editor with no additional frontend code.

**Stack:** React 18 + TypeScript · FormEngine v9 · LiquidJS v10 · MUI v7 · Vite

---

## Overview

Industrial companies generate the same class of documents repeatedly — Material Test Certificates, Product Inspection Reports, quality certificates — for different customers with different formats. This POC demonstrates a configurable pipeline where each customer's document type is defined purely in data (a JSON form schema + an HTML template), with no React code written per customer.

### Core capabilities

- **Schema-driven forms** — FormEngine renders a full MUI form from a JSON schema. Field types, labels, layout, and grouping are all defined in the customer config — no React code per customer.
- **Live template preview** — Every keystroke flows through the bridge pipeline and re-renders the LiquidJS template with a 300 ms debounce. The right panel mirrors the exact printed output.
- **Pluggable per-customer logic** — Each customer gets one injector file that maps flat form fields to structured template variables. Adding a customer = one injector + one registry entry.

---

## System Layers

The app is built in five clearly separated layers. Each layer has one responsibility and can be replaced independently.

| Layer | Technologies | Description |
|---|---|---|
| **Persistence** | `LocalStorage → REST API`, `storage.ts` | POC uses LocalStorage for zero-infra simplicity. `storage.ts` is the single persistence boundary — swapping it for REST API calls requires changes only in this one file. |
| **Form Engine** | `FormViewer`, `muiView`, `define()` | Renders a schema-driven MUI form. `getForm()` is memoised to prevent re-initialisation on every render. Custom components (e.g. `ApproverList`) are pre-registered via `muiView.define()`. |
| **Bridge** | `extractFormData()`, `INJECTORS`, `customerInjector()` | Three-stage pipeline: (1) extractor normalises raw state, (2) INJECTORS registry routes by customer ID, (3) injector maps fields to structured template variables and assembles repeating arrays. |
| **Template Engine** | `LiquidJS v10`, `renderTemplate()` | Singleton LiquidJS engine with `strictFilters:false` and `strictVariables:false`. Missing variables default to empty without throwing. Supports `{{ var \| default }}`, `{% for %}` loops, and `{% if %}` conditionals. |
| **Preview Iframe** | `TemplatePreview`, `body.innerHTML patch` | Full CSS isolation. First render uses `contentDocument.write()` to initialise the `<head>`. All subsequent updates patch only `body.innerHTML` — no white flash on every keystroke. |

---

## High-Level Data Flow

Every field change triggers the same pipeline. One-directional — form state flows forward, rendered HTML flows back to the preview.

```
[1] FormEngine          →  onFormDataChange fires on every field change
[2] lastDataRef dedup   →  JSON.stringify comparison blocks identical payloads
[3] setFormData()       →  React state update triggers useEffect
[4] 300 ms debounce     →  collapses rapid keystrokes into a single render call
                                        ↓
[8] iframe body patch   ←  body.innerHTML — no flash, no full reload
[7] LiquidJS render     ←  template + variables → rendered HTML string
[6] customerInjector()  ←  maps fields → structured template variables
[5] extractFormData()   ←  strips empties, coerces scalars, passes arrays
```

Steps 1–4 left-to-right, then 5–8 right-to-left.

---

## Adding a New Customer

Three artefacts are all that is needed. The editor, preview, and save/load work automatically for every new customer.

### 01 — Form schema JSON
A FormEngine schema object defining all form fields — text inputs, date pickers, dropdowns, repeating slot rows. Stored on the Customer record and fetched at runtime.
```json
{ "key": "Screen", "type": "Screen", "children": [...] }
```

### 02 — LiquidJS HTML template
A complete HTML document with inline CSS and LiquidJS tags for all dynamic values. Supports `{{ var }}`, `{% for %}` loops, and `{% if %}` conditionals.
```liquid
{{ inspector | default: "—" }}
```

### 03 — Customer injector + registry
One TypeScript file that maps extracted form fields to template variable names. Registered in `INJECTORS` with the customer ID as key.
```ts
INJECTORS['cust-003-...'] = myInjector
```

---

## Design Decisions

### Ref-based deduplication via JSON.stringify
**Problem:** FormEngine fires `onFormDataChange` during its own render/mount cycle, not just on user input.  
**Why:** Comparing serialised form state on every callback means identical payloads are silently dropped before reaching `setState`. Breaks the re-render loop without timeouts or suppressions.

### Separate `initialFormData` (set once) from `formData` (live)
**Problem:** Passing live form state as `initialData` to `FormViewer` caused the form to reset on every keystroke.  
**Why:** FormEngine treats `initialData` as a reactive prop — any change re-initialises the form. Splitting into two slices gives `FormViewer` a stable seed while the editor tracks live changes separately.

### Full `document.write()` once, then `body.innerHTML` patches only
**Problem:** iframe content flickered white on every keystroke because the entire document was rewritten.  
**Why:** The `<head>` contains the certificate's CSS. Rewriting the full document clears and re-parses styles, causing a visible flash. After the first write, only the body needs updating.

### Register custom components via `define()` + `muiView.define()`
**Problem:** Adding dynamic UI (approver list) without breaking the all-data-through-FormEngine contract.  
**Why:** FormEngine's `define()` API wraps any React component into the schema system. The component reads its value prop and writes back via `field.setValue()`. The array flows through the same `onFormDataChange` callback as every other field.

### Fixed-slot numbered fields assembled into arrays by the injector
**Problem:** Repeating table rows can't be dynamic without custom UI or a native FormEngine repeater.  
**Why:** Defining `item1_description…item8_description` as static FormEngine fields is the zero-custom-component solution. The injector maps them into an array and filters empty rows. Tradeoff: fixed maximum row count.

### Singleton engine with `strictVariables:false` and `lenientIf:true`
**Problem:** LiquidJS throws errors for undefined variables in strict mode, breaking the preview on partial input.  
**Why:** A certificate template with 40+ variables would error on every keystroke during early form filling. Lenient mode means the preview always renders — unfilled fields show blank or the `| default` value.

---

## Pros & Cons

### Strengths

1. **MTC creation and updates become trivial** — Adding or modifying a certificate type no longer requires scattering changes across multiple React components. It becomes a data operation — update the form schema JSON and the LiquidJS template on the backend, and the editor picks it up at runtime automatically.

2. **Frontend becomes genuinely lightweight** — Once backed by an API, the frontend fetches both the form schema and the HTML template from the server at runtime. The frontend ships zero customer-specific form code or template markup — it is a pure rendering shell. New customers and document types happen on the backend without a frontend deployment.

3. **Devs can build forms without touching UI code** — FormEngine's JSON schema is composable. A developer can author a complete, multi-section MUI form entirely in JSON — no JSX, no component files, no stylesheet. The editor renders it correctly with no further changes.

4. **Templates live where they belong — the backend** — Storing LiquidJS templates server-side means a single source of truth for every certificate layout. Version control, access control, and change history all happen on the backend. The frontend just renders whatever the API returns.

### Limitations

1. **Still not self-serve for non-developers** — A non-technical user — even with AI assistance — cannot independently build a complete MTC from scratch. Authoring a valid FormEngine schema and a correctly structured LiquidJS template still requires developer knowledge. This system reduces developer involvement per customer but does not eliminate it.

2. **Template authoring moves to the backend, not away from devs** — Templates are no longer hardcoded in the frontend, but they still need to be written, tested, and deployed to the backend by someone with technical skills. Non-devs cannot create or modify templates on their own — the problem shifts rather than disappears.

3. **Complex templates still need custom injector code** — Simple, structurally similar certificates can use a generic common injector. But certificates with unusual data structures, computed fields, or non-standard repeating sections still require a developer to write a customer-specific injector or bridge function. The more bespoke the certificate, the more code is still needed.
