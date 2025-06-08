'use client'

import { useEffect, useState } from 'react'
import { ScatterChart } from '@mui/x-charts'
import { loadRttScatter } from './loadRttScatterChart'
import { useMainValues } from '@/app/contexts/MainValuesContext'
import ChartLoad from '../../ChartLoad'

const RttScatterChart = () => {
  const [data, setData] = useState<{ idx: number; rtt: number }[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadRttScatter(values.url_stats_metricas)
      .then(setData)
      .finally(() => setLoading(false))
  }, [values.url_stats_metricas])

  if (loading) return <ChartLoad />

  return (
    <ScatterChart
      dataset={data}
      xAxis={[{ dataKey: 'idx', label: 'Conexão' }]}
      yAxis={[{ dataKey: 'rtt', label: 'RTT (s)' }]}
      height={250}
    />
  )
}

export default RttScatterChart
