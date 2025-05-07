import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";
import { loadAvgPacketSizeByIP } from "./loadAvgPacketSizeChart";
import ChartLoad from "../../ChartLoad";

const AvgPacketSizeChart = () => {
  const [data, setData] = useState<{ ip: string; size: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadAvgPacketSizeByIP()
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
      series={[{ dataKey: "size", label: "Tamanho médio (bytes)" }]}
      height={300}
    />
  );
};

export default AvgPacketSizeChart;
