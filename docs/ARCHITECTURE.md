# Document Builder — Architecture

POC v0.1 · MTC Research

---

## What this is

A tool to generate industrial quality documents (like Material Test Certificates) for different customers — without writing new React code for each customer.

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
