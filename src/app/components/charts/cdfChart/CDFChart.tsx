import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";
import { loadPacketSizeCDF } from "./loadCdfChart";
import ChartLoad from "../../ChartLoad";

const CDFChart = () => {
  const [data, setData] = useState<{ size: number; cdf: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadPacketSizeCDF()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ChartLoad />;
  }

  return (
    <LineChart
      dataset={data}
      xAxis={[{ dataKey: "size", label: "Tamanho (bytes)" }]}
      series={[{ dataKey: "cdf", label: "CDF" }]}
      height={300}
    />
  );
};

export default CDFChart;
