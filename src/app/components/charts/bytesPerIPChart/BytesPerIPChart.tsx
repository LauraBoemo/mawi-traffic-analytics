import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";
import { loadBytesPerIP } from "./loadBytesPerIPChart";
import ChartLoad from "../../ChartLoad";

const BytesPerIPChart = () => {
  const [data, setData] = useState<{ ip: string; bytes: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadBytesPerIP()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ChartLoad />;

  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: "ip", label: "IP", scaleType: "band" }]}
      series={[{ dataKey: "bytes", label: "Bytes" }]}
      height={250}
    />
  );
};

export default BytesPerIPChart;
