'use client'

import { useEffect, useState } from "react"
import { LineChart } from "@mui/x-charts"
import { loadAvgIPGPerIP } from "./loadAvgIPGPerIPChart"
import ChartLoad from "../../ChartLoad"
import { useMainValues } from "@/app/contexts/MainValuesContext"

const AvgIPGPerIPChart = () => {
  const [data, setData] = useState<{ ip: string; avg: number; std: number }[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadAvgIPGPerIP(values.url, values.maxIPG, values.maxPackets)
      .then(setData)
      .finally(() => setLoading(false))
  }, [values.url, values.maxIPG, values.maxPackets])

  if (loading) return <ChartLoad />

  return (
    <LineChart
      dataset={data}
      xAxis={[{ dataKey: "ip", label: "IP", scaleType: "band" }]}
      series={[
        { dataKey: "avg", label: "IPG Médio" },
        { dataKey: "std", label: "Desvio Padrão" },
      ]}
      height={250}
    />
  )
}

export default AvgIPGPerIPChart
