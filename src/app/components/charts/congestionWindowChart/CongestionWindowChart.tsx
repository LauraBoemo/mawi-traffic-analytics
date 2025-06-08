'use client'

import { useEffect, useState } from 'react'
import { LineChart } from '@mui/x-charts'
import { loadCongestionWindow } from './loadCongestionWindowChart'
import { useMainValues } from '@/app/contexts/MainValuesContext'
import ChartLoad from '../../ChartLoad'

const CongestionWindowChart = () => {
  const [data, setData] = useState<{ time: number; cwnd: number }[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadCongestionWindow(values.url_stats_completo)
      .then(setData)
      .finally(() => setLoading(false))
  }, [values.url_stats_completo])

  if (loading) return <ChartLoad />

  return (
    <LineChart
      dataset={data}
      xAxis={[{ dataKey: 'time', label: 'Tempo (s)' }]}
      series={[{ dataKey: 'cwnd', label: 'Janela' }]}
      height={250}
    />
  )
}

export default CongestionWindowChart
