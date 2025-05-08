'use client'

import React from 'react'
import { Stack, TextField } from '@mui/material'
import { useMainValues } from '../contexts/MainValuesContext'

export default function DescricoesGerais() {
  const { values, setValues } = useMainValues()

  const handleChange = (field: keyof typeof values) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = field === "url" ? event.target.value : Number(event.target.value)
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Stack spacing={2} width="100%">
      <TextField label="URL" value={values.url} onChange={handleChange('url')} fullWidth />
      <TextField label="maxPackets" type="number" value={values.maxPackets} onChange={handleChange('maxPackets')} />
      <TextField label="maxIPG (s)" type="number" value={values.maxIPG} onChange={handleChange('maxIPG')} />
      <TextField label="binSize (s)" type="number" value={values.binSize} onChange={handleChange('binSize')} />
      <TextField label="minPackets" type="number" value={values.minPackets} onChange={handleChange('minPackets')} />
      <TextField label="maxIPGPoints" type="number" value={values.maxIPGPoints} onChange={handleChange('maxIPGPoints')} />
      <TextField label="maxIPGValue (s)" type="number" value={values.maxIPGValue} onChange={handleChange('maxIPGValue')} />
      <TextField label="maxPoints" type="number" value={values.maxPoints} onChange={handleChange('maxPoints')} />
    </Stack>
  )
}
