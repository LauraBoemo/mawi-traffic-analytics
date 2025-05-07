import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";
import { loadTemporalDistributionByIP } from "./temporalDistChart";
import ChartLoad from "../../ChartLoad";

const TemporalDistChart = () => {
  const [data, setData] = useState<Record<string, number>[]>([]);
  const [ips, setIps] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadTemporalDistributionByIP()
      .then((res) => {
        setData(res);

        // Extrai os IPs únicos
        const ipSet = new Set<string>();
        res.forEach((row) =>
          Object.keys(row).forEach((key) => {
            if (key !== "time") ipSet.add(key);
          })
        );
        setIps(Array.from(ipSet));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ChartLoad />;

  return (
    <LineChart
      dataset={data}
      xAxis={[{ dataKey: "time", label: "Tempo (s)" }]}
      series={ips.map((ip) => ({ dataKey: ip, label: ip }))}
      height={300}
    />
  );
};

export default TemporalDistChart;
