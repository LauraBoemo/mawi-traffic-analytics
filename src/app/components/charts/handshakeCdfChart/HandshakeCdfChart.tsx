'use client'

import { useEffect, useState } from 'react'
import { LineChart } from '@mui/x-charts'
import { loadHandshakeCdf } from './loadHandshakeCdfChart'
import { useMainValues } from '@/app/contexts/MainValuesContext'
import ChartLoad from '../../ChartLoad'

const HandshakeCdfChart = () => {
  const [data, setData] = useState<{ time: number; cdf: number }[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadHandshakeCdf(values.url_stats_metricas)
      .then(setData)
      .finally(() => setLoading(false))
  }, [values.url_stats_metricas])

  if (loading) return <ChartLoad />

  return (
    <LineChart
      dataset={data}
      xAxis={[{ dataKey: 'time', label: 'Tempo (s)' }]}
      series={[{ dataKey: 'cdf', label: 'CDF' }]}
      height={250}
    />
  )
}

export default HandshakeCdfChart
