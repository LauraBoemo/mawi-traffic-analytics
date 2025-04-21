import { BarChart } from "@mui/x-charts"

const stats = [
  { metric: 'Skewness', value: 1.8 },
  { metric: 'Kurtosis', value: 3.2 },
]

const StatsChart = () => (
  <BarChart
    dataset={stats}
    xAxis={[{ dataKey: 'metric', scaleType: 'band' }]}
    series={[{ dataKey: 'value', label: 'Valor' }]}
    height={300}
  />
)

export default StatsChart;