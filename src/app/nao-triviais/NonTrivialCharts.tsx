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

export const NonTrivialCharts = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const handleChange = (key: string) => (_: React.SyntheticEvent, isOpen: boolean) => {
    setExpanded(prev => ({ ...prev, [key]: isOpen }))
  }

  return (
    <ChartContainer>
      <ChartAccordion
        title="IPG (Inter-Packet Gap)"
        subTitle="Intervalo de tempo entre pacotes consecutivos, útil para detectar padrões de tráfego e anomalias."
        expanded={!!expanded['ipg']}
        onChange={handleChange('ipg')}
      >
        <IPGChart />
      </ChartAccordion>

      <ChartAccordion
        title="Tamanho Médio por IP"
        subTitle="Apresenta o tamanho médio dos pacotes enviados por cada endereço IP."
        expanded={!!expanded['avg-size']}
        onChange={handleChange('avg-size')}
      >
        <AvgPacketSizeChart />
      </ChartAccordion>

      <ChartAccordion
        title="Distribuição Temporal de Pacotes por IP"
        subTitle="Evolução do número de pacotes ao longo do tempo, segmentado por IP."
        expanded={!!expanded['temporal']}
        onChange={handleChange('temporal')}
      >
        <TemporalDistChart />
      </ChartAccordion>

      <ChartAccordion
        title="Burstness"
        subTitle="Visualiza picos de envio de pacotes em curtos períodos de tempo."
        expanded={!!expanded['burstness']}
        onChange={handleChange('burstness')}
      >
        <BurstnessChart />
      </ChartAccordion>

      <ChartAccordion
        title="Pacotes por Janela de Tempo"
        subTitle="Distribuição de pacotes em janelas de tempo fixas, útil para detectar sobrecarga de tráfego."
        expanded={!!expanded['window']}
        onChange={handleChange('window')}
      >
        <PacketsWindowChart />
      </ChartAccordion>

      <ChartAccordion
        title="CDF do Tamanho de Pacotes"
        subTitle="Distribuição acumulada do tamanho dos pacotes, indicando a proporção de pacotes abaixo de um certo tamanho."
        expanded={!!expanded['cdf']}
        onChange={handleChange('cdf')}
      >
        <CDFChart />
      </ChartAccordion>

      <ChartAccordion
        title="Skewness e Kurtosis"
        subTitle="Medidas estatísticas da distribuição do IPG: assimetria e achatamento."
        expanded={!!expanded['stats']}
        onChange={handleChange('stats')}
      >
        <StatsChart />
      </ChartAccordion>

      <ChartAccordion
        title="IPs com Destinos Únicos (Scan)"
        subTitle="Detecta IPs que tentam se comunicar com muitos destinos únicos — possível indício de varredura de rede."
        expanded={!!expanded['scan']}
        onChange={handleChange('scan')}
      >
        <HorizontalScanChart />
      </ChartAccordion>
    </ChartContainer>
  )
}

export default NonTrivialCharts
