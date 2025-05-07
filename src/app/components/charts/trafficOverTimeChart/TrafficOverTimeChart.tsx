import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";
import { loadTrafficOverTime } from "./loadTrafficOverTimeChart";
import ChartLoad from "../../ChartLoad";

const TrafficOverTimeChart = () => {
  const [data, setData] = useState<{ time: number; bytes: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadTrafficOverTime()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ChartLoad />;

  return (
    <LineChart
      dataset={data}
      xAxis={[{ dataKey: "time", label: "Tempo (s)" }]}
      series={[{ dataKey: "bytes", label: "Bytes Transmitidos" }]}
      height={250}
    />
  );
};

export default TrafficOverTimeChart;
