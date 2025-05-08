'use client'

import { useEffect, useState } from "react"
import { LineChart } from "@mui/x-charts"
import { loadTrafficOverTime } from "./loadTrafficOverTimeChart"
import ChartLoad from "../../ChartLoad"
import { useMainValues } from "@/app/contexts/MainValuesContext"

const TrafficOverTimeChart = () => {
  const [data, setData] = useState<{ time: number; bytes: number }[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadTrafficOverTime(values.url, values.binSize, values.maxPackets)
      .then(setData)
      .finally(() => setLoading(false))
  }, [values.url, values.binSize, values.maxPackets])

  if (loading) return <ChartLoad />

  return (
    <LineChart
      dataset={data}
      xAxis={[{ dataKey: "time", label: "Tempo (s)" }]}
      series={[{ dataKey: "bytes", label: "Bytes Transmitidos" }]}
      height={250}
    />
  )
}

export default TrafficOverTimeChart
