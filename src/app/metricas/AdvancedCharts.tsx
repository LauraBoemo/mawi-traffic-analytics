'use client'

import React, { useState } from 'react'

import TopActiveIPsChart from '../components/charts/topActiveIPsChart/TopActiveIPsChart'
import IPEntropyChart from '../components/charts/ipEntropyChart/IPEntropyChart'
import BytesPerIPChart from '../components/charts/bytesPerIPChart/BytesPerIPChart'
import TrafficOverTimeChart from '../components/charts/trafficOverTimeChart/TrafficOverTimeChart'
import PacketSizeFrequencyChart from '../components/charts/packetSizeFrequencyChart/PacketSizeFrequencyChart'
import AnomalyPatternsChart from '../components/charts/anomalyPatternsChart/AnomalyPatternsChart'
import AvgIPGPerIPChart from '../components/charts/avgIPGPerIPChart/AvgIPGPerIPChart'
import TrafficHeatmap from '../components/charts/trafficHeatmap/TrafficHeatmap'

import ChartContainer from '../components/ChartContainer'
import ChartAccordion from '../components/ChartAccordion'

export const AdvancedCharts = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const handleChange =
    (key: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(prev => ({ ...prev, [key]: isExpanded }))
    }

  return (
    <ChartContainer>
      <ChartAccordion
        title="Top 10 IPs Mais Ativos"
        subTitle="Exibe os IPs que mais enviaram pacotes, útil para identificar os principais emissores de tráfego."
        expanded={!!expanded['top-active-ips']}
        onChange={handleChange('top-active-ips')}
      >
        <TopActiveIPsChart />
      </ChartAccordion>

      <ChartAccordion
        title="IPG Médio e Desvio Padrão por IP"
        subTitle="Mede a regularidade ou dispersão dos envios de pacotes por IP."
        expanded={!!expanded['avg-ipg']}
        onChange={handleChange('avg-ipg')}
      >
        <AvgIPGPerIPChart />
      </ChartAccordion>

      <ChartAccordion
        title="Entropia da Distribuição de IPs"
        subTitle="Calcula a aleatoriedade ou previsibilidade dos IPs de origem."
        expanded={!!expanded['entropy']}
        onChange={handleChange('entropy')}
      >
        <IPEntropyChart />
      </ChartAccordion>

      <ChartAccordion
        title="Volume Total de Bytes por IP"
        subTitle="Quantifica a quantidade de dados transmitidos por cada IP."
        expanded={!!expanded['bytes-per-ip']}
        onChange={handleChange('bytes-per-ip')}
      >
        <BytesPerIPChart />
      </ChartAccordion>

      <ChartAccordion
        title="Variação de Tráfego no Tempo"
        subTitle="Mostra flutuações do tráfego ao longo do tempo em janelas regulares."
        expanded={!!expanded['traffic-over-time']}
        onChange={handleChange('traffic-over-time')}
      >
        <TrafficOverTimeChart />
      </ChartAccordion>

      <ChartAccordion
        title="Relação entre Tamanho dos Pacotes e Frequência"
        subTitle="Avalia padrões de envio em função do tamanho dos pacotes."
        expanded={!!expanded['packet-size-frequency']}
        onChange={handleChange('packet-size-frequency')}
      >
        <PacketSizeFrequencyChart />
      </ChartAccordion>

      <ChartAccordion
        title="Padrões Anômalos de Comunicação"
        subTitle="Destaca comportamentos atípicos, como bursts ou longos períodos sem tráfego."
        expanded={!!expanded['anomalies']}
        onChange={handleChange('anomalies')}
      >
        <AnomalyPatternsChart />
      </ChartAccordion>

      <ChartAccordion
        title="Mapa de Calor: IPs x Tempo x Volume"
        subTitle="Representação densa da atividade por IP ao longo do tempo."
        expanded={!!expanded['heatmap']}
        onChange={handleChange('heatmap')}
      >
        <TrafficHeatmap />
      </ChartAccordion>
    </ChartContainer>
  )
}

export default AdvancedCharts
