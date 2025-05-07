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
import { ChartBox } from '../components/ChartBox'

export const AdvancedCharts = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const handleChange =
    (key: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(prev => ({ ...prev, [key]: isExpanded }))
    }

  return (
    <ChartContainer>
      <ChartBox
        fullWidth
        title="Top 10 IPs Mais Ativos"
        description="Exibe os IPs que mais enviaram pacotes, útil para identificar os principais emissores de tráfego."
      >
        <ChartAccordion
          title="Gerar Gráfico"
          expanded={!!expanded['top-active-ips']}
          onChange={handleChange('top-active-ips')}
        >
          <TopActiveIPsChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox
        fullWidth
        title="IPG Médio e Desvio Padrão por IP"
        description="Mede a regularidade ou dispersão dos envios de pacotes por IP."
      >
        <ChartAccordion
          title="Gerar Gráfico"
          expanded={!!expanded['avg-ipg']}
          onChange={handleChange('avg-ipg')}
        >
          <AvgIPGPerIPChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox
        fullWidth
        title="Entropia da Distribuição de IPs"
        description="Calcula a aleatoriedade ou previsibilidade dos IPs de origem."
      >
        <ChartAccordion
          title="Gerar Gráfico"
          expanded={!!expanded['entropy']}
          onChange={handleChange('entropy')}
        >
          <IPEntropyChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox
        fullWidth
        title="Volume Total de Bytes por IP"
        description="Quantifica a quantidade de dados transmitidos por cada IP."
      >
        <ChartAccordion
          title="Gerar Gráfico"
          expanded={!!expanded['bytes-per-ip']}
          onChange={handleChange('bytes-per-ip')}
        >
          <BytesPerIPChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox
        fullWidth
        title="Variação de Tráfego no Tempo"
        description="Mostra flutuações do tráfego ao longo do tempo em janelas regulares."
      >
        <ChartAccordion
          title="Gerar Gráfico"
          expanded={!!expanded['traffic-over-time']}
          onChange={handleChange('traffic-over-time')}
        >
          <TrafficOverTimeChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox
        fullWidth
        title="Relação entre Tamanho dos Pacotes e Frequência"
        description="Avalia padrões de envio em função do tamanho dos pacotes."
      >
        <ChartAccordion
          title="Gerar Gráfico"
          expanded={!!expanded['packet-size-frequency']}
          onChange={handleChange('packet-size-frequency')}
        >
          <PacketSizeFrequencyChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox
        fullWidth
        title="Padrões Anômalos de Comunicação"
        description="Destaca comportamentos atípicos, como bursts ou longos períodos sem tráfego."
      >
        <ChartAccordion
          title="Gerar Gráfico"
          expanded={!!expanded['anomalies']}
          onChange={handleChange('anomalies')}
        >
          <AnomalyPatternsChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox
        fullWidth
        title="Mapa de Calor: IPs x Tempo x Volume"
        description="Representação densa da atividade por IP ao longo do tempo."
      >
        <ChartAccordion
          title="Gerar Gráfico"
          expanded={!!expanded['heatmap']}
          onChange={handleChange('heatmap')}
        >
          <TrafficHeatmap />
        </ChartAccordion>
      </ChartBox>
    </ChartContainer>
  )
}

export default AdvancedCharts
