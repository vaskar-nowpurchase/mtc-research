import React from 'react'

export interface Approver {
  name: string
  role: string
}

interface Props {
  value: Approver[]
  onChange: (list: Approver[]) => void
}

export const ApproverList: React.FC<Props> = ({ value, onChange }) => {
  const add = () => onChange([...value, { name: '', role: '' }])
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i))
  const update = (i: number, field: keyof Approver, text: string) =>
    onChange(value.map((a, idx) => (idx === i ? { ...a, [field]: text } : a)))

  return (
    <div style={{ padding: '10px 16px 14px', borderTop: '1px solid var(--border-soft)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
          Approvers
        </span>
        <button
          className="btn btn-secondary btn-sm"
          onClick={add}
          disabled={value.length >= 10}
          style={{ fontSize: 11, padding: '3px 10px' }}
        >
          + Add Row
        </button>
      </div>

      {value.length === 0 && (
        <div style={{ fontSize: 11, color: 'var(--text-hint)', fontStyle: 'italic' }}>
          No approvers — click "Add Row" to add one.
        </div>
      )}

      {value.map((approver, i) => (
        <div
          key={i}
          style={{
            display: 'flex', gap: 6, alignItems: 'center', marginBottom: 5,
            background: 'var(--surface-raised)',
            border: '1px solid var(--border-soft)',
            borderRadius: 4, padding: '5px 8px',
          }}
        >
          <span style={{ fontSize: 10, color: 'var(--text-hint)', fontFamily: 'var(--mono)', width: 16, flexShrink: 0 }}>
            {i + 1}
          </span>
          <input
            type="text"
            placeholder="Name"
            value={approver.name}
            onChange={e => update(i, 'name', e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Role / Designation"
            value={approver.role}
            onChange={e => update(i, 'role', e.target.value)}
            style={inputStyle}
          />
          <button
            onClick={() => remove(i)}
            title="Remove"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger)', fontSize: 16, padding: '0 2px', lineHeight: 1, flexShrink: 0 }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  flex: 1, fontSize: 12, padding: '4px 8px',
  border: '1px solid var(--border-soft)', borderRadius: 3,
  background: 'var(--surface)', color: 'var(--text-primary)', outline: 'none',
}
