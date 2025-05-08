'use client'

import { useEffect, useState } from "react"
import { BarChart } from "@mui/x-charts"
import { loadHorizontalScanData } from "./loadHorizontalScanChart"
import ChartLoad from "../../ChartLoad"
import { useMainValues } from "@/app/contexts/MainValuesContext"

const HorizontalScanChart = () => {
  const [data, setData] = useState<{ ip: string; destinations: number }[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadHorizontalScanData(values.url, values.maxPackets)
      .then(setData)
      .finally(() => setLoading(false))
  }, [values.url, values.maxPackets])

  if (loading) {
    return <ChartLoad />
  }

  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: "ip", label: "IP", scaleType: "band" }]}
      series={[{ dataKey: "destinations", label: "Destinos únicos" }]}
      height={300}
    />
  )
}

export default HorizontalScanChart
