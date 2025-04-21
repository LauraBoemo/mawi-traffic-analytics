import { LineChart } from "@mui/x-charts";

const timeDistByIP = [
  { time: 0, '192.168.0.1': 10, '10.0.0.1': 5 },
  { time: 1, '192.168.0.1': 15, '10.0.0.1': 3 },
  { time: 2, '192.168.0.1': 20, '10.0.0.1': 10 },
]

const TemporalDistChart = () => (
  <LineChart
    dataset={timeDistByIP}
    xAxis={[{ dataKey: 'time', label: 'Tempo' }]}
    series={[
      { dataKey: '192.168.0.1', label: '192.168.0.1' },
      { dataKey: '10.0.0.1', label: '10.0.0.1' },
    ]}
    height={300}
  />
)

export default TemporalDistChart;