'use client'

import { useEffect, useState } from "react"
import { BarChart } from "@mui/x-charts"
import { loadAvgPacketSizeByIP } from "./loadAvgPacketSizeChart"
import ChartLoad from "../../ChartLoad"
import { useMainValues } from "@/app/contexts/MainValuesContext"

const AvgPacketSizeChart = () => {
  const [data, setData] = useState<{ ip: string; size: number }[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadAvgPacketSizeByIP(values.url, values.maxPackets, values.minPackets)
      .then(setData)
      .finally(() => setLoading(false))
  }, [values.url, values.maxPackets, values.minPackets])

  if (loading) {
    return <ChartLoad />
  }

  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: "ip", label: "IP", scaleType: "band" }]}
      series={[{ dataKey: "size", label: "Tamanho médio (bytes)" }]}
      height={300}
    />
  )
}

export default AvgPacketSizeChart
