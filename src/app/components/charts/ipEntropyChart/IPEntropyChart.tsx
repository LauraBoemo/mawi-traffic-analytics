import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";
import { loadIPEntropyByWindow } from "./loadIpEntropyChart";
import ChartLoad from "../../ChartLoad";

const IPEntropyChart = () => {
  const [data, setData] = useState<{ window: string; entropy: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadIPEntropyByWindow()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ChartLoad />;

  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: "window", label: "Janela", scaleType: "band" }]}
      series={[{ dataKey: "entropy", label: "Entropia" }]}
      height={250}
    />
  );
};

export default IPEntropyChart;
