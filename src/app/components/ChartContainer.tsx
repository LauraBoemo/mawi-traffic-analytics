import { CSSProperties } from "react";

const chartContainerStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  justifyContent: 'center',
}

const ChartContainer = ({ children }: { children: React.ReactNode }) => (
  <div style={chartContainerStyle}>
    {children}
  </div>
)

export default ChartContainer;