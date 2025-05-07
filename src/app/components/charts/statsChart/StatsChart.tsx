import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";
import { loadIPGStats } from "./loadStatsChart";
import ChartLoad from "../../ChartLoad";

const StatsChart = () => {
  const [data, setData] = useState<{ metric: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadIPGStats()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ChartLoad />;
  }

  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: "metric", scaleType: "band" }]}
      series={[{ dataKey: "value", label: "Valor" }]}
      height={300}
    />
  );
};

export default StatsChart;
