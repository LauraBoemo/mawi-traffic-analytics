import { LineChart } from "@mui/x-charts"

const packetSizeCDF = [
  { size: 100, cdf: 0.1 },
  { size: 300, cdf: 0.5 },
  { size: 500, cdf: 0.75 },
  { size: 700, cdf: 0.9 },
  { size: 1000, cdf: 1.0 },
]

const CDFChart = () => (
  <LineChart
    dataset={packetSizeCDF}
    xAxis={[{ dataKey: 'size', label: 'Tamanho (bytes)' }]}
    series={[{ dataKey: 'cdf', label: 'CDF' }]}
    height={300}
  />
)

export default CDFChart; 