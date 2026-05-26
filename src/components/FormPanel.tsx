import React, { useCallback, useEffect, useRef } from 'react'
import { FormViewer } from '@react-form-builder/core'
import { view as muiView } from '@react-form-builder/components-material-ui'
import { approverListModel } from './ApproverListWidget'

// Register custom components into the shared MUI view once at module load time.
muiView.define(approverListModel)

interface FormPanelProps {
  formSchema: string
  initialData?: Record<string, unknown>
  onDataChange: (data: Record<string, unknown>) => void
}

export const FormPanel: React.FC<FormPanelProps> = ({
  formSchema,
  initialData,
  onDataChange,
}) => {
  // Keep onDataChange in a ref so the memoized handlers below never go stale
  const onDataChangeRef = useRef(onDataChange)
  useEffect(() => { onDataChangeRef.current = onDataChange })

  // Stable function reference — only changes when the actual schema string changes.
  // Without useCallback, a new function is created every parent render, which causes
  // FormEngine to reload (and reset) the form on every keystroke.
  const getForm = useCallback(() => formSchema, [formSchema])

  // Stable handler — uses ref so it is never recreated
  const handleFormDataChange = useCallback(
    (payload: unknown) => {
      const p = payload as { data?: unknown }
      const data = p?.data ?? payload
      onDataChangeRef.current(data as Record<string, unknown>)
    },
    []
  )

  return (
    <div className="form-panel-wrap" style={{ padding: '4px' }}>
      <FormViewer
        view={muiView}
        getForm={getForm}
        initialData={initialData}
        onFormDataChange={handleFormDataChange}
        actions={{ onSubmit: async () => {} }}
      />
    </div>
  )
}
