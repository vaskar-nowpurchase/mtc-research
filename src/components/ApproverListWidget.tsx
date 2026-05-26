import React from 'react'
import { define, array, useComponentData } from '@react-form-builder/core'

interface Approver {
  name: string
  role: string
}

const ApproverListWidget: React.FC<{ value?: Approver[] }> = ({ value = [] }) => {
  const { field } = useComponentData()

  const set = (next: Approver[]) => field?.setValue(next)
  const add = () => set([...value, { name: '', role: '' }])
  const remove = (i: number) => set(value.filter((_, idx) => idx !== i))
  const update = (i: number, key: keyof Approver, text: string) =>
    set(value.map((a, idx) => (idx === i ? { ...a, [key]: text } : a)))

  return (
    <div style={{ width: '100%', marginTop: 4 }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{
          fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.6px', color: 'var(--text-secondary)',
        }}>
          Approvers
        </span>
        <button
          type="button"
          onClick={add}
          disabled={value.length >= 10}
          className="btn btn-secondary btn-sm"
          style={{ fontSize: 11, padding: '3px 10px' }}
        >
          + Add Row
        </button>
      </div>

      {/* Empty state */}
      {value.length === 0 && (
        <div style={{
          fontSize: 11, color: 'var(--text-hint)', fontStyle: 'italic',
          padding: '6px 0 2px',
        }}>
          No approvers yet — click "+ Add Row" to add one.
        </div>
      )}

      {/* Rows */}
      {value.map((approver, i) => (
        <div
          key={i}
          style={{
            display: 'flex', gap: 6, alignItems: 'center', marginBottom: 5,
            background: 'var(--bg)',
            border: '1px solid var(--border-soft)',
            borderRadius: 'var(--radius-sm)',
            padding: '5px 8px',
          }}
        >
          <span style={{
            fontSize: 10, color: 'var(--text-hint)',
            fontFamily: 'var(--mono)', width: 16, textAlign: 'right', flexShrink: 0,
          }}>
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
            type="button"
            onClick={() => remove(i)}
            title="Remove"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--danger)', fontSize: 16, lineHeight: 1,
              padding: '0 2px', flexShrink: 0, opacity: 0.7,
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  flex: 1, fontSize: 12, padding: '5px 8px',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-sm)',
  background: 'var(--surface)',
  color: 'var(--text-primary)',
  fontFamily: 'var(--sans)',
  outline: 'none',
  minWidth: 0,
}

export const approverListModel = define(ApproverListWidget, 'ApproverList')
  .props({ value: array.valued })
  .build()
  .model
