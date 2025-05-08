'use client'

import { useEffect, useState } from "react"
import { LineChart } from "@mui/x-charts"
import { loadBurstnessData } from "./loadBurstnessChart"
import ChartLoad from "../../ChartLoad"
import { useMainValues } from "@/app/contexts/MainValuesContext"

const BurstnessChart = () => {
  const [data, setData] = useState<{ time: number; packets: number }[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadBurstnessData(values.url, values.binSize, values.maxPoints)
      .then(setData)
      .finally(() => setLoading(false))
  }, [values.url, values.binSize, values.maxPoints])

  if (loading) {
    return <ChartLoad />
  }

  return (
    <LineChart
      dataset={data}
      xAxis={[{ dataKey: "time", label: "Tempo" }]}
      series={[{ dataKey: "packets", label: "Pacotes" }]}
      height={300}
    />
  )
}

export default BurstnessChart
