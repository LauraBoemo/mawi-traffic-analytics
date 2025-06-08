'use client'

import { useEffect, useState } from 'react'
import { BarChart } from '@mui/x-charts'
import { loadConnectionLengthComparison } from './loadConnectionLengthChart'
import { useMainValues } from '@/app/contexts/MainValuesContext'
import ChartLoad from '../../ChartLoad'

const ConnectionLengthChart = () => {
  const [data, setData] = useState<{ type: string; count: number }[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadConnectionLengthComparison(values.url_stats_metricas)
      .then(setData)
      .finally(() => setLoading(false))
  }, [values.url_stats_metricas])

  if (loading) return <ChartLoad />

  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: 'type', scaleType: 'band', label: 'Tipo' }]}
      series={[{ dataKey: 'count', label: 'Conexões' }]}
      height={250}
    />
  )
}

export default ConnectionLengthChart
