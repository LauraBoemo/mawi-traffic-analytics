import { BarChart } from "@mui/x-charts"

const horizontalScan = [
  { ip: '192.168.0.1', destinations: 2 },
  { ip: '10.0.0.5', destinations: 200 },
  { ip: '172.16.1.10', destinations: 1 },
]

const HorizontalScanChart = () => (
  <BarChart
    dataset={horizontalScan}
    xAxis={[{ dataKey: 'ip', label: 'IP', scaleType: 'band' }]}
    series={[{ dataKey: 'destinations', label: 'Destinos únicos' }]}
    height={300}
  />
)

export default HorizontalScanChart;