import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";
import { loadTopActiveIPs } from "./topActiveIPsChart";
import ChartLoad from "../../ChartLoad";

const TopActiveIPsChart = () => {
  const [data, setData] = useState<{ ip: string; packets: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadTopActiveIPs()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ChartLoad />;

  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: 'ip', label: 'IP', scaleType: 'band' }]}
      series={[{ dataKey: 'packets', label: 'Pacotes' }]}
      height={250}
    />
  );
};

export default TopActiveIPsChart;
