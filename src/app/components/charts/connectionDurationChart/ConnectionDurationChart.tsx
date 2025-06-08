'use client'

import { useEffect, useState } from 'react'
import { BarChart } from '@mui/x-charts'
import { loadConnectionDurations } from './loadConnectionDurationChart'
import { useMainValues } from '@/app/contexts/MainValuesContext'
import ChartLoad from '../../ChartLoad'

const ConnectionDurationChart = () => {
  const [data, setData] = useState<{ id: string; duration: number }[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadConnectionDurations(values.url_stats_metricas, values.maxEntries)
      .then(setData)
      .finally(() => setLoading(false))
  }, [values.url_stats_metricas, values.maxEntries])

  if (loading) return <ChartLoad />

  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: 'id', label: 'Conexão', scaleType: 'band' }]}
      series={[{ dataKey: 'duration', label: 'Duração (s)' }]}
      height={250}
    />
  )
}

export default ConnectionDurationChart
