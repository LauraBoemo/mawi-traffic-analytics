import { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts";
import { loadAndProcessIPGData } from "./loadIpgChart";
import ChartLoad from "../../ChartLoad";

const IPGChart = () => {
  const [data, setData] = useState<{ x: number; y: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadAndProcessIPGData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ChartLoad />;
  }
  
  return (
    <LineChart
      dataset={data}
      xAxis={[{ dataKey: "x", label: "Pacote" }]}
      series={[{ dataKey: "y", label: "IPG (s)" }]}
      height={300}
    />
  );
};

export default IPGChart;
