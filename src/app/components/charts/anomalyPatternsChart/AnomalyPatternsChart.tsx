import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";
import { loadAnomalyPatterns } from "./anomalyPatternsChart";
import ChartLoad from "../../ChartLoad";

const AnomalyPatternsChart = () => {
  const [data, setData] = useState<{ time: number; packets: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadAnomalyPatterns()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ChartLoad />;

  return (
    <LineChart
      dataset={data}
      xAxis={[{ dataKey: "time", label: "Tempo (s)" }]}
      series={[{ dataKey: "packets", label: "Pacotes" }]}
      height={250}
    />
  );
};

export default AnomalyPatternsChart;
