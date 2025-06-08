'use client'

import React, { useState } from 'react'

import ConnectionDurationChart from '../components/charts/connectionDurationChart/ConnectionDurationChart'
import RttChart from '../components/charts/rttChart/RttChart'
import RetransmissionsChart from '../components/charts/retransmissionsChart/RetransmissionsChart'
import ThroughputChart from '../components/charts/throughputChart/ThroughputChart'
import CongestionWindowChart from '../components/charts/congestionWindowChart/CongestionWindowChart'
import HandshakeTimeChart from '../components/charts/handshakeTimeChart/HandshakeTimeChart'
import SegmentSizeChart from '../components/charts/segmentSizeChart/SegmentSizeChart'
import MssChart from '../components/charts/mssChart/MssChart'
import ElephantFlowsChart from '../components/charts/elephantFlowsChart/ElephantFlowsChart'
import MicroburstsChart from '../components/charts/microburstsChart/MicroburstsChart'
import TopApplicationsChart from '../components/charts/topApplicationsChart/TopApplicationsChart'

import ChartContainer from '../components/ChartContainer'
import ChartAccordion from '../components/ChartAccordion'
import { ChartBox } from '../components/ChartBox'
import ChartFunctionDescription from '../components/ChartFunctionDescription'

import { code as loadConnectionDurationCode } from '../components/charts/connectionDurationChart/loadConnectionDurationChart.code'
import { code as loadRttCode } from '../components/charts/rttChart/loadRttChart.code'
import { code as loadRetransmissionsCode } from '../components/charts/retransmissionsChart/loadRetransmissionsChart.code'
import { code as loadThroughputCode } from '../components/charts/throughputChart/loadThroughputChart.code'
import { code as loadCongestionWindowCode } from '../components/charts/congestionWindowChart/loadCongestionWindowChart.code'
import { code as loadHandshakeTimeCode } from '../components/charts/handshakeTimeChart/loadHandshakeTimeChart.code'
import { code as loadSegmentSizeCode } from '../components/charts/segmentSizeChart/loadSegmentSizeChart.code'
import { code as loadMssCode } from '../components/charts/mssChart/loadMssChart.code'
import { code as loadElephantFlowsCode } from '../components/charts/elephantFlowsChart/loadElephantFlowsChart.code'
import { code as loadMicroburstsCode } from '../components/charts/microburstsChart/loadMicroburstsChart.code'
import { code as loadTopApplicationsCode } from '../components/charts/topApplicationsChart/loadTopApplicationsChart.code'

export const AdvancedCharts = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const handleChange = (key: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(prev => ({ ...prev, [key]: isExpanded }))
  }

  return (
    <ChartContainer>
      <ChartBox title="Duração das Conexões">
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-duracao']} onChange={handleChange('code-duracao')}>
          <ChartFunctionDescription>{loadConnectionDurationCode.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['duracao']} onChange={handleChange('duracao')}>
          <ConnectionDurationChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox title="RTT Estimado por Conexão">
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-rtt']} onChange={handleChange('code-rtt')}>
          <ChartFunctionDescription>{loadRttCode.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['rtt']} onChange={handleChange('rtt')}>
          <RttChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox title="Número de Retransmissões por IP">
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-retrans']} onChange={handleChange('code-retrans')}>
          <ChartFunctionDescription>{loadRetransmissionsCode.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['retrans']} onChange={handleChange('retrans')}>
          <RetransmissionsChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox title="Throughput Médio por Conexão">
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-throughput']} onChange={handleChange('code-throughput')}>
          <ChartFunctionDescription>{loadThroughputCode.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['throughput']} onChange={handleChange('throughput')}>
          <ThroughputChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox title="Evolução da Janela de Congestionamento">
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-cwnd']} onChange={handleChange('code-cwnd')}>
          <ChartFunctionDescription>{loadCongestionWindowCode.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['cwnd']} onChange={handleChange('cwnd')}>
          <CongestionWindowChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox title="Tempo de Handshake">
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-handshake']} onChange={handleChange('code-handshake')}>
          <ChartFunctionDescription>{loadHandshakeTimeCode.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['handshake']} onChange={handleChange('handshake')}>
          <HandshakeTimeChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox title="Distribuição dos Tamanhos dos Segmentos">
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-segments']} onChange={handleChange('code-segments')}>
          <ChartFunctionDescription>{loadSegmentSizeCode.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['segments']} onChange={handleChange('segments')}>
          <SegmentSizeChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox title="MSS por Conexão">
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-mss']} onChange={handleChange('code-mss')}>
          <ChartFunctionDescription>{loadMssCode.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['mss']} onChange={handleChange('mss')}>
          <MssChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox title="Fluxos Elefantes">
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-elephants']} onChange={handleChange('code-elephants')}>
          <ChartFunctionDescription>{loadElephantFlowsCode.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['elephants']} onChange={handleChange('elephants')}>
          <ElephantFlowsChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox title="Microbursts">
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-micro']} onChange={handleChange('code-micro')}>
          <ChartFunctionDescription>{loadMicroburstsCode.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['micro']} onChange={handleChange('micro')}>
          <MicroburstsChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox title="Top Aplicações por Porta">
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-apps']} onChange={handleChange('code-apps')}>
          <ChartFunctionDescription>{loadTopApplicationsCode.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['apps']} onChange={handleChange('apps')}>
          <TopApplicationsChart />
        </ChartAccordion>
      </ChartBox>
    </ChartContainer>
  )
}

export default AdvancedCharts
