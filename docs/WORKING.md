# Metal Cloud — Document Builder: Detailed Working

> POC v0.1 · MTC Research

A 12-step walkthrough of the full data pipeline, the complete tech stack, key files, and a POC-vs-production replacement guide.

---

## Tech Stack

| Layer | Technology | Role |
|---|---|---|
| UI Framework | React 18 + TypeScript | Component rendering and state management |
| Form Engine | `@react-form-builder/core` v9 | Schema-driven form rendering |
| Form Components | `@react-form-builder/components-material-ui` v9 | MUI component set for FormEngine |
| UI Components | MUI v7 (`@mui/material`) | Layout, buttons, inputs outside the form |
| Template Engine | LiquidJS v10 | HTML template rendering with injected variables |
| Routing | react-router-dom v6 | Page navigation |
| Build | Vite + TypeScript | Dev server and production bundler |
| Persistence (POC) | `localStorage` | Zero-infra storage — replaced by REST API in production |

---

## 12-Step Pipeline Walkthrough

### Step 1 — App bootstraps & seeds data
`services/storage.ts → seedIfNeeded()`

On first visit, `seedIfNeeded()` checks for the `mtc_seeded_vN` flag. If absent, it writes `SAMPLE_CUSTOMERS` with their `formSchema` JSON strings and LiquidJS templates.

Bumping the version suffix forces a re-seed after schema changes — document records are preserved in a separate key.

---

### Step 2 — Customer config loaded in editor
`pages/DocumentEditorPage.tsx`

`getCustomer(id)` retrieves the `Customer` record. In edit mode, `getDocument(docId)` retrieves saved `formData` and seeds the form.

Two state slices: `initialFormData` (set once, stable `FormViewer` seed) and `formData` (live, updated on every `onChange`). FormEngine treats `initialData` as reactive — passing live state would reset the form on every keystroke.

---

### Step 3 — FormEngine renders the form
`components/FormPanel.tsx`

`FormPanel` passes `customer.formSchema` to `FormViewer` via a stable `getForm()` callback. Custom components like `ApproverList` are registered into `muiView` before first render.

```ts
define(Component, 'ApproverList')
  .props({ value: array.valued })
  .build()
  .model
```

The component reads its `value` prop and writes back via `field.setValue()` from `useComponentData()`.

---

### Step 4 — User types → `onFormDataChange` fires
`DocumentEditorPage.tsx → handleDataChange`

FormEngine fires `onFormDataChange` on every field change and also during its own mount cycle. Without dedup this causes an infinite re-render loop.

`lastDataRef` holds `JSON.stringify` of the last-seen payload. Matching strings are dropped before reaching `setState` — no re-render, loop broken.

---

### Step 5 — `useEffect` detects change and debounces
`DocumentEditorPage.tsx → reactive render effect`

`useEffect([formData, id])` fires when `formData` reference changes. A 300 ms `setTimeout` debounce collapses rapid keystrokes.

If another change arrives within 300 ms, the cleanup calls `clearTimeout` and a new timer starts. Only the last change in a burst triggers `bridgeRender`.

---

### Step 6 — `extractFormData` normalises the state
`services/bridge/extractor.ts`

Strips `null`, `undefined`, and empty-string values. Coerces scalars to `String(v)`. Passes arrays through as-is.

Arrays from custom components like `ApproverList` must not be stringified — `String([{name:'A'}])` = `'[object Object]'` would corrupt the data before it reaches the injector.

---

### Step 7 — `INJECTORS` registry routes to customer injector
`services/bridge/index.ts → INJECTORS`

`bridgeRender()` looks up the customer ID in the `INJECTORS` map. No injector registered = extracted data passed directly to LiquidJS as a safe fallback.

Adding a customer: one injector file + one entry in `INJECTORS`. Nothing else changes.

---

### Step 8 — Customer injector builds template variables
`services/bridge/injectors/[customer]Injector.ts`

Maps extracted form field keys to the variable names used in the LiquidJS template. Assembles repeating arrays from numbered slots or reads pre-built arrays.

- **Fixed-slot pattern:** `item1_desc…item8_desc` mapped to `inspectionItems[]`
- **Pre-built array:** `data['approvers']` read directly from the `ApproverList` widget

---

### Step 9 — LiquidJS renders the template
`services/liquid.ts → renderTemplate()`

Singleton engine with `strictVariables:false` renders the HTML template with the injected data. Missing variables default to empty — the preview always renders on partial input.

Templates use standard Liquid:
```liquid
{{ inspector | default: '—' }}
{% for a in approvers %}...{% endfor %}
{{ forloop.index }}   {# 1-based row numbers #}
```

---

### Step 10 — Iframe preview updates without flash
`components/TemplatePreview.tsx`

- **First render:** `contentDocument.write(fullHtml)` initialises `<head>` and styles.
- **All subsequent renders:** `doc.body.innerHTML = extracted body content only`.

Since styles are in `<head>` from the first write, re-renders are in-place with no blank flash — critical for a smooth live-editing experience.

---

### Step 11 — User saves the document
`pages/DocumentEditorPage.tsx → handleSave`

`saveDocument()` persists `{ customerId, formData, savedAt }` to LocalStorage under the document ID. In production this becomes a `PUT /documents/:id` API call — only `storage.ts` changes.

---

### Step 12 — Document view / print
`pages/DocumentViewPage.tsx`

Loads the saved `formData`, runs it through the same bridge pipeline, and renders the output in a full-screen iframe. The print button triggers `iframe.contentWindow.print()` — the certificate CSS handles `@media print` layout.

---

## Key Files

### Core

| File | Role |
|---|---|
| `src/types/index.ts` | `Customer`, `DocumentRecord`, `CustomerFeatures` types |
| `src/services/storage.ts` | LocalStorage CRUD + seed logic (POC only) |
| `src/services/liquid.ts` | LiquidJS singleton + `renderTemplate()` |
| `src/data/customers.ts` | `SAMPLE_CUSTOMERS` — `formSchema` + template per customer |

### Bridge

| File | Role |
|---|---|
| `src/services/bridge/index.ts` | `bridgeRender()` + `INJECTORS` registry |
| `src/services/bridge/extractor.ts` | Normalises raw FormEngine state |
| `.../vishwakarmaInjector.ts` | MTC field mapping + `testSamples[]` assembly |
| `.../abcCastingsInjector.ts` | PIR field mapping + `inspectionItems[]` + `approvers[]` |

### Components

| File | Role |
|---|---|
| `src/components/FormPanel.tsx` | `FormViewer` wrapper — stable `getForm`, custom component registration |
| `src/components/TemplatePreview.tsx` | Iframe with first-write / body-patch strategy |
| `src/components/ApproverListWidget.tsx` | Custom FormEngine component registered via `define()` |

### Pages

| File | Role |
|---|---|
| `src/pages/DocumentEditorPage.tsx` | Split-pane editor — state, debounce, dedup, resize, save |
| `src/pages/DocumentListPage.tsx` | Per-customer document list |
| `src/pages/DocumentViewPage.tsx` | Full-screen rendered certificate view |
| `src/pages/CustomerListPage.tsx` | Customer selection grid |

---

## POC → Production Replacement Guide

| POC piece | Production replacement | Scope of change |
|---|---|---|
| `localStorage` in `storage.ts` | REST API calls (`fetch`/`axios`) | `storage.ts` only |
| `SAMPLE_CUSTOMERS` in `data/customers.ts` | `GET /customers` API endpoint | `data/customers.ts` + `storage.ts` |
| Form schema stored in customer object | `GET /customers/:id/schema` | `storage.ts` + seed logic removed |
| LiquidJS template stored in customer object | `GET /customers/:id/template` | `storage.ts` + seed logic removed |
| LiquidJS rendered client-side | Server-side render endpoint | `services/liquid.ts` → API call |
| No auth | JWT / session auth | New auth layer, route guards |
| No versioning | Document version history | `DocumentRecord` schema extension |
