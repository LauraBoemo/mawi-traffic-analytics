'use client'

import { useEffect, useState } from "react"
import { BarChart } from "@mui/x-charts"
import { loadIPGStats } from "./loadStatsChart"
import ChartLoad from "../../ChartLoad"
import { useMainValues } from "@/app/contexts/MainValuesContext"

const StatsChart = () => {
  const [data, setData] = useState<{ metric: string; value: number }[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadIPGStats(values.url, values.maxIPG)
      .then(setData)
      .finally(() => setLoading(false))
  }, [values.url, values.maxIPG])

  if (loading) {
    return <ChartLoad />
  }

  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: "metric", scaleType: "band" }]}
      series={[{ dataKey: "value", label: "Valor" }]}
      height={300}
    />
  )
}

export default StatsChart
