'use client'

import { useEffect, useState } from 'react'
import { BarChart } from '@mui/x-charts'
import { loadSegmentSizeDistribution } from './loadSegmentSizeChart'
import { useMainValues } from '@/app/contexts/MainValuesContext'
import ChartLoad from '../../ChartLoad'

const SegmentSizeChart = () => {
  const [data, setData] = useState<{ size: number; count: number }[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadSegmentSizeDistribution(values.url_stats_completo)
      .then(setData)
      .finally(() => setLoading(false))
  }, [values.url_stats_completo])

  if (loading) return <ChartLoad />

  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: 'size', label: 'Tamanho (bytes)', scaleType: 'band' }]}
      series={[{ dataKey: 'count', label: 'Quantidade' }]}
      height={250}
    />
  )
}

export default SegmentSizeChart
