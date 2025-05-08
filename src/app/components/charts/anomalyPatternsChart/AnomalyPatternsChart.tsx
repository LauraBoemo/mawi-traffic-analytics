'use client'

import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";
import { loadAnomalyPatterns } from "./loadAnomalyPatternsChart";
import ChartLoad from "../../ChartLoad";
import { useMainValues } from "@/app/contexts/MainValuesContext";

const AnomalyPatternsChart = () => {
  const [data, setData] = useState<{ time: number; packets: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const { values } = useMainValues();

  useEffect(() => {
    setLoading(true);
    loadAnomalyPatterns({
      url: values.url,
      binSize: values.binSize,
      maxPackets: values.maxPackets,
    })
      .then(setData)
      .finally(() => setLoading(false));
  }, [values.url, values.binSize, values.maxPackets]);

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
