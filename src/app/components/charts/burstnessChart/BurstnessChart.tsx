import { LineChart } from "@mui/x-charts";

const burstness = [
  { time: 0, packets: 2 },
  { time: 1, packets: 3 },
  { time: 2, packets: 30 },
  { time: 3, packets: 1 },
  { time: 4, packets: 5 },
]

const BurstnessChart = () => (
  <LineChart
    dataset={burstness}
    xAxis={[{ dataKey: 'time', label: 'Tempo' }]}
    series={[{ dataKey: 'packets', label: 'Pacotes' }]}
    height={300}
  />
)

export default BurstnessChart;
