'use client'

import { useEffect, useState } from 'react'
import { BarChart } from '@mui/x-charts'
import { loadRetransmissionRateHistogram } from './loadRetransmissionRateHistogram'
import { useMainValues } from '@/app/contexts/MainValuesContext'
import ChartLoad from '../../ChartLoad'

const RateHistogramChart = () => {
  const [data, setData] = useState<{ bin: string; count: number }[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadRetransmissionRateHistogram(values.url_stats_metricas, values.maxEntries)
      .then(setData)
      .finally(() => setLoading(false))
  }, [values.url_stats_metricas, values.maxEntries])

  if (loading) return <ChartLoad />

  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: 'bin', scaleType: 'band', label: 'Taxa' }]}
      series={[{ dataKey: 'count', label: 'Conexões' }]}
      height={250}
    />
  )
}

export default RateHistogramChart
