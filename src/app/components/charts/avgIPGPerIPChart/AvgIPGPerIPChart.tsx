import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";
import { loadAvgIPGPerIP } from "./loadAvgIPGPerIPChart";
import ChartLoad from "../../ChartLoad";

const AvgIPGPerIPChart = () => {
  const [data, setData] = useState<{ ip: string; avg: number; std: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadAvgIPGPerIP()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ChartLoad />;

  return (
    <LineChart
      dataset={data}
      xAxis={[{ dataKey: "ip", label: "IP", scaleType: "band" }]}
      series={[
        { dataKey: "avg", label: "IPG Médio" },
        { dataKey: "std", label: "Desvio Padrão" },
      ]}
      height={250}
    />
  );
};

export default AvgIPGPerIPChart;
