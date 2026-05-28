# Document Builder — Architecture

POC v0.1 · MTC Research

---

## What this is

A POC that shows how new MTC requests can be implemented with ease and minimal frontend code.

Each customer has two things:
1. A **form schema** (JSON) — built using FormEngine, defines what fields appear in the form
2. An **HTML template** (LiquidJS) — stored in the database, defines how the final document looks

Both are fetched from the API into the frontend at runtime.

Fill the form → the document renders live on the right side.

---

## Tech Stack

| What | Tech |
|---|---|
| UI + components | React 18, TypeScript, MUI v7 |
| Form rendering | `@react-form-builder/core` v9 |
| Document templating | LiquidJS v10 |
| Routing | react-router-dom v6 |
| Storage (POC) | localStorage |
| Build | Vite |

---

## Layers

### 1. Storage — `src/services/storage.ts`
- All reads/writes go through this one file
- POC uses localStorage. To switch to a real API, only this file changes
- Functions: `getCustomer`, `getDocument`, `createDocument`, `updateDocument`, `deleteDocument`

### 2. Form Engine — `src/components/FormPanel.tsx`
- Takes the customer's JSON schema and renders a full MUI form from it
- No React code needed per customer — just update the schema JSON
- Custom widgets (like `ApproverList`) are registered once via `muiView.define()`
- `getForm()` is wrapped in `useCallback` so the form doesn't reset on every keystroke

### 3. Bridge — `src/services/bridge/`
Three steps, in order:

**Step 1 — Extract** (`extractor.ts`)
- Takes raw FormEngine state
- Removes nulls, undefineds, empty strings
- Converts scalar values to strings
- Passes arrays through as-is (so array widgets like ApproverList don't get corrupted)

**Step 2 — Inject** (`injectors/`)
- Each customer has one injector file
- Maps flat form field names → variable names the template expects
- Assembles numbered fields (`s1_uts`, `s2_uts`…) into arrays (`testSamples[]`)
- New customer = one injector file + one line in the `INJECTORS` registry

**Step 3 — Render** (`src/services/liquid.ts`)
- Passes the injected data into the LiquidJS template
- Returns rendered HTML

### 4. Preview — `src/components/TemplatePreview.tsx`
- Renders the HTML inside an iframe
- First load: uses `document.write()` to set the full page including `<head>` and CSS
- Every update after that: only patches `body.innerHTML`
- This prevents the white flash you'd see if you rewrote the full document every keystroke

---

## Data Flow

Every time the user types something:

```
User types
  → FormEngine fires onFormDataChange
  → Dedup check (JSON.stringify compare) — drops if nothing changed
  → setFormData() updates React state
  → useEffect fires, starts 300ms debounce timer
  → (if another key is pressed, timer resets)
  → extractFormData() — cleans the data
  → customerInjector() — maps fields to template variables
  → renderTemplate() — LiquidJS renders HTML
  → iframe body.innerHTML updated — preview refreshes
```

---


## Pros

1. **MTC creation and updates become trivial** — Adding or modifying a certificate type no longer requires changing multiple React components. It becomes a data operation — update the form schema and the template on the backend, and the editor picks it up at runtime.

2. **Frontend becomes genuinely lightweight** — The frontend fetches both the form schema and the HTML template from the server at runtime. It ships zero customer-specific form code or template markup — it is a pure rendering shell. New customers and document types happen on the backend without a frontend deployment.

3. **Devs can build forms without touching UI code** — FormEngine's JSON schema is composable. A developer can author a complete, multi-section MUI form entirely in JSON — no JSX, no component files, no stylesheet.

4. **Templates live where they belong — the backend** — Storing LiquidJS templates server-side means a single source of truth for every certificate layout. Version control, access control, and change history all happen on the backend.

---

## Cons

1. **Still not self-serve for non-developers** — A non-technical user cannot independently build a complete MTC from scratch. Authoring a valid FormEngine schema and a correctly structured LiquidJS template still requires developer knowledge. This system reduces developer involvement per customer but does not eliminate it.

2. **Template authoring moves to the backend, not away from devs** — Templates are no longer hardcoded in the frontend, but they still need to be written, tested, and deployed by someone with technical skills. The problem shifts rather than disappears.

3. **Complex templates still need custom injector code** — Simple, structurally similar certificates can use a generic common injector. But certificates with unusual data structures, computed fields, or non-standard repeating sections still require a developer to write a customer-specific injector. The more bespoke the certificate, the more code is still needed.
