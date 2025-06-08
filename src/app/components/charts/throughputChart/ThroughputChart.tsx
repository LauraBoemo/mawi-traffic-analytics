'use client'

import { useEffect, useState } from 'react'
import { BarChart } from '@mui/x-charts'
import { loadThroughput } from './loadThroughputChart'
import { useMainValues } from '@/app/contexts/MainValuesContext'
import ChartLoad from '../../ChartLoad'

const ThroughputChart = () => {
  const [data, setData] = useState<{ id: string; value: number }[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadThroughput(values.url_stats_metricas)
      .then(setData)
      .finally(() => setLoading(false))
  }, [values.url_stats_metricas])

  if (loading) return <ChartLoad />

  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: 'id', label: 'Conexão', scaleType: 'band' }]}
      series={[{ dataKey: 'value', label: 'Bytes/s' }]}
      height={250}
    />
  )
}

export default ThroughputChart
