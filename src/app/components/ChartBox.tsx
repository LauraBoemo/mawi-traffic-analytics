import { CSSProperties } from "react"

export const chartBoxBaseStyle: CSSProperties = {
  backgroundColor: 'red',
  padding: '1rem',
  borderRadius: '8px',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  boxSizing: 'border-box',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

type ChartBoxProps = {
  title: string
  description?: string
  children: React.ReactNode
  fullWidth?: boolean
}

export const ChartBox = ({ title, description, children, fullWidth = false }: ChartBoxProps) => {
  const boxStyle: CSSProperties = {
    ...chartBoxBaseStyle,
    width: fullWidth ? '100%' : '48.6%'
  }

  return (
    <div style={boxStyle}>
      <h3 style={{ textAlign: 'center', fontSize: '1rem', marginBottom: '0.5rem' }}>{title}</h3>
      {description && (
        <p style={{ fontSize: '0.85rem', textAlign: 'center', margin: '0 0 0.5rem 0' }}>
          {description}
        </p>
      )}
      <div style={{ width: '100%' }}>{children}</div>
    </div>
  )
}
