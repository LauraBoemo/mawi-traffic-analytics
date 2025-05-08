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
        description="Este projeto realiza análises exploratórias sobre dados de tráfego de rede provenientes do repositório MAWI, permitindo a visualização de padrões, anomalias e métricas estatísticas extraídas de pacotes capturados. Feito para a cadeira de Redes de Computadores, UFSM, 2025/1."
        children={<></>}
      />
      <ChartBox title={"2. Defina os Parâmetros"} description={"Caso queira alterar os valores padrão, insira os dados desejados abaixo. Eles afetarão todas as tabelas deste site!"}>
        <ChartAccordion
          title="Parâmetros"
          expanded={expanded}
          onChange={(_, isExpanded) => setExpanded(isExpanded)}
        >
          <Stack spacing={2} p={1}>
            <TextField
              label="URL"
              value={values.url}
              onChange={handleChange('url')}
              fullWidth
            />
            <h6 style={{ marginTop: 0, fontWeight: 400 }}>
              Endereço do arquivo CSV. As colunas esperadas são: <code>timestamp</code>, <code>src_ip</code>, <code>dst_ip</code>, <code>protocol</code>, <code>length</code>.
            </h6>

            <TextField
              label="maxPackets"
              type="number"
              value={values.maxPackets}
              onChange={handleChange('maxPackets')}
            />
              <h6 style={{ marginTop: 0, fontWeight: 400 }}>
                Limite máximo de pacotes a serem processados por gráfico.
              </h6>

            <TextField
              label="maxIPG (s)"
              type="number"
              value={values.maxIPG}
              onChange={handleChange('maxIPG')}
            />
              <h6 style={{ marginTop: 0, fontWeight: 400 }}>
                Valor máximo permitido para o IPG (Inter-Packet Gap).
              </h6>

            <TextField
              label="binSize (s)"
              type="number"
              value={values.binSize}
              onChange={handleChange('binSize')}
            />
              <h6 style={{ marginTop: 0, fontWeight: 400 }}>
                Duração de cada janela de tempo para agrupamento de pacotes.
              </h6>

            <TextField
              label="minPackets"
              type="number"
              value={values.minPackets}
              onChange={handleChange('minPackets')}
            />
              <h6 style={{ marginTop: 0, fontWeight: 400 }}>
                Número mínimo de pacotes para considerar um IP nos cálculos.
              </h6>

            <TextField
              label="maxIPGPoints"
              type="number"
              value={values.maxIPGPoints}
              onChange={handleChange('maxIPGPoints')}
            />
              <h6 style={{ marginTop: 0, fontWeight: 400 }}>
                Número máximo de pontos ao exibir o gráfico de IPG (para desempenho).
              </h6>

            <TextField
              label="maxIPGValue (s)"
              type="number"
              value={values.maxIPGValue}
              onChange={handleChange('maxIPGValue')}
            />
              <h6 style={{ marginTop: 0, fontWeight: 400 }}>
                Limite superior de IPG a ser considerado ao filtrar valores extremos.
              </h6>

            <TextField
              label="maxPoints"
              type="number"
              value={values.maxPoints}
              onChange={handleChange('maxPoints')}
            />
              <h6 style={{ marginTop: 0, fontWeight: 400 }}>
                Quantidade máxima de pontos exibidos em gráficos cumulativos e estatísticos.
              </h6>
          </Stack>
        </ChartAccordion>
      </ChartBox>
      <ChartBox
        title="3. Visualize os Dados"
        description="Para explorar os dados processados, acesse as abas 'Dados Não-Triviais' ou 'Métricas'. Nessas seções, você encontrará os gráficos gerados pelo projeto, acompanhados de suas descrições e do código responsável por cada visualização."
        children={<></>}
      />

    </Stack>
  )
}
