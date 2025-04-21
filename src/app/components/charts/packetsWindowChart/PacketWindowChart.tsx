import { BarChart } from "@mui/x-charts"

const packetsPerWindow = [
  { window: '00:00-00:10', count: 150 },
  { window: '00:10-00:20', count: 230 },
  { window: '00:20-00:30', count: 180 },
]

export const PacketsWindowChart = () => (
  <BarChart
    dataset={packetsPerWindow}
    xAxis={[{ dataKey: 'window', label: 'Janela', scaleType: 'band' }]}
    series={[{ dataKey: 'count', label: 'Pacotes' }]}
    height={300}
  />
)

export default PacketsWindowChart;
