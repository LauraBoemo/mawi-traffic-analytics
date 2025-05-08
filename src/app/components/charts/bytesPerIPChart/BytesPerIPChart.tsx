'use client'

import { useEffect, useState } from "react"
import { BarChart } from "@mui/x-charts"
import { loadBytesPerIP } from "./loadBytesPerIPChart"
import ChartLoad from "../../ChartLoad"
import { useMainValues } from "@/app/contexts/MainValuesContext"

const BytesPerIPChart = () => {
  const [data, setData] = useState<{ ip: string; bytes: number }[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadBytesPerIP(values.url, values.maxPackets)
      .then(setData)
      .finally(() => setLoading(false))
  }, [values.url, values.maxPackets])

  if (loading) return <ChartLoad />

  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: "ip", label: "IP", scaleType: "band" }]}
      series={[{ dataKey: "bytes", label: "Bytes" }]}
      height={250}
    />
  )
}

export default BytesPerIPChart
