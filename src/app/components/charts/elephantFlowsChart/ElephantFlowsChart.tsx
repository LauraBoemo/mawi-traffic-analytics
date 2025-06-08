'use client'

import { useEffect, useState } from 'react'
import { BarChart } from '@mui/x-charts'
import { loadElephantFlows } from './loadElephantFlowsChart'
import { useMainValues } from '@/app/contexts/MainValuesContext'
import ChartLoad from '../../ChartLoad'

const ElephantFlowsChart = () => {
  const [data, setData] = useState<{ id: string; bytes: number }[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadElephantFlows(values.url_stats_metricas)
      .then(setData)
      .finally(() => setLoading(false))
  }, [values.url_stats_metricas])

  if (loading) return <ChartLoad />

  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: 'id', label: 'Conexão', scaleType: 'band' }]}
      series={[{ dataKey: 'bytes', label: 'Bytes' }]}
      height={250}
    />
  )
}

export default ElephantFlowsChart
