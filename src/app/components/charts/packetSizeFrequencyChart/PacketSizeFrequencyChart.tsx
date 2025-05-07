import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";
import { loadPacketSizeFrequency } from "./packetSizeFrequencyChart";
import ChartLoad from "../../ChartLoad";

const PacketSizeFrequencyChart = () => {
  const [data, setData] = useState<{ size: number; frequency: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadPacketSizeFrequency()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ChartLoad />;

  return (
    <LineChart
      dataset={data}
      xAxis={[{ dataKey: "size", label: "Tamanho do Pacote (bytes)" }]}
      series={[{ dataKey: "frequency", label: "Frequência" }]}
      height={250}
    />
  );
};

export default PacketSizeFrequencyChart;
