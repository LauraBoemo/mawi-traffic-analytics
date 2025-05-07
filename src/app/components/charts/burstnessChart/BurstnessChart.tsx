import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";
import { loadBurstnessData } from "./burstnessChart";
import ChartLoad from "../../ChartLoad";

const BurstnessChart = () => {
  const [data, setData] = useState<{ time: number; packets: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadBurstnessData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ChartLoad />;
  }

  return (
    <LineChart
      dataset={data}
      xAxis={[{ dataKey: "time", label: "Tempo" }]}
      series={[{ dataKey: "packets", label: "Pacotes" }]}
      height={300}
    />
  );
};

export default BurstnessChart;
