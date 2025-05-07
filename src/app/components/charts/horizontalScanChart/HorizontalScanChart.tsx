import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";
import { loadHorizontalScanData } from "./loadHorizontalScanChart";
import ChartLoad from "../../ChartLoad";

const HorizontalScanChart = () => {
  const [data, setData] = useState<{ ip: string; destinations: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadHorizontalScanData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ChartLoad />;
  }

  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: "ip", label: "IP", scaleType: "band" }]}
      series={[{ dataKey: "destinations", label: "Destinos únicos" }]}
      height={300}
    />
  );
};

export default HorizontalScanChart;
