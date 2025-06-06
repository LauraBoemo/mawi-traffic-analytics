'use client'

import React, { useState } from 'react'

import BurstnessChart from '../components/charts/burstnessChart/BurstnessChart'
import CDFChart from '../components/charts/cdfChart/CDFChart'
import HorizontalScanChart from '../components/charts/horizontalScanChart/HorizontalScanChart'
import IPGChart from '../components/charts/ipgChart/IPGChart'
import PacketsWindowChart from '../components/charts/packetsWindowChart/PacketWindowChart'
import StatsChart from '../components/charts/statsChart/StatsChart'
import TemporalDistChart from '../components/charts/temporalDistChart/TemporalDistChart'
import AvgPacketSizeChart from '../components/charts/avgPacketSizeChart/AVGPacketSizeChart'

import ChartContainer from '../components/ChartContainer'
import ChartAccordion from '../components/ChartAccordion'
import { ChartBox } from '../components/ChartBox'
import ChartFunctionDescription from '../components/ChartFunctionDescription'

import { code as loadAndProcessIPGData } from '../components/charts/ipgChart/loadIpgChart.code'
import { code as loadAvgPacketSizeByIP } from '../components/charts/avgPacketSizeChart/loadAvgPacketSizeChart.code'
import { code as loadPacketsPerWindow } from '../components/charts/packetsWindowChart/loadPacketsWindowChart.code'
import { code as loadTemporalDistributionByIP } from '../components/charts/temporalDistChart/loadTemporalDistChart.code'
import { code as loadBurstnessData } from '../components/charts/burstnessChart/loadBurstnessChart.code'
import { code as loadPacketSizeCDF } from '../components/charts/cdfChart/loadCdfChart.code'
import { code as loadIPGStats } from '../components/charts/statsChart/loadStatsChart.code'
import { code as loadHorizontalScanData } from '../components/charts/horizontalScanChart/loadHorizontalScanChart.code'

export const NonTrivialCharts = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const handleChange = (key: string) => (_: React.SyntheticEvent, isOpen: boolean) => {
    setExpanded(prev => ({ ...prev, [key]: isOpen }))
  }

  return (
    <ChartContainer>
      <ChartBox
        fullWidth
        title="IPG (Inter-Packet Gap)"
        description="Intervalo de tempo entre pacotes consecutivos, útil para detectar padrões de tráfego e anomalias."
      >
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-ipg']} onChange={handleChange('code-ipg')}>
          <ChartFunctionDescription>{loadAndProcessIPGData.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['ipg']} onChange={handleChange('ipg')}>
          <IPGChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox
        fullWidth
        title="Tamanho Médio por IP"
        description="Apresenta o tamanho médio dos pacotes enviados por cada endereço IP."
      >
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-avg-size']} onChange={handleChange('code-avg-size')}>
          <ChartFunctionDescription>{loadAvgPacketSizeByIP.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['avg-size']} onChange={handleChange('avg-size')}>
          <AvgPacketSizeChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox
        fullWidth
        title="Distribuição Temporal de Pacotes por IP"
        description="Evolução do número de pacotes ao longo do tempo, segmentado por IP."
      >
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-temporal']} onChange={handleChange('code-temporal')}>
          <ChartFunctionDescription>{loadTemporalDistributionByIP.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['temporal']} onChange={handleChange('temporal')}>
          <TemporalDistChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox
        fullWidth
        title="Burstness"
        description="Visualiza picos de envio de pacotes em curtos períodos de tempo."
      >
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-burstness']} onChange={handleChange('code-burstness')}>
          <ChartFunctionDescription>{loadBurstnessData.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['burstness']} onChange={handleChange('burstness')}>
          <BurstnessChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox
        fullWidth
        title="Pacotes por Janela de Tempo"
        description="Distribuição de pacotes em janelas de tempo fixas, útil para detectar sobrecarga de tráfego."
      >
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-window']} onChange={handleChange('code-window')}>
          <ChartFunctionDescription>{loadPacketsPerWindow.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['window']} onChange={handleChange('window')}>
          <PacketsWindowChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox
        fullWidth
        title="CDF do Tamanho de Pacotes"
        description="Distribuição acumulada do tamanho dos pacotes, indicando a proporção de pacotes abaixo de um certo tamanho."
      >
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-cdf']} onChange={handleChange('code-cdf')}>
          <ChartFunctionDescription>{loadPacketSizeCDF.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['cdf']} onChange={handleChange('cdf')}>
          <CDFChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox
        fullWidth
        title="Skewness e Kurtosis"
        description="Medidas estatísticas da distribuição do IPG: assimetria e achatamento."
      >
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-stats']} onChange={handleChange('code-stats')}>
          <ChartFunctionDescription>{loadIPGStats.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['stats']} onChange={handleChange('stats')}>
          <StatsChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox
        fullWidth
        title="IPs com Destinos Únicos (Scan)"
        description="Detecta IPs que tentam se comunicar com muitos destinos únicos — possível indício de varredura de rede."
      >
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-scan']} onChange={handleChange('code-scan')}>
          <ChartFunctionDescription>{loadHorizontalScanData.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['scan']} onChange={handleChange('scan')}>
          <HorizontalScanChart />
        </ChartAccordion>
      </ChartBox>
    </ChartContainer>
  )
}

export default NonTrivialCharts
