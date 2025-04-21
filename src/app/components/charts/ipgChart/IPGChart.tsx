import { LineChart } from "@mui/x-charts"

const ipgData = [
  { x: 0, y: 20 },
  { x: 1, y: 10 },
  { x: 2, y: 15 },
  { x: 3, y: 5 },
  { x: 4, y: 8 },
  { x: 5, y: 12 },
]

const IPGChart = () => (
  <LineChart
    dataset={ipgData}
    xAxis={[{ dataKey: 'x', label: 'Pacote' }]}
    series={[{ dataKey: 'y', label: 'IPG (ms)' }]}
    height={300}
  />
)
 
export default IPGChart;