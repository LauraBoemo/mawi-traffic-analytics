'use client'

import { useEffect, useState } from 'react'
import { LineChart } from '@mui/x-charts'
import { loadMicrobursts } from './loadMicroburstsChart'
import { useMainValues } from '@/app/contexts/MainValuesContext'
import ChartLoad from '../../ChartLoad'

const MicroburstsChart = () => {
  const [data, setData] = useState<{ time: number; packets: number }[]>([])
  const [loading, setLoading] = useState(true)
  const { values } = useMainValues()

  useEffect(() => {
    setLoading(true)
    loadMicrobursts(values.url_stats_metricas)
      .then(setData)
      .finally(() => setLoading(false))
  }, [values.url_stats_metricas])

  if (loading) return <ChartLoad />

  return (
    <LineChart
      dataset={data}
      xAxis={[{ dataKey: 'time', label: 'Tempo (s)' }]}
      series={[{ dataKey: 'packets', label: 'Pacotes' }]}
      height={250}
    />
  )
}

export default MicroburstsChart
