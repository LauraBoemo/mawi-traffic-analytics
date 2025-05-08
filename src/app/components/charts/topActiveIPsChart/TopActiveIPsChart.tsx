'use client'

import React, { useEffect, useState } from "react"
import { BarChart } from "@mui/x-charts"
import { loadTopActiveIPs } from "./loadTopActiveIPsChart"
import ChartLoad from "../../ChartLoad"
import { useMainValues } from "@/app/contexts/MainValuesContext"

const TopActiveIPsChart = () => {
  const [data, setData] = useState<{ ip: string; packets: number }[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadTopActiveIPs(values.url, values.maxPackets)
      .then(setData)
      .finally(() => setLoading(false))
  }, [values.url, values.maxPackets])

  if (loading) return <ChartLoad />

  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: 'ip', label: 'IP', scaleType: 'band' }]}
      series={[{ dataKey: 'packets', label: 'Pacotes' }]}
      height={250}
    />
  )
}

export default TopActiveIPsChart
