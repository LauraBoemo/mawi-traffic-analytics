'use client'

import { useEffect, useState } from "react"
import { LineChart } from "@mui/x-charts"
import { loadTemporalDistributionByIP } from "./loadTemporalDistChart"
import ChartLoad from "../../ChartLoad"
import { useMainValues } from "@/app/contexts/MainValuesContext"

const TemporalDistChart = () => {
  const [data, setData] = useState<Record<string, number>[]>([])
  const [ips, setIps] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadTemporalDistributionByIP(values.url, values.binSize, values.maxPackets)
      .then((res) => {
        setData(res)

        const ipSet = new Set<string>()
        res.forEach((row) => {
          Object.keys(row).forEach((key) => {
            if (key !== "time") ipSet.add(key)
          })
        })

        setIps(Array.from(ipSet))
      })
      .finally(() => setLoading(false))
  }, [values.url, values.binSize, values.maxPackets])

  if (loading) return <ChartLoad />

  return (
    <LineChart
      dataset={data}
      xAxis={[{ dataKey: "time", label: "Tempo (s)" }]}
      series={ips.map((ip) => ({ dataKey: ip, label: ip }))}
      height={300}
    />
  )
}

export default TemporalDistChart
