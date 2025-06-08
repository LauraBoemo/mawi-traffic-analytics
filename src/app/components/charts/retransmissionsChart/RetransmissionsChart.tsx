'use client'

import { useEffect, useState } from 'react'
import { BarChart } from '@mui/x-charts'
import { loadRetransmissions } from './loadRetransmissionsChart'
import { useMainValues } from '@/app/contexts/MainValuesContext'
import ChartLoad from '../../ChartLoad'

const RetransmissionsChart = () => {
  const [data, setData] = useState<{ ip: string; count: number }[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadRetransmissions(values.url_stats_metricas)
      .then(setData)
      .finally(() => setLoading(false))
  }, [values.url_stats_metricas])

  if (loading) return <ChartLoad />

  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: 'ip', label: 'IP', scaleType: 'band' }]}
      series={[{ dataKey: 'count', label: 'Retransmissões' }]}
      height={250}
    />
  )
}

export default RetransmissionsChart
