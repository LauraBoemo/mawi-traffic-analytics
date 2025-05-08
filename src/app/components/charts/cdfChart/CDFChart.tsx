'use client'

import { useEffect, useState } from "react"
import { LineChart } from "@mui/x-charts"
import { loadPacketSizeCDF } from "./loadCdfChart"
import ChartLoad from "../../ChartLoad"
import { useMainValues } from "@/app/contexts/MainValuesContext"

const CDFChart = () => {
  const [data, setData] = useState<{ size: number; cdf: number }[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadPacketSizeCDF(values.url, values.maxPoints)
      .then(setData)
      .finally(() => setLoading(false))
  }, [values.url, values.maxPoints])

  if (loading) {
    return <ChartLoad />
  }

  return (
    <LineChart
      dataset={data}
      xAxis={[{ dataKey: "size", label: "Tamanho (bytes)" }]}
      series={[{ dataKey: "cdf", label: "CDF" }]}
      height={300}
    />
  )
}

export default CDFChart
