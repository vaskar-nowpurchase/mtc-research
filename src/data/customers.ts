import { Customer } from '../types'

// ─── Customer 1: Vishwakarma Founders — Material Test Certificate ─────────────

const vishwakarmaFormSchema = JSON.stringify({
  errorType: 'MuiErrorWrapper',
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      // ── Section: Basic Info ──────────────────────────────────────────────
      {
        key: 'sec_basic',
        type: 'MuiTypography',
        props: {
          children: { value: 'Basic Information' },
          variant: { value: 'h6' },
          sx: { value: { color: '#2A5C45', mb: 1, mt: 0, fontWeight: 700, fontSize: '14px', letterSpacing: '0.5px', textTransform: 'uppercase' } },
        },
      },
      {
        key: 'row_basic1',
        type: 'MuiStack',
        props: {
          direction: { value: 'row' },
          spacing: { value: 2 },
          sx: { value: { width: '100%', mb: 1 } },
        },
        children: [
          {
            key: 'customerName',
            type: 'MuiTextField',
            props: {
              label: { value: 'Customer Name' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: 'e.g. Vishwakarma Founders' },
            },
          },
          {
            key: 'partName',
            type: 'MuiTextField',
            props: {
              label: { value: 'Part Name' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: 'e.g. Knuckle Arm LH' },
            },
          },
        ],
      },
      {
        key: 'row_basic2',
        type: 'MuiStack',
        props: {
          direction: { value: 'row' },
          spacing: { value: 2 },
          sx: { value: { width: '100%', mb: 1 } },
        },
        children: [
          {
            key: 'partNumber',
            type: 'MuiTextField',
            props: {
              label: { value: 'Part Number' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: 'e.g. KA-LH-001' },
            },
          },
          {
            key: 'materialSpec',
            type: 'MuiTextField',
            props: {
              label: { value: 'Material Specification' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: 'e.g. IS:1865 SG 500/7' },
            },
          },
        ],
      },
      {
        key: 'row_basic3',
        type: 'MuiStack',
        props: {
          direction: { value: 'row' },
          spacing: { value: 2 },
          sx: { value: { width: '100%', mb: 1 } },
        },
        children: [
          {
            key: 'reportNo',
            type: 'MuiTextField',
            props: {
              label: { value: 'Report No.' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: 'e.g. VF/MTC/2024/001' },
            },
          },
          {
            key: 'heatNumber',
            type: 'MuiTextField',
            props: {
              label: { value: 'Heat Number' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: 'e.g. HT-2024-0421' },
            },
          },
        ],
      },
      {
        key: 'row_basic4',
        type: 'MuiStack',
        props: {
          direction: { value: 'row' },
          spacing: { value: 2 },
          sx: { value: { width: '100%', mb: 2 } },
        },
        children: [
          {
            key: 'invoiceNumber',
            type: 'MuiTextField',
            props: {
              label: { value: 'Invoice Number' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: 'e.g. INV-2024-0421' },
            },
          },
          {
            key: 'issueDate',
            type: 'MuiTextField',
            props: {
              label: { value: 'Issue Date' },
              fullWidth: { value: true },
              size: { value: 'small' },
              type: { value: 'date' },
            },
          },
        ],
      },

      // ── Section: Chemical Properties ────────────────────────────────────
      {
        key: 'sec_chem',
        type: 'MuiTypography',
        props: {
          children: { value: 'Chemical Properties' },
          variant: { value: 'h6' },
          sx: { value: { color: '#2A5C45', mb: 1, fontWeight: 700, fontSize: '14px', letterSpacing: '0.5px', textTransform: 'uppercase' } },
        },
      },
      // Carbon
      {
        key: 'row_chem_c',
        type: 'MuiStack',
        props: {
          direction: { value: 'row' },
          spacing: { value: 2 },
          sx: { value: { width: '100%', mb: 1 } },
        },
        children: [
          {
            key: 'chemC_spec',
            type: 'MuiTextField',
            props: {
              label: { value: 'C — Specified' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '3.50–3.90' },
            },
          },
          {
            key: 'chemC_avg',
            type: 'MuiTextField',
            props: {
              label: { value: 'C — Average' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '3.72' },
            },
          },
        ],
      },
      // Silicon
      {
        key: 'row_chem_si',
        type: 'MuiStack',
        props: {
          direction: { value: 'row' },
          spacing: { value: 2 },
          sx: { value: { width: '100%', mb: 1 } },
        },
        children: [
          {
            key: 'chemSi_spec',
            type: 'MuiTextField',
            props: {
              label: { value: 'Si — Specified' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '2.40–2.80' },
            },
          },
          {
            key: 'chemSi_avg',
            type: 'MuiTextField',
            props: {
              label: { value: 'Si — Average' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '2.55' },
            },
          },
        ],
      },
      // Manganese
      {
        key: 'row_chem_mn',
        type: 'MuiStack',
        props: {
          direction: { value: 'row' },
          spacing: { value: 2 },
          sx: { value: { width: '100%', mb: 1 } },
        },
        children: [
          {
            key: 'chemMn_spec',
            type: 'MuiTextField',
            props: {
              label: { value: 'Mn — Specified' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '≤ 0.40' },
            },
          },
          {
            key: 'chemMn_avg',
            type: 'MuiTextField',
            props: {
              label: { value: 'Mn — Average' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '0.28' },
            },
          },
        ],
      },
      // Phosphorus
      {
        key: 'row_chem_p',
        type: 'MuiStack',
        props: {
          direction: { value: 'row' },
          spacing: { value: 2 },
          sx: { value: { width: '100%', mb: 1 } },
        },
        children: [
          {
            key: 'chemP_spec',
            type: 'MuiTextField',
            props: {
              label: { value: 'P — Specified' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '≤ 0.05' },
            },
          },
          {
            key: 'chemP_avg',
            type: 'MuiTextField',
            props: {
              label: { value: 'P — Average' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '0.032' },
            },
          },
        ],
      },
      // Sulphur
      {
        key: 'row_chem_s',
        type: 'MuiStack',
        props: {
          direction: { value: 'row' },
          spacing: { value: 2 },
          sx: { value: { width: '100%', mb: 1 } },
        },
        children: [
          {
            key: 'chemS_spec',
            type: 'MuiTextField',
            props: {
              label: { value: 'S — Specified' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '≤ 0.02' },
            },
          },
          {
            key: 'chemS_avg',
            type: 'MuiTextField',
            props: {
              label: { value: 'S — Average' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '0.012' },
            },
          },
        ],
      },
      // Magnesium
      {
        key: 'row_chem_mg',
        type: 'MuiStack',
        props: {
          direction: { value: 'row' },
          spacing: { value: 2 },
          sx: { value: { width: '100%', mb: 1 } },
        },
        children: [
          {
            key: 'chemMg_spec',
            type: 'MuiTextField',
            props: {
              label: { value: 'Mg — Specified' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '0.04–0.06' },
            },
          },
          {
            key: 'chemMg_avg',
            type: 'MuiTextField',
            props: {
              label: { value: 'Mg — Average' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '0.048' },
            },
          },
        ],
      },
      // Cerium
      {
        key: 'row_chem_ce',
        type: 'MuiStack',
        props: {
          direction: { value: 'row' },
          spacing: { value: 2 },
          sx: { value: { width: '100%', mb: 2 } },
        },
        children: [
          {
            key: 'chemCe_spec',
            type: 'MuiTextField',
            props: {
              label: { value: 'Ce — Specified' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '—' },
            },
          },
          {
            key: 'chemCe_avg',
            type: 'MuiTextField',
            props: {
              label: { value: 'Ce — Average' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '0.003' },
            },
          },
        ],
      },

      // ── Section: Mechanical Properties ──────────────────────────────────
      {
        key: 'sec_mech',
        type: 'MuiTypography',
        props: {
          children: { value: 'Mechanical Properties' },
          variant: { value: 'h6' },
          sx: { value: { color: '#2A5C45', mb: 1, fontWeight: 700, fontSize: '14px', letterSpacing: '0.5px', textTransform: 'uppercase' } },
        },
      },
      {
        key: 'row_uts',
        type: 'MuiStack',
        props: {
          direction: { value: 'row' },
          spacing: { value: 2 },
          sx: { value: { width: '100%', mb: 1 } },
        },
        children: [
          {
            key: 'uts_spec',
            type: 'MuiTextField',
            props: {
              label: { value: 'UTS Specified (N/mm²)' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '≥ 500' },
            },
          },
          {
            key: 'uts_obs',
            type: 'MuiTextField',
            props: {
              label: { value: 'UTS Observed (N/mm²)' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '520' },
            },
          },
        ],
      },
      {
        key: 'row_yield',
        type: 'MuiStack',
        props: {
          direction: { value: 'row' },
          spacing: { value: 2 },
          sx: { value: { width: '100%', mb: 1 } },
        },
        children: [
          {
            key: 'yield_spec',
            type: 'MuiTextField',
            props: {
              label: { value: 'Yield Strength Specified (N/mm²)' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '≥ 320' },
            },
          },
          {
            key: 'yield_obs',
            type: 'MuiTextField',
            props: {
              label: { value: 'Yield Strength Observed (N/mm²)' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '345' },
            },
          },
        ],
      },
      {
        key: 'row_hard',
        type: 'MuiStack',
        props: {
          direction: { value: 'row' },
          spacing: { value: 2 },
          sx: { value: { width: '100%', mb: 1 } },
        },
        children: [
          {
            key: 'hardness_spec',
            type: 'MuiTextField',
            props: {
              label: { value: 'Hardness Specified (HB)' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '140–200' },
            },
          },
          {
            key: 'hardness_obs',
            type: 'MuiTextField',
            props: {
              label: { value: 'Hardness Observed (HB)' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '168' },
            },
          },
        ],
      },
      {
        key: 'row_elong',
        type: 'MuiStack',
        props: {
          direction: { value: 'row' },
          spacing: { value: 2 },
          sx: { value: { width: '100%', mb: 2 } },
        },
        children: [
          {
            key: 'elongation_spec',
            type: 'MuiTextField',
            props: {
              label: { value: 'Elongation Specified (%)' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '≥ 7' },
            },
          },
          {
            key: 'elongation_obs',
            type: 'MuiTextField',
            props: {
              label: { value: 'Elongation Observed (%)' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '8.5' },
            },
          },
        ],
      },

      // ── Section: Microstructure / Distribution ───────────────────────────
      {
        key: 'sec_micro',
        type: 'MuiTypography',
        props: {
          children: { value: 'Microstructure & Distribution' },
          variant: { value: 'h6' },
          sx: { value: { color: '#2A5C45', mb: 1, fontWeight: 700, fontSize: '14px', letterSpacing: '0.5px', textTransform: 'uppercase' } },
        },
      },
      {
        key: 'row_micro1',
        type: 'MuiStack',
        props: {
          direction: { value: 'row' },
          spacing: { value: 2 },
          sx: { value: { width: '100%', mb: 1 } },
        },
        children: [
          {
            key: 'nodularity',
            type: 'MuiTextField',
            props: {
              label: { value: 'Nodularity (%)' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '≥ 80' },
            },
          },
          {
            key: 'noduleCount',
            type: 'MuiTextField',
            props: {
              label: { value: 'Nodule Count (per mm²)' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '80–120' },
            },
          },
        ],
      },
      {
        key: 'row_micro2',
        type: 'MuiStack',
        props: {
          direction: { value: 'row' },
          spacing: { value: 2 },
          sx: { value: { width: '100%', mb: 2 } },
        },
        children: [
          {
            key: 'pearlite',
            type: 'MuiTextField',
            props: {
              label: { value: 'Pearlite (%)' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '≤ 20' },
            },
          },
          {
            key: 'ferrite',
            type: 'MuiTextField',
            props: {
              label: { value: 'Ferrite (%)' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '≥ 80' },
            },
          },
        ],
      },
      {
        key: 'others',
        type: 'MuiTextField',
        props: {
          label: { value: 'Others / Inclusions' },
          fullWidth: { value: true },
          size: { value: 'small' },
          placeholder: { value: 'Carbides: Nil' },
          sx: { value: { mb: 2 } },
        },
      },

      // ── Section: Test Sample Results (repeating rows) ───────────────────
      // Each row = one specimen. The vishwakarmaInjector assembles these
      // numbered fields into a testSamples[] array for the {% for %} loop.
      {
        key: 'sec_samples',
        type: 'MuiTypography',
        props: {
          children: { value: 'Test Sample Results' },
          variant: { value: 'h6' },
          sx: { value: { color: '#2A5C45', mb: 0.5, mt: 2, fontWeight: 700, fontSize: '14px', letterSpacing: '0.5px', textTransform: 'uppercase' } },
        },
      },
      {
        key: 'sec_samples_hint',
        type: 'MuiTypography',
        props: {
          children: { value: 'Fill each row for one specimen. Empty rows are skipped in the certificate.' },
          variant: { value: 'body2' },
          sx: { value: { color: '#6B9E87', mb: 1, fontSize: '11px' } },
        },
      },
      ...([1, 2, 3, 4, 5].map(i => ({
        key: `row_s${i}`,
        type: 'MuiStack',
        props: { direction: { value: 'row' }, spacing: { value: 1 }, sx: { value: { width: '100%', mb: 0.5, alignItems: 'flex-end' } } },
        children: [
          { key: `s${i}_sampleNo`,   type: 'MuiTextField', props: { label: { value: `S${i} No.` },   size: { value: 'small' }, placeholder: { value: `S-0${i}` }, sx: { value: { width: '75px', flexShrink: 0 } } } },
          { key: `s${i}_uts`,        type: 'MuiTextField', props: { label: { value: 'UTS' },         size: { value: 'small' }, placeholder: { value: '520' },    fullWidth: { value: true } } },
          { key: `s${i}_yield`,      type: 'MuiTextField', props: { label: { value: 'Yield' },       size: { value: 'small' }, placeholder: { value: '380' },    fullWidth: { value: true } } },
          { key: `s${i}_hardness`,   type: 'MuiTextField', props: { label: { value: 'Hardness' },    size: { value: 'small' }, placeholder: { value: '220' },    fullWidth: { value: true } } },
          { key: `s${i}_elongation`, type: 'MuiTextField', props: { label: { value: 'Elong. %' },    size: { value: 'small' }, placeholder: { value: '7' },      fullWidth: { value: true } } },
        ],
      }))),

      // ── Section: Remarks & Footer ────────────────────────────────────────
      {
        key: 'sec_remarks',
        type: 'MuiTypography',
        props: {
          children: { value: 'Remarks & Signatories' },
          variant: { value: 'h6' },
          sx: { value: { color: '#2A5C45', mb: 1, fontWeight: 700, fontSize: '14px', letterSpacing: '0.5px', textTransform: 'uppercase' } },
        },
      },
      {
        key: 'remarks',
        type: 'MuiTextField',
        props: {
          label: { value: 'Remarks' },
          fullWidth: { value: true },
          size: { value: 'small' },
          multiline: { value: true },
          rows: { value: 2 },
          placeholder: { value: 'All tests conducted as per IS:1865. Material meets specification requirements.' },
          sx: { value: { mb: 1 } },
        },
      },
      {
        key: 'row_footer',
        type: 'MuiStack',
        props: {
          direction: { value: 'row' },
          spacing: { value: 2 },
          sx: { value: { width: '100%', mb: 1 } },
        },
        children: [
          {
            key: 'createdBy',
            type: 'MuiTextField',
            props: {
              label: { value: 'Created By' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: 'Quality Engineer' },
            },
          },
          {
            key: 'approvedBy',
            type: 'MuiTextField',
            props: {
              label: { value: 'Approved By' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: 'QC Incharge' },
            },
          },
        ],
      },
    ],
  },
})

const vishwakarmaTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>Material Test Certificate</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'IBM Plex Sans', Arial, sans-serif;
    font-size: 11px;
    color: #1a1a18;
    background: #fff;
    padding: 0;
  }

  .page {
    width: 210mm;
    min-height: 297mm;
    margin: 0 auto;
    padding: 12mm 14mm;
    background: #fff;
    box-shadow: 0 0 20px rgba(0,0,0,0.08);
    position: relative;
  }

  /* Header */
  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    border-bottom: 2.5px solid #2A5C45;
    padding-bottom: 8px;
    margin-bottom: 6px;
  }

  .header-left { flex: 1; }

  .header-logo {
    font-size: 8px;
    font-weight: 600;
    color: #6B9E87;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 2px;
  }

  .header-company {
    font-size: 18px;
    font-weight: 700;
    color: #1a1a18;
    letter-spacing: -0.4px;
    line-height: 1;
  }

  .header-address {
    font-size: 8px;
    color: #6B6B65;
    margin-top: 3px;
    line-height: 1.5;
  }

  .header-right {
    text-align: right;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
  }

  .header-badge {
    background: #2A5C45;
    color: #fff;
    font-size: 7px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    padding: 2px 8px;
    border-radius: 2px;
  }

  .header-badge-secondary {
    background: #EAF3EE;
    color: #2A5C45;
    font-size: 7px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 2px 8px;
    border-radius: 2px;
    border: 1px solid #6B9E87;
  }

  .cert-title {
    text-align: center;
    font-size: 13px;
    font-weight: 700;
    color: #2A5C45;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 6px 0 4px;
    border-bottom: 1px solid #E2E0D8;
    margin-bottom: 6px;
  }

  /* Info tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 6px;
  }

  th, td {
    border: 1px solid #C8C6BE;
    padding: 4px 7px;
    text-align: left;
    vertical-align: middle;
    font-size: 10px;
    line-height: 1.35;
  }

  th {
    background: #F0F0EB;
    font-weight: 600;
    color: #3a3a38;
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .th-accent {
    background: #2A5C45;
    color: #fff;
    font-weight: 700;
    font-size: 9px;
    letter-spacing: 0.8px;
    text-transform: uppercase;
  }

  .val {
    font-weight: 500;
    color: #1a1a18;
  }

  .val-empty {
    color: #AEADA6;
    font-style: italic;
  }

  /* Section headers */
  .section-header {
    background: #EAF3EE;
    border-left: 3px solid #2A5C45;
    padding: 3px 8px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #2A5C45;
    margin: 6px 0 3px;
  }

  /* Microstructure images */
  .micro-images {
    display: flex;
    gap: 8px;
    margin-bottom: 5px;
  }

  .micro-image-box {
    flex: 1;
    height: 80px;
    border: 1px dashed #C8C6BE;
    background: #F9F9F7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #AEADA6;
    font-size: 8px;
    text-align: center;
    gap: 4px;
    border-radius: 2px;
  }

  .micro-image-icon {
    font-size: 20px;
    opacity: 0.35;
  }

  .micro-image-label {
    font-weight: 600;
    font-size: 7.5px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: #6B9E87;
  }

  /* Remarks */
  .remarks-box {
    border: 1px solid #C8C6BE;
    padding: 6px 8px;
    min-height: 30px;
    font-size: 10px;
    color: #1a1a18;
    background: #FAFAF8;
    border-radius: 2px;
    margin-bottom: 6px;
    line-height: 1.5;
  }

  .remarks-label {
    font-size: 8.5px;
    font-weight: 700;
    color: #6B9E87;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 2px;
  }

  /* Footer signature area */
  .footer-sig {
    display: flex;
    gap: 0;
    border: 1px solid #C8C6BE;
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 6px;
  }

  .sig-block {
    flex: 1;
    padding: 8px 10px;
    border-right: 1px solid #C8C6BE;
    min-height: 50px;
  }

  .sig-block:last-child { border-right: none; }

  .sig-label {
    font-size: 8px;
    font-weight: 700;
    color: #6B9E87;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 3px;
  }

  .sig-name {
    font-size: 11px;
    font-weight: 600;
    color: #1a1a18;
    min-height: 18px;
  }

  .sig-line {
    border-top: 1px solid #C8C6BE;
    margin-top: 16px;
  }

  .sig-role {
    font-size: 8px;
    color: #6B6B65;
    margin-top: 2px;
  }

  /* Page footer */
  .page-footer {
    position: absolute;
    bottom: 8mm;
    left: 14mm;
    right: 14mm;
    border-top: 1px solid #E2E0D8;
    padding-top: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .page-footer-company {
    font-size: 8px;
    font-weight: 700;
    color: #2A5C45;
    letter-spacing: 0.5px;
  }

  .page-footer-address {
    font-size: 7.5px;
    color: #6B6B65;
  }

  .page-footer-cert {
    font-size: 7.5px;
    color: #AEADA6;
    font-family: 'IBM Plex Mono', monospace;
  }

  /* Utilities */
  .text-center { text-align: center; }
  .text-right { text-align: right; }
  .bold { font-weight: 700; }
  .muted { color: #6B6B65; }
  .highlight { background: #EAF3EE; }

  @media print {
    body { padding: 0; background: none; }
    .page { box-shadow: none; margin: 0; }
  }
</style>
</head>
<body>
<div class="page">

  <!-- ═══ HEADER ═══ -->
  <div class="header">
    <div class="header-left">
      <div class="header-logo">Established 1987 · ISO 9001:2015</div>
      <div class="header-company">Vishwakarma Founders</div>
      <div class="header-address">
        Plot No-D 50, MIDC Shiroli, Kolhapur – 416 122, Maharashtra, India<br/>
        Tel: +91-0231-2677XXX &nbsp;|&nbsp; Email: quality@vishwakarma-founders.com
      </div>
    </div>
    <div class="header-right">
      <div class="header-badge">TALDENA GROUP</div>
      <div class="header-badge-secondary">Metal Cloud</div>
    </div>
  </div>

  <!-- ═══ TITLE ═══ -->
  <div class="cert-title">Material Test Certificate</div>

  <!-- ═══ INFO TABLE ═══ -->
  <table>
    <tr>
      <th>Customer Name</th>
      <th>Part Name</th>
      <th>Part Number</th>
      <th>Material Specification</th>
    </tr>
    <tr>
      <td class="val">{{ customerName | default: '—' }}</td>
      <td class="val">{{ partName | default: '—' }}</td>
      <td class="val">{{ partNumber | default: '—' }}</td>
      <td class="val">{{ materialSpec | default: '—' }}</td>
    </tr>
    <tr>
      <th>Report No.</th>
      <th>Heat Number</th>
      <th>Invoice Number</th>
      <th>Issue Date</th>
    </tr>
    <tr>
      <td class="val">{{ reportNo | default: '—' }}</td>
      <td class="val">{{ heatNumber | default: '—' }}</td>
      <td class="val">{{ invoiceNumber | default: '—' }}</td>
      <td class="val">{{ issueDate | default: '—' }}</td>
    </tr>
  </table>

  <!-- ═══ CHEMICAL PROPERTIES ═══ -->
  <div class="section-header">Chemical Properties</div>
  <table>
    <thead>
      <tr>
        <th class="th-accent" style="width:18%"></th>
        <th class="th-accent text-center">C</th>
        <th class="th-accent text-center">Si</th>
        <th class="th-accent text-center">Mn</th>
        <th class="th-accent text-center">P</th>
        <th class="th-accent text-center">S</th>
        <th class="th-accent text-center">Mg</th>
        <th class="th-accent text-center">Ce</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Specified</th>
        <td class="text-center">{{ chemC_spec | default: '—' }}</td>
        <td class="text-center">{{ chemSi_spec | default: '—' }}</td>
        <td class="text-center">{{ chemMn_spec | default: '—' }}</td>
        <td class="text-center">{{ chemP_spec | default: '—' }}</td>
        <td class="text-center">{{ chemS_spec | default: '—' }}</td>
        <td class="text-center">{{ chemMg_spec | default: '—' }}</td>
        <td class="text-center">{{ chemCe_spec | default: '—' }}</td>
      </tr>
      <tr class="highlight">
        <th>Average</th>
        <td class="text-center bold">{{ chemC_avg | default: '—' }}</td>
        <td class="text-center bold">{{ chemSi_avg | default: '—' }}</td>
        <td class="text-center bold">{{ chemMn_avg | default: '—' }}</td>
        <td class="text-center bold">{{ chemP_avg | default: '—' }}</td>
        <td class="text-center bold">{{ chemS_avg | default: '—' }}</td>
        <td class="text-center bold">{{ chemMg_avg | default: '—' }}</td>
        <td class="text-center bold">{{ chemCe_avg | default: '—' }}</td>
      </tr>
    </tbody>
  </table>

  <!-- ═══ MECHANICAL PROPERTIES ═══ -->
  <div class="section-header">Mechanical Properties</div>
  <table>
    <thead>
      <tr>
        <th class="th-accent" style="width:18%"></th>
        <th class="th-accent text-center">Ultimate Tensile Strength</th>
        <th class="th-accent text-center">Yield Strength</th>
        <th class="th-accent text-center">Hardness</th>
        <th class="th-accent text-center">Elongation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Specified</th>
        <td class="text-center">{{ uts_spec | default: '—' }} <span class="muted" style="font-size:8px">N/mm²</span></td>
        <td class="text-center">{{ yield_spec | default: '—' }} <span class="muted" style="font-size:8px">N/mm²</span></td>
        <td class="text-center">{{ hardness_spec | default: '—' }} <span class="muted" style="font-size:8px">HB</span></td>
        <td class="text-center">{{ elongation_spec | default: '—' }} <span class="muted" style="font-size:8px">%</span></td>
      </tr>
      <tr class="highlight">
        <th>Observed</th>
        <td class="text-center bold">{{ uts_obs | default: '—' }} <span class="muted" style="font-size:8px">N/mm²</span></td>
        <td class="text-center bold">{{ yield_obs | default: '—' }} <span class="muted" style="font-size:8px">N/mm²</span></td>
        <td class="text-center bold">{{ hardness_obs | default: '—' }} <span class="muted" style="font-size:8px">HB</span></td>
        <td class="text-center bold">{{ elongation_obs | default: '—' }} <span class="muted" style="font-size:8px">%</span></td>
      </tr>
    </tbody>
  </table>

  <!-- ═══ TEST SAMPLE RESULTS ═══ -->
  {% if testSamples %}
  <div class="section-header">Individual Test Sample Results</div>
  <table>
    <thead>
      <tr>
        <th class="th-accent" style="width:14%">Sample No.</th>
        <th class="th-accent text-center">UTS<br/><span style="font-size:7.5px;font-weight:400">(N/mm²)</span></th>
        <th class="th-accent text-center">Yield Strength<br/><span style="font-size:7.5px;font-weight:400">(N/mm²)</span></th>
        <th class="th-accent text-center">Hardness<br/><span style="font-size:7.5px;font-weight:400">(BHN)</span></th>
        <th class="th-accent text-center">Elongation<br/><span style="font-size:7.5px;font-weight:400">(%)</span></th>
      </tr>
    </thead>
    <tbody>
      {% for s in testSamples %}
      <tr>
        <td class="bold text-center">{{ s.sampleNo | default: '—' }}</td>
        <td class="text-center">{{ s.uts | default: '—' }}</td>
        <td class="text-center">{{ s.yield | default: '—' }}</td>
        <td class="text-center">{{ s.hardness | default: '—' }}</td>
        <td class="text-center">{{ s.elongation | default: '—' }}</td>
      </tr>
      {% endfor %}
    </tbody>
  </table>
  {% endif %}

  <!-- ═══ MICROSTRUCTURE ANALYSIS ═══ -->
  <div class="section-header">Microstructure Analysis</div>

  <div class="micro-images">
    <div class="micro-image-box">
      <div class="micro-image-icon">🔬</div>
      <div class="micro-image-label">Ferrite Nodular Iron — Polished</div>
      <div style="font-size:7.5px; color:#AEADA6;">100× Magnification</div>
    </div>
    <div class="micro-image-box">
      <div class="micro-image-icon">⬡</div>
      <div class="micro-image-label">Phase Structure</div>
      <div style="font-size:7.5px; color:#AEADA6;">Etched with Nital 2%</div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th class="th-accent" rowspan="2" style="width:20%; vertical-align:middle">Field Area</th>
        <th class="th-accent text-center" colspan="2">Approximate Type Distribution</th>
        <th class="th-accent text-center" colspan="3">Approximate Phase Distribution</th>
      </tr>
      <tr>
        <th class="text-center" style="background:#F0F0EB">Nodularity (%)</th>
        <th class="text-center" style="background:#F0F0EB">Nodule Count<br/><span style="font-size:7.5px; font-weight:400">(per mm²)</span></th>
        <th class="text-center" style="background:#F0F0EB">Pearlite (%)</th>
        <th class="text-center" style="background:#F0F0EB">Ferrite (%)</th>
        <th class="text-center" style="background:#F0F0EB">Others</th>
      </tr>
    </thead>
    <tbody>
      <tr class="highlight">
        <td class="bold text-center">Representative</td>
        <td class="text-center bold">{{ nodularity | default: '—' }}</td>
        <td class="text-center bold">{{ noduleCount | default: '—' }}</td>
        <td class="text-center bold">{{ pearlite | default: '—' }}</td>
        <td class="text-center bold">{{ ferrite | default: '—' }}</td>
        <td class="text-center bold">{{ others | default: 'Nil' }}</td>
      </tr>
    </tbody>
  </table>

  <!-- ═══ REMARKS ═══ -->
  <div class="section-header" style="margin-top:6px">Remarks</div>
  <div class="remarks-box">
    {{ remarks | default: 'All tests conducted as per relevant Indian Standards. Material complies with the specified requirements.' }}
  </div>

  <!-- ═══ SIGNATURES ═══ -->
  <div class="footer-sig">
    <div class="sig-block">
      <div class="sig-label">Prepared By</div>
      <div class="sig-name">{{ createdBy | default: '&nbsp;' }}</div>
      <div class="sig-line"></div>
      <div class="sig-role">Quality Engineer</div>
    </div>
    <div class="sig-block">
      <div class="sig-label">Approved By</div>
      <div class="sig-name">{{ approvedBy | default: '&nbsp;' }}</div>
      <div class="sig-line"></div>
      <div class="sig-role">QC Incharge</div>
    </div>
    <div class="sig-block">
      <div class="sig-label">Signature</div>
      <div style="height:30px; border-bottom:1px solid #C8C6BE; margin-top:4px; margin-bottom:4px;"></div>
      <div class="sig-role">Authorised Signatory</div>
    </div>
    <div class="sig-block" style="background:#EAF3EE">
      <div class="sig-label">Quality Control</div>
      <div style="font-size:9px; font-weight:700; color:#2A5C45; margin-top:4px; text-align:center;">QC INCHARGE</div>
      <div style="text-align:center; margin-top:6px;">
        <div style="width:36px; height:36px; border:1.5px solid #2A5C45; border-radius:50%; margin:0 auto; display:flex; align-items:center; justify-content:center; font-size:7px; color:#2A5C45; font-weight:700; letter-spacing:-0.5px;">SEAL</div>
      </div>
    </div>
  </div>

  <!-- ═══ PAGE FOOTER ═══ -->
  <div class="page-footer">
    <div>
      <div class="page-footer-company">Vishwakarma Founders</div>
      <div class="page-footer-address">Plot No-D 50, MIDC Shiroli, Kolhapur – 416 122</div>
    </div>
    <div style="text-align:center; font-size:7.5px; color:#AEADA6;">
      This certificate is computer generated and does not require a physical signature.
    </div>
    <div class="page-footer-cert">
      Report: {{ reportNo | default: 'N/A' }}
    </div>
  </div>

</div>
</body>
</html>`

// ─── Customer 2: ABC Castings — Product Inspection Report ────────────────────

const abcCastingsFormSchema = JSON.stringify({
  errorType: 'MuiErrorWrapper',
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'sec_basic',
        type: 'MuiTypography',
        props: {
          children: { value: 'Inspection Details' },
          variant: { value: 'h6' },
          sx: { value: { color: '#2A5C45', mb: 1, fontWeight: 700, fontSize: '14px', letterSpacing: '0.5px', textTransform: 'uppercase' } },
        },
      },
      {
        key: 'row1',
        type: 'MuiStack',
        props: {
          direction: { value: 'row' },
          spacing: { value: 2 },
          sx: { value: { width: '100%', mb: 1 } },
        },
        children: [
          {
            key: 'inspectionDate',
            type: 'MuiTextField',
            props: {
              label: { value: 'Inspection Date' },
              fullWidth: { value: true },
              size: { value: 'small' },
              type: { value: 'date' },
            },
          },
          {
            key: 'inspector',
            type: 'MuiTextField',
            props: {
              label: { value: 'Inspector Name' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: 'e.g. Rajesh Patil' },
            },
          },
        ],
      },
      {
        key: 'row2',
        type: 'MuiStack',
        props: {
          direction: { value: 'row' },
          spacing: { value: 2 },
          sx: { value: { width: '100%', mb: 2 } },
        },
        children: [
          {
            key: 'productName',
            type: 'MuiTextField',
            props: {
              label: { value: 'Product Name' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: 'e.g. Bearing Housing' },
            },
          },
          {
            key: 'batchNo',
            type: 'MuiTextField',
            props: {
              label: { value: 'Batch Number' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: 'e.g. BH-2024-0152' },
            },
          },
        ],
      },
      {
        key: 'sec_dim',
        type: 'MuiTypography',
        props: {
          children: { value: 'Dimensional Inspection' },
          variant: { value: 'h6' },
          sx: { value: { color: '#2A5C45', mb: 1, fontWeight: 700, fontSize: '14px', letterSpacing: '0.5px', textTransform: 'uppercase' } },
        },
      },
      {
        key: 'row3',
        type: 'MuiStack',
        props: {
          direction: { value: 'row' },
          spacing: { value: 2 },
          sx: { value: { width: '100%', mb: 1 } },
        },
        children: [
          {
            key: 'dimension_spec',
            type: 'MuiTextField',
            props: {
              label: { value: 'Dimension Specified (mm)' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '150 ± 0.5' },
            },
          },
          {
            key: 'dimension_act',
            type: 'MuiTextField',
            props: {
              label: { value: 'Dimension Actual (mm)' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '150.2' },
            },
          },
        ],
      },
      {
        key: 'row4',
        type: 'MuiStack',
        props: {
          direction: { value: 'row' },
          spacing: { value: 2 },
          sx: { value: { width: '100%', mb: 2 } },
        },
        children: [
          {
            key: 'weight_spec',
            type: 'MuiTextField',
            props: {
              label: { value: 'Weight Specified (kg)' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '12.5 ± 0.3' },
            },
          },
          {
            key: 'weight_act',
            type: 'MuiTextField',
            props: {
              label: { value: 'Weight Actual (kg)' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '12.48' },
            },
          },
        ],
      },
      {
        key: 'sec_qual',
        type: 'MuiTypography',
        props: {
          children: { value: 'Quality Parameters' },
          variant: { value: 'h6' },
          sx: { value: { color: '#2A5C45', mb: 1, fontWeight: 700, fontSize: '14px', letterSpacing: '0.5px', textTransform: 'uppercase' } },
        },
      },
      {
        key: 'row5',
        type: 'MuiStack',
        props: {
          direction: { value: 'row' },
          spacing: { value: 2 },
          sx: { value: { width: '100%', mb: 1 } },
        },
        children: [
          {
            key: 'surfaceFinish',
            type: 'MuiTextField',
            props: {
              label: { value: 'Surface Finish (Ra μm)' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '≤ 6.3' },
            },
          },
          {
            key: 'hardness_val',
            type: 'MuiTextField',
            props: {
              label: { value: 'Hardness (HRC)' },
              fullWidth: { value: true },
              size: { value: 'small' },
              placeholder: { value: '58–62' },
            },
          },
        ],
      },
      // ── Section: Inspection Checklist (repeating rows) ──────────────────
      // abcCastingsInjector assembles item1_* … item8_* into inspectionItems[].
      {
        key: 'sec_items',
        type: 'MuiTypography',
        props: {
          children: { value: 'Inspection Checklist' },
          variant: { value: 'h6' },
          sx: { value: { color: '#2A5C45', mb: 0.5, mt: 2, fontWeight: 700, fontSize: '14px', letterSpacing: '0.5px', textTransform: 'uppercase' } },
        },
      },
      {
        key: 'sec_items_hint',
        type: 'MuiTypography',
        props: {
          children: { value: 'Enter each inspection parameter below. Rows without a description are skipped.' },
          variant: { value: 'body2' },
          sx: { value: { color: '#6B9E87', mb: 1, fontSize: '11px' } },
        },
      },
      ...([1, 2, 3, 4, 5, 6, 7, 8].map(i => ({
        key: `row_item${i}`,
        type: 'MuiStack',
        props: { direction: { value: 'row' }, spacing: { value: 1 }, sx: { value: { width: '100%', mb: 0.5, alignItems: 'flex-end' } } },
        children: [
          { key: `item${i}_itemNo`,        type: 'MuiTextField', props: { label: { value: '#' },          size: { value: 'small' }, placeholder: { value: String(i) }, sx: { value: { width: '45px', flexShrink: 0 } } } },
          { key: `item${i}_description`,   type: 'MuiTextField', props: { label: { value: 'Parameter' },  size: { value: 'small' }, placeholder: { value: 'Diameter' },    fullWidth: { value: true } } },
          { key: `item${i}_specification`, type: 'MuiTextField', props: { label: { value: 'Spec.' },      size: { value: 'small' }, placeholder: { value: '45±0.05' },      fullWidth: { value: true } } },
          { key: `item${i}_actual`,        type: 'MuiTextField', props: { label: { value: 'Actual' },     size: { value: 'small' }, placeholder: { value: '44.98' },        fullWidth: { value: true } } },
          { key: `item${i}_result`,        type: 'MuiTextField', props: { label: { value: 'Result' },     size: { value: 'small' }, placeholder: { value: 'Pass' },         sx: { value: { width: '65px', flexShrink: 0 } } } },
        ],
      }))),

      {
        key: 'approvers',
        type: 'ApproverList',
        props: {},
      },
      {
        key: 'sec_verdict',
        type: 'MuiTypography',
        props: {
          children: { value: 'Verdict & Remarks' },
          variant: { value: 'h6' },
          sx: { value: { color: '#2A5C45', mb: 1, fontWeight: 700, fontSize: '14px', letterSpacing: '0.5px', textTransform: 'uppercase' } },
        },
      },
      {
        key: 'status',
        type: 'MuiTextField',
        props: {
          label: { value: 'Status (Pass / Fail / Hold)' },
          fullWidth: { value: true },
          size: { value: 'small' },
          placeholder: { value: 'Pass' },
          sx: { value: { mb: 1 } },
        },
      },
      {
        key: 'remarks',
        type: 'MuiTextField',
        props: {
          label: { value: 'Remarks' },
          fullWidth: { value: true },
          size: { value: 'small' },
          multiline: { value: true },
          rows: { value: 3 },
          placeholder: { value: 'All inspected parameters within acceptable limits. Batch cleared for dispatch.' },
          sx: { value: { mb: 1 } },
        },
      },

    ],
  },
})

const abcCastingsTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>Product Inspection Report</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'IBM Plex Sans', Arial, sans-serif;
    font-size: 11px;
    color: #1a1a18;
    background: #fff;
    padding: 0;
  }

  .page {
    width: 210mm;
    min-height: 297mm;
    margin: 0 auto;
    padding: 12mm 14mm 40mm;
    background: #fff;
    box-shadow: 0 0 20px rgba(0,0,0,0.08);
    position: relative;
  }

  table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }

  th, td {
    border: 1px solid #C8C6BE;
    padding: 5px 8px;
    vertical-align: middle;
    font-size: 10px;
    line-height: 1.4;
  }

  th {
    background: #F0F0EB;
    font-weight: 600;
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }

  .th-blue { background: #1565C0; color: #fff; }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #1565C0;
    padding-bottom: 8px;
    margin-bottom: 6px;
  }

  .company-name { font-size: 20px; font-weight: 700; color: #1A1A18; }
  .company-sub { font-size: 8px; color: #6B6B65; margin-top: 2px; letter-spacing: 0.5px; }

  .report-badge {
    background: #1565C0;
    color: #fff;
    padding: 6px 14px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    border-radius: 2px;
  }

  .report-title {
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    color: #1565C0;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 5px 0;
    border-bottom: 1px solid #E2E0D8;
    margin-bottom: 6px;
  }

  .section-header {
    background: #E3F2FD;
    border-left: 3px solid #1565C0;
    padding: 3px 8px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #1565C0;
    margin: 6px 0 3px;
  }

  .pass-badge {
    display: inline-block;
    padding: 3px 12px;
    border-radius: 99px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    background: #E8F5E9;
    color: #2E7D32;
    border: 1.5px solid #66BB6A;
  }

  .fail-badge {
    background: #FDECEA;
    color: #C62828;
    border-color: #EF5350;
  }

  .hold-badge {
    background: #FFF8E1;
    color: #F57F17;
    border-color: #FFCA28;
  }

  .remarks-box {
    border: 1px solid #C8C6BE;
    padding: 6px 8px;
    min-height: 36px;
    font-size: 10px;
    color: #1a1a18;
    background: #FAFAF8;
    border-radius: 2px;
    line-height: 1.5;
  }

  .footer-sig {
    display: flex;
    gap: 0;
    border: 1px solid #C8C6BE;
    overflow: hidden;
    margin-top: 10px;
  }

  .sig-block {
    flex: 1;
    padding: 8px 10px;
    border-right: 1px solid #C8C6BE;
    min-height: 50px;
  }
  .sig-block:last-child { border-right: none; }

  .sig-label { font-size: 8px; font-weight: 700; color: #1565C0; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 3px; }
  .sig-name { font-size: 11px; font-weight: 600; min-height: 18px; }
  .sig-line { border-top: 1px solid #C8C6BE; margin-top: 14px; }
  .sig-role { font-size: 8px; color: #6B6B65; margin-top: 2px; }

  .page-footer {
    position: absolute;
    bottom: 8mm;
    left: 14mm;
    right: 14mm;
    border-top: 1px solid #E2E0D8;
    padding-top: 4px;
    display: flex;
    justify-content: space-between;
    font-size: 7.5px;
    color: #6B6B65;
  }

  .text-center { text-align: center; }
  .bold { font-weight: 700; }
  .highlight { background: #E3F2FD !important; }

  @media print {
    body { background: none; }
    .page { box-shadow: none; margin: 0; }
  }
</style>
</head>
<body>
<div class="page">

  <div class="header">
    <div>
      <div class="company-name">ABC Castings</div>
      <div class="company-sub">Quality Assured Casting Solutions · ISO 9001:2015 Certified</div>
    </div>
    <div class="report-badge">Product Inspection Report</div>
  </div>

  <div class="report-title">Product Inspection Report</div>

  <div class="section-header">Inspection Details</div>
  <table>
    <tr>
      <th>Inspection Date</th>
      <th>Inspector Name</th>
      <th>Product Name</th>
      <th>Batch Number</th>
    </tr>
    <tr>
      <td class="bold">{{ inspectionDate | default: '—' }}</td>
      <td class="bold">{{ inspector | default: '—' }}</td>
      <td class="bold">{{ productName | default: '—' }}</td>
      <td class="bold">{{ batchNo | default: '—' }}</td>
    </tr>
  </table>

  <!-- ═══ INSPECTION CHECKLIST ═══ -->
  <div class="section-header">Inspection Checklist</div>
  {% if inspectionItems %}
  <table>
    <thead>
      <tr>
        <th class="th-blue" style="width:8%; text-align:center">#</th>
        <th class="th-blue" style="width:30%">Parameter</th>
        <th class="th-blue text-center">Specification</th>
        <th class="th-blue text-center">Actual Value</th>
        <th class="th-blue text-center" style="width:12%">Result</th>
      </tr>
    </thead>
    <tbody>
      {% for item in inspectionItems %}
      <tr>
        <td class="text-center">{{ item.itemNo }}</td>
        <td>{{ item.description }}</td>
        <td class="text-center">{{ item.specification | default: '—' }}</td>
        <td class="text-center bold">{{ item.actual | default: '—' }}</td>
        <td class="text-center bold" style="color:{% if item.result == 'Pass' %}#1D7A4A{% elsif item.result == 'Fail' %}#B03020{% else %}#AEADA6{% endif %}">
          {{ item.result | default: '—' }}
        </td>
      </tr>
      {% endfor %}
    </tbody>
  </table>
  {% else %}
  <div style="padding:12px; text-align:center; color:#AEADA6; font-style:italic; font-size:10px; border:1px dashed #E2E0D8; border-radius:4px; margin-bottom:8px;">
    No inspection items added yet — use the form to add rows.
  </div>
  {% endif %}

  <div class="section-header">Dimensional Inspection</div>
  <table>
    <thead>
      <tr>
        <th class="th-blue"></th>
        <th class="th-blue text-center">Dimension</th>
        <th class="th-blue text-center">Weight</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Specified</th>
        <td class="text-center">{{ dimension_spec | default: '—' }} <span style="font-size:8px;color:#6B6B65">mm</span></td>
        <td class="text-center">{{ weight_spec | default: '—' }} <span style="font-size:8px;color:#6B6B65">kg</span></td>
      </tr>
      <tr class="highlight">
        <th>Actual</th>
        <td class="text-center bold">{{ dimension_act | default: '—' }} <span style="font-size:8px;color:#6B6B65">mm</span></td>
        <td class="text-center bold">{{ weight_act | default: '—' }} <span style="font-size:8px;color:#6B6B65">kg</span></td>
      </tr>
    </tbody>
  </table>

  <div class="section-header">Quality Parameters</div>
  <table>
    <tr>
      <th>Surface Finish (Ra μm)</th>
      <th>Hardness (HRC)</th>
    </tr>
    <tr>
      <td class="bold text-center">{{ surfaceFinish | default: '—' }}</td>
      <td class="bold text-center">{{ hardness_val | default: '—' }}</td>
    </tr>
  </table>

  <div class="section-header">Verdict</div>
  <table>
    <tr>
      <th style="width:30%">Overall Status</th>
      <td>
        {% assign st = status | upcase %}
        {% if st == 'PASS' %}
          <span class="pass-badge">✓ PASS</span>
        {% elsif st == 'FAIL' %}
          <span class="fail-badge">✗ FAIL</span>
        {% elsif st == 'HOLD' %}
          <span class="hold-badge">⚠ HOLD</span>
        {% else %}
          <span style="color:#AEADA6; font-style:italic">{{ status | default: 'Pending' }}</span>
        {% endif %}
      </td>
    </tr>
  </table>

  <div class="section-header">Remarks</div>
  <div class="remarks-box">
    {{ remarks | default: 'No remarks.' }}
  </div>

  <div class="footer-sig">
    <div class="sig-block">
      <div class="sig-label">Inspector</div>
      <div class="sig-name">{{ inspector | default: '&nbsp;' }}</div>
      <div class="sig-line"></div>
      <div class="sig-role">Quality Inspector</div>
    </div>
    {% if approvers %}
      {% for approver in approvers %}
      <div class="sig-block">
        <div class="sig-label">Approver {{ forloop.index }}</div>
        <div class="sig-name">{{ approver.name | default: '&nbsp;' }}</div>
        <div class="sig-line"></div>
        <div class="sig-role">{{ approver.role | default: '&nbsp;' }}</div>
      </div>
      {% endfor %}
    {% else %}
    <div class="sig-block">
      <div class="sig-label">Approved By</div>
      <div class="sig-name">&nbsp;</div>
      <div class="sig-line"></div>
      <div class="sig-role">&nbsp;</div>
    </div>
    {% endif %}
  </div>

  <div class="page-footer">
    <div><strong>ABC Castings</strong> · Quality Assured Casting Solutions</div>
    <div>Batch: {{ batchNo | default: 'N/A' }} &nbsp;|&nbsp; Date: {{ inspectionDate | default: 'N/A' }}</div>
    <div>Page 1 of 1</div>
  </div>

</div>
</body>
</html>`

export const SAMPLE_CUSTOMERS: Customer[] = [
  {
    id: 'cust-001-vishwakarma',
    name: 'Vishwakarma Founders',
    description: 'Ductile iron castings manufacturer. Generate Material Test Certificates (MTC) for each heat/batch with chemical & mechanical properties.',
    formSchema: vishwakarmaFormSchema,
    template: vishwakarmaTemplate,
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: 'cust-002-abc-castings',
    name: 'ABC Castings',
    description: 'General purpose castings supplier. Product Inspection Reports for dimensional, weight, and quality parameter verification.',
    formSchema: abcCastingsFormSchema,
    template: abcCastingsTemplate,
    features: { approvers: true },
    createdAt: new Date('2024-02-20').toISOString(),
  },
]
