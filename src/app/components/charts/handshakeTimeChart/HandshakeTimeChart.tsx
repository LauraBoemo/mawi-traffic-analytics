'use client'

import { useEffect, useState } from 'react'
import { BarChart } from '@mui/x-charts'
import { loadHandshakeTimes } from './loadHandshakeTimeChart'
import { useMainValues } from '@/app/contexts/MainValuesContext'
import ChartLoad from '../../ChartLoad'

const HandshakeTimeChart = () => {
  const [data, setData] = useState<{ idx: number; time: number }[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadHandshakeTimes(values.url_stats_metricas, values.maxEntries)
      .then(setData)
      .finally(() => setLoading(false))
  }, [values.url_stats_metricas, values.maxEntries])

  if (loading) return <ChartLoad />

  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: 'idx', label: 'Conexão', scaleType: 'band' }]}
      series={[{ dataKey: 'time', label: 'Tempo (s)' }]}
      height={250}
    />
  )
}

export default HandshakeTimeChart
