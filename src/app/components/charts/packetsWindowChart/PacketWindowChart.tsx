'use client'

import { useEffect, useState } from "react"
import { BarChart } from "@mui/x-charts"
import { loadPacketsPerWindow } from "./loadPacketsWindowChart"
import ChartLoad from "../../ChartLoad"
import { useMainValues } from "@/app/contexts/MainValuesContext"

const PacketsWindowChart = () => {
  const [data, setData] = useState<{ window: string; count: number }[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadPacketsPerWindow(values.url, values.binSize, values.maxPoints)
      .then(setData)
      .finally(() => setLoading(false))
  }, [values.url, values.binSize, values.maxPoints])

  if (loading) {
    return <ChartLoad />
  }

  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: "window", label: "Janela", scaleType: "band" }]}
      series={[{ dataKey: "count", label: "Pacotes" }]}
      height={300}
    />
  )
}

export default PacketsWindowChart
