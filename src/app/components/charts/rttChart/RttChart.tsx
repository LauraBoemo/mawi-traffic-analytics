'use client'

import { useEffect, useState } from 'react'
import { BarChart } from '@mui/x-charts'
import { loadRttPerConnection } from './loadRttChart'
import { useMainValues } from '@/app/contexts/MainValuesContext'
import ChartLoad from '../../ChartLoad'

const RttChart = () => {
  const [data, setData] = useState<{ id: string; rtt: number }[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadRttPerConnection(values.url_stats_metricas, values.maxEntries)
      .then(setData)
      .finally(() => setLoading(false))
  }, [values.url_stats_metricas, values.maxEntries])

  if (loading) return <ChartLoad />

  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: 'id', label: 'Conexão', scaleType: 'band' }]}
      series={[{ dataKey: 'rtt', label: 'RTT (s)' }]}
      height={250}
    />
  )
}

export default RttChart
