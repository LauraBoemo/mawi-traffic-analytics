'use client'

import { useEffect, useState } from 'react'
import { BarChart } from '@mui/x-charts'
import { loadMssPerConnection } from './loadMssChart'
import { useMainValues } from '@/app/contexts/MainValuesContext'
import ChartLoad from '../../ChartLoad'

const MssChart = () => {
  const [data, setData] = useState<{ id: string; mss: number }[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadMssPerConnection(values.url_stats_completo, values.maxEntries)
      .then(setData)
      .finally(() => setLoading(false))
  }, [values.url_stats_completo, values.maxEntries])

  if (loading) return <ChartLoad />

  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: 'id', label: 'Conexão', scaleType: 'band' }]}
      series={[{ dataKey: 'mss', label: 'MSS' }]}
      height={250}
    />
  )
}

export default MssChart
