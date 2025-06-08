'use client'

import React, { useState } from 'react'

import CongestionWindowChart from '../components/charts/congestionWindowChart/CongestionWindowChart'
import RttScatterChart from '../components/charts/rttScatterChart/RttScatterChart'
import HandshakeCdfChart from '../components/charts/handshakeCdfChart/HandshakeCdfChart'
import RateHistogramChart from '../components/charts/retransmissionRateHistogram/RateHistogramChart'
import ConnectionLengthChart from '../components/charts/connectionLengthChart/ConnectionLengthChart'

import ChartContainer from '../components/ChartContainer'
import ChartAccordion from '../components/ChartAccordion'
import { ChartBox } from '../components/ChartBox'
import ChartFunctionDescription from '../components/ChartFunctionDescription'

import { code as loadCongestionWindowCode } from '../components/charts/congestionWindowChart/loadCongestionWindowChart.code'
import { code as loadRttScatterCode } from '../components/charts/rttScatterChart/loadRttScatterChart.code'
import { code as loadHandshakeCdfCode } from '../components/charts/handshakeCdfChart/loadHandshakeCdfChart.code'
import { code as loadRetransmissionRateCode } from '../components/charts/retransmissionRateHistogram/loadRetransmissionRateHistogram.code'
import { code as loadConnectionLengthCode } from '../components/charts/connectionLengthChart/loadConnectionLengthChart.code'

export const NonTrivialCharts = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const handleChange = (key: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(prev => ({ ...prev, [key]: isExpanded }))
  }

  return (
    <ChartContainer>
      <ChartBox
        title="Janela de Congestionamento"
        description="Apresenta a evolução da janela de congestionamento ao longo do tempo, refletindo o controle de fluxo TCP."
      >
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-cwnd']} onChange={handleChange('code-cwnd')}>
          <ChartFunctionDescription>{loadCongestionWindowCode.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['cwnd']} onChange={handleChange('cwnd')}>
          <CongestionWindowChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox
        title="RTT por Conexão (Dispersion)"
        description="Mostra a dispersão do RTT estimado para cada conexão, destacando variações de latência."
      >
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-rtt']} onChange={handleChange('code-rtt')}>
          <ChartFunctionDescription>{loadRttScatterCode.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['rtt']} onChange={handleChange('rtt')}>
          <RttScatterChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox
        title="CDF do Tempo de Estabelecimento"
        description="Exibe a função de distribuição acumulada do tempo de handshake das conexões."
      >
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-handshake']} onChange={handleChange('code-handshake')}>
          <ChartFunctionDescription>{loadHandshakeCdfCode.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['handshake']} onChange={handleChange('handshake')}>
          <HandshakeCdfChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox
        title="Histograma da Taxa de Retransmissões"
        description="Distribuição das taxas de retransmissões observadas nas conexões."
      >
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-retrans']} onChange={handleChange('code-retrans')}>
          <ChartFunctionDescription>{loadRetransmissionRateCode.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['retrans']} onChange={handleChange('retrans')}>
          <RateHistogramChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox
        title="Conexões Curtas vs Longas"
        description="Compara a quantidade de conexões de curta e longa duração no tráfego analisado."
      >
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-length']} onChange={handleChange('code-length')}>
          <ChartFunctionDescription>{loadConnectionLengthCode.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['length']} onChange={handleChange('length')}>
          <ConnectionLengthChart />
        </ChartAccordion>
      </ChartBox>
    </ChartContainer>
  )
}

export default NonTrivialCharts
