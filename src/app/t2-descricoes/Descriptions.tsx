'use client'

import React, { useState } from 'react'
import { Stack, TextField } from '@mui/material'
import { useMainValues } from '../contexts/MainValuesContext'
import ChartAccordion from '../components/ChartAccordion'
import { ChartBox } from '../components/ChartBox'

export default function DescricoesGerais() {
  const { values, setValues } = useMainValues()
  const [expanded, setExpanded] = useState(false)

  const handleChange = (field: keyof typeof values) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = field === 'url' ? event.target.value : Number(event.target.value)
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Stack spacing={2} width="100%">
      <ChartBox
        title="1. Conheça o Projeto"
        description="Este projeto realiza análises exploratórias sobre dados de tráfego de rede provenientes do repositório MAWI, focando exclusivamente em pacotes TCP, permitindo a visualização de padrões, anomalias e métricas estatísticas extraídas de pacotes capturados. Feito para a cadeira de Redes de Computadores, UFSM, 2025/1."
      />
      <ChartBox title={"2. Defina os Parâmetros"} description={"Caso queira alterar os valores padrão, insira os dados desejados abaixo. Eles afetarão todas as tabelas deste site!"}>
        <ChartAccordion
          title="Parâmetros"
          expanded={expanded}
          onChange={(_, isExpanded) => setExpanded(isExpanded)}
        >
          <Stack spacing={2} p={1}>
            <TextField
              label="URL Stats Metricas"
              value={values.url_stats_metricas}
              onChange={handleChange('url_stats_metricas')}
              fullWidth
            />
            <TextField
              label="URL Stats Completo"
              value={values.url_stats_completo}
              onChange={handleChange('url_stats_completo')}
              fullWidth
            />
            <TextField
              label="maxEntries"
              type="number"
              value={values.maxEntries}
              onChange={handleChange('maxEntries')}
            />
            <h6 style={{ marginTop: 0, fontWeight: 400 }}>
              Limite máximo de registros a serem carregados por gráfico.
            </h6>
          </Stack>
        </ChartAccordion>
      </ChartBox>
      <ChartBox
        title="3. Visualize os Dados"
        description="Para explorar os dados processados, acesse as abas 'Gráficos' ou 'Métricas'. Nessas seções, você encontrará os gráficos gerados pelo projeto, acompanhados de suas descrições e do código responsável por cada visualização."
      />

    </Stack>
  )
}
