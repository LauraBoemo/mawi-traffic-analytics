import { BarChart } from "@mui/x-charts";

const avgPacketSizeByIP = [
  { ip: '192.168.0.1', size: 520 },
  { ip: '10.0.0.1', size: 480 },
  { ip: '172.16.0.2', size: 600 },
]

const AvgPacketSizeChart = () => (
  <BarChart
    dataset={avgPacketSizeByIP}
    xAxis={[{ dataKey: 'ip', label: 'IP', scaleType: 'band' }]}
    series={[{ dataKey: 'size', label: 'Tamanho médio (bytes)' }]}
    height={300}
  />
)

export default AvgPacketSizeChart;