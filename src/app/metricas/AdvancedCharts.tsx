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
import AccordionItem from '../components/ChartAccordion'

export const AdvancedCharts = () => {
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  return (
    <ChartContainer>
      <AccordionItem
        title="Top 10 IPs Mais Ativos"
        subTitle="Exibe os IPs que mais enviaram pacotes, útil para identificar os principais emissores de tráfego."
        expanded={expanded === 'top-ips'}
        onChange={handleChange('top-ips')}
      >
        <TopActiveIPsChart />
      </AccordionItem>

      <AccordionItem
        title="IPG Médio e Desvio Padrão por IP"
        subTitle="Mede a regularidade ou dispersão dos envios de pacotes por IP."
        expanded={expanded === 'ipg-per-ip'}
        onChange={handleChange('ipg-per-ip')}
      >
        <AvgIPGPerIPChart />
      </AccordionItem>

      <AccordionItem
        title="Entropia da Distribuição de IPs"
        subTitle="Calcula a aleatoriedade ou previsibilidade dos IPs de origem."
        expanded={expanded === 'entropy'}
        onChange={handleChange('entropy')}
      >
        <IPEntropyChart />
      </AccordionItem>

      <AccordionItem
        title="Volume Total de Bytes por IP"
        subTitle="Quantifica a quantidade de dados transmitidos por cada IP."
        expanded={expanded === 'bytes'}
        onChange={handleChange('bytes')}
      >
        <BytesPerIPChart />
      </AccordionItem>

      <AccordionItem
        title="Variação de Tráfego no Tempo"
        subTitle="Mostra flutuações do tráfego ao longo do tempo em janelas regulares."
        expanded={expanded === 'traffic-over-time'}
        onChange={handleChange('traffic-over-time')}
      >
        <TrafficOverTimeChart />
      </AccordionItem>

      <AccordionItem
        title="Relação entre Tamanho dos Pacotes e Frequência"
        subTitle="Avalia padrões de envio em função do tamanho dos pacotes."
        expanded={expanded === 'packet-size'}
        onChange={handleChange('packet-size')}
      >
        <PacketSizeFrequencyChart />
      </AccordionItem>

      <AccordionItem
        title="Padrões Anômalos de Comunicação"
        subTitle="Destaca comportamentos atípicos, como bursts ou longos períodos sem tráfego."
        expanded={expanded === 'anomaly'}
        onChange={handleChange('anomaly')}
      >
        <AnomalyPatternsChart />
      </AccordionItem>

      <AccordionItem
        title="Mapa de Calor: IPs x Tempo x Volume"
        subTitle="Representação densa da atividade por IP ao longo do tempo."
        expanded={expanded === 'heatmap'}
        onChange={handleChange('heatmap')}
      >
        <TrafficHeatmap />
      </AccordionItem>
    </ChartContainer>
  )
}

export default AdvancedCharts
