'use client'

import { useEffect, useState } from "react"
import { LineChart } from "@mui/x-charts"
import { loadPacketSizeFrequency } from "./loadPacketSizeFrequencyChart"
import ChartLoad from "../../ChartLoad"
import { useMainValues } from "@/app/contexts/MainValuesContext"

const PacketSizeFrequencyChart = () => {
  const [data, setData] = useState<{ size: number; frequency: number }[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadPacketSizeFrequency(values.url, values.maxPackets, values.binSize)
      .then(setData)
      .finally(() => setLoading(false))
  }, [values.url, values.maxPackets, values.binSize])

  if (loading) return <ChartLoad />

  return (
    <LineChart
      dataset={data}
      xAxis={[{ dataKey: "size", label: "Tamanho do Pacote (bytes)" }]}
      series={[{ dataKey: "frequency", label: "Frequência" }]}
      height={250}
    />
  )
}

export default PacketSizeFrequencyChart
