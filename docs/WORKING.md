# Document Builder — How It Works

POC v0.1 · MTC Research

---

## What happens when the app loads

1. `main.tsx` renders `App.tsx`
2. `App.tsx` sets up routing — all pages are under `BrowserRouter`
3. The top nav hides itself on the editor and view pages
4. First page is `CustomerListPage` — shows all available customers

---

## What happens when you open the editor

File: `src/pages/DocumentEditorPage.tsx`

1. Reads `customerId` from the URL params
2. Calls `seedIfNeeded()` — on first visit, writes sample customer data to localStorage
3. Loads the customer record with `getCustomer(id)`
4. If editing an existing document: loads saved `formData` from `getDocument(docId)`
5. Sets two separate state slices:
   - `initialFormData` — passed to `FormViewer` once, never changes again
   - `formData` — tracks live changes, updated on every field change
6. Runs an initial `bridgeRender()` to show the document in the preview immediately

---

## What happens when you type in the form

1. FormEngine calls `onFormDataChange` with the latest form state
2. `handleDataChange` runs a `JSON.stringify` comparison against `lastDataRef`
   - If the data hasn't changed: does nothing (prevents infinite re-render loop)
   - If it changed: calls `setFormData()` with the new data
3. `useEffect([formData])` fires because `formData` reference changed
4. Starts a 300ms `setTimeout` debounce
   - If you type again within 300ms, the previous timer is cancelled and a new one starts
   - Only the last change in a burst triggers rendering
5. After 300ms: `bridgeRender(customerId, formData)` is called

---

## What bridgeRender does

File: `src/services/bridge/index.ts`

1. Loads the customer record (to get the LiquidJS template)
2. Calls `extractFormData()` — cleans the raw form state:
   - Removes null, undefined, empty strings
   - Converts scalars to strings
   - Passes arrays through unchanged
3. Looks up the customer's injector in the `INJECTORS` map
4. Calls the injector with the cleaned data:
   - Maps form field keys to the variable names the template uses
   - Assembles numbered row fields into arrays (e.g. `s1_uts…s5_uts` → `testSamples[]`)
5. Calls `renderTemplate(template, data)` — LiquidJS renders the HTML
6. Returns the rendered HTML string

---

## What happens in the preview

File: `src/components/TemplatePreview.tsx`

- The rendered HTML string is passed as a prop
- An iframe is used so the certificate's CSS is isolated from the app's CSS
- First render: `contentDocument.write(fullHtml)` — writes the full document including `<head>` and styles
- Every render after: `doc.body.innerHTML = extractBody(renderedHtml)` — only swaps the body content
- This means styles are loaded once and the preview updates in-place with no white flash

---

## What happens when you save

1. `handleSave()` runs `bridgeRender()` one more time to get a fresh snapshot
2. If creating: `createDocument()` saves `{ customerId, formData, renderedHtml, title }` to localStorage, then navigates to the edit URL
3. If editing: `updateDocument()` updates the record in localStorage
4. Save status shows "✓ Saved" for 2.5 seconds

---

## What happens on the View page

File: `src/pages/DocumentViewPage.tsx`

1. Loads the saved `formData` from localStorage
2. Runs it through the same `bridgeRender()` pipeline
3. Renders the output in a full-screen iframe
4. Print button calls `iframe.contentWindow.print()` — the template's `@media print` CSS handles layout

---

## How the form schema works

- Each customer has a `formSchema` — a JSON string that `FormEngine` reads
- The schema defines fields, layout (rows, stacks), labels, placeholders, types
- FormEngine renders MUI components from this JSON — no JSX needed
- Custom components (like `ApproverList`) are registered with `muiView.define()` before first render

Example field in the schema:
```json
{
  "key": "customerName",
  "type": "MuiTextField",
  "props": {
    "label": { "value": "Customer Name" },
    "fullWidth": { "value": true },
    "size": { "value": "small" }
  }
}
```

---

## How the ApproverList widget works

File: `src/components/ApproverListWidget.tsx`

- A custom React component that renders a dynamic list of `{ name, role }` rows
- Registered into FormEngine via `define()` + `muiView.define()`
- Reads its value from the `value` prop
- Writes changes back via `field.setValue()` from `useComponentData()`
- The array flows through `onFormDataChange` like any other field
- In the injector, `data['approvers']` is read directly as a pre-built array

---

## Key files at a glance

| File | What it does |
|---|---|
| `src/types/index.ts` | Type definitions: `Customer`, `DocumentRecord`, `CustomerFeatures` |
| `src/services/storage.ts` | All localStorage reads/writes — swap this for API calls in production |
| `src/services/liquid.ts` | LiquidJS singleton + `renderTemplate()` |
| `src/data/customers.ts` | Hardcoded sample customer schemas and templates |
| `src/services/bridge/index.ts` | `bridgeRender()` + `INJECTORS` registry |
| `src/services/bridge/extractor.ts` | Cleans raw FormEngine state |
| `src/services/bridge/injectors/vishwakarmaInjector.ts` | Field mapping for Vishwakarma MTC |
| `src/services/bridge/injectors/abcCastingsInjector.ts` | Field mapping for ABC Castings PIR |
| `src/components/FormPanel.tsx` | FormViewer wrapper |
| `src/components/TemplatePreview.tsx` | Iframe preview with body-patch strategy |
| `src/components/ApproverListWidget.tsx` | Dynamic approver rows widget |
| `src/pages/DocumentEditorPage.tsx` | Main editor — state, debounce, dedup, save |
| `src/pages/DocumentListPage.tsx` | List of saved documents for a customer |
| `src/pages/DocumentViewPage.tsx` | Full-screen view + print |
| `src/pages/CustomerListPage.tsx` | Customer selection screen |
