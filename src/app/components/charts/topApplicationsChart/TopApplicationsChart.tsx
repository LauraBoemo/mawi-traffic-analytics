'use client'

import { useEffect, useState } from 'react'
import { BarChart } from '@mui/x-charts'
import { loadTopApplications } from './loadTopApplicationsChart'
import { useMainValues } from '@/app/contexts/MainValuesContext'
import ChartLoad from '../../ChartLoad'

const TopApplicationsChart = () => {
  const [data, setData] = useState<{ port: string; count: number }[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadTopApplications(values.url_stats_metricas, values.maxEntries)
      .then(setData)
      .finally(() => setLoading(false))
  }, [values.url_stats_metricas, values.maxEntries])

  if (loading) return <ChartLoad />

  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: 'port', label: 'Porta', scaleType: 'band' }]}
      series={[{ dataKey: 'count', label: 'Pacotes' }]}
      height={250}
    />
  )
}

export default TopApplicationsChart
