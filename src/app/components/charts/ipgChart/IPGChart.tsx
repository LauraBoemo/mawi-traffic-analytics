'use client'

import { useState, useEffect } from "react"
import { LineChart } from "@mui/x-charts"
import { loadAndProcessIPGData } from "./loadIpgChart"
import ChartLoad from "../../ChartLoad"
import { useMainValues } from "@/app/contexts/MainValuesContext"

const IPGChart = () => {
  const [data, setData] = useState<{ x: number; y: number }[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadAndProcessIPGData(values.url, values.maxIPG, values.maxPoints)
      .then(setData)
      .finally(() => setLoading(false))
  }, [values.url, values.maxIPG, values.maxPoints])

  if (loading) {
    return <ChartLoad />
  }

  return (
    <LineChart
      dataset={data}
      xAxis={[{ dataKey: "x", label: "Pacote" }]}
      series={[{ dataKey: "y", label: "IPG (s)" }]}
      height={300}
    />
  )
}

export default IPGChart
