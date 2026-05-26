import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Customer } from '../types'
import { getCustomers, seedIfNeeded } from '../services/storage'

export const CustomerListPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    seedIfNeeded()
    setCustomers(getCustomers())
  }, [])

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">Customers</div>
          <div className="page-subtitle">
            Select a customer to manage their document templates and records.
          </div>
        </div>
        <div className="tag" style={{ alignSelf: 'flex-start' }}>
          {customers.length} customer{customers.length !== 1 ? 's' : ''}
        </div>
      </div>

      {customers.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon">🏭</div>
          <div className="empty-state__title">No customers yet</div>
          <div className="empty-state__body">
            Customers and their document templates will appear here.
          </div>
        </div>
      ) : (
        <div className="customer-grid">
          {customers.map(customer => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              onClick={() => navigate(`/customer/${customer.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface CustomerCardProps {
  customer: Customer
  onClick: () => void
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onClick }) => {
  const date = new Date(customer.createdAt)
  const formatted = date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="customer-card" onClick={onClick}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: 'var(--accent-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          marginBottom: 12,
          color: 'var(--accent)',
          fontWeight: 700,
        }}
      >
        {customer.name.charAt(0).toUpperCase()}
      </div>
      <div className="customer-card__name">{customer.name}</div>
      <div className="customer-card__desc">{customer.description}</div>
      <div className="customer-card__meta">
        <span>Since {formatted}</span>
        <span style={{ marginLeft: 'auto' }}>
          <span className="tag">View Docs →</span>
        </span>
      </div>
    </div>
  )
}
