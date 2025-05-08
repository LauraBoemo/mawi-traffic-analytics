'use client'

import { useEffect, useState } from "react"
import { BarChart } from "@mui/x-charts"
import { loadIPEntropyByWindow } from "./loadIpEntropyChart"
import ChartLoad from "../../ChartLoad"
import { useMainValues } from "@/app/contexts/MainValuesContext"

const IPEntropyChart = () => {
  const [data, setData] = useState<{ window: string; entropy: number }[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadIPEntropyByWindow(values.url, values.binSize, values.maxPackets)
      .then(setData)
      .finally(() => setLoading(false))
  }, [values.url, values.binSize, values.maxPackets])

  if (loading) return <ChartLoad />

  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: "window", label: "Janela", scaleType: "band" }]}
      series={[{ dataKey: "entropy", label: "Entropia" }]}
      height={250}
    />
  )
}

export default IPEntropyChart
