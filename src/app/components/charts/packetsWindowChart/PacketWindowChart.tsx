import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";
import { loadPacketsPerWindow } from "./loadPacketsWindowChart";
import ChartLoad from "../../ChartLoad";

const PacketsWindowChart = () => {
  const [data, setData] = useState<{ window: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadPacketsPerWindow(10)
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ChartLoad />;
  }

  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: "window", label: "Janela", scaleType: "band" }]}
      series={[{ dataKey: "count", label: "Pacotes" }]}
      height={300}
    />
  );
};

export default PacketsWindowChart;
