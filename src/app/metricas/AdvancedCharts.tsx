'use client'

import React, { useState } from 'react'

import TopActiveIPsChart from '../components/charts/topActiveIPsChart/TopActiveIPsChart'
import IPEntropyChart from '../components/charts/ipEntropyChart/IPEntropyChart'
import BytesPerIPChart from '../components/charts/bytesPerIPChart/BytesPerIPChart'
import TrafficOverTimeChart from '../components/charts/trafficOverTimeChart/TrafficOverTimeChart'
import PacketSizeFrequencyChart from '../components/charts/packetSizeFrequencyChart/PacketSizeFrequencyChart'
import AnomalyPatternsChart from '../components/charts/anomalyPatternsChart/AnomalyPatternsChart'
import AvgIPGPerIPChart from '../components/charts/avgIPGPerIPChart/AvgIPGPerIPChart'

import ChartContainer from '../components/ChartContainer'
import ChartAccordion from '../components/ChartAccordion'
import { ChartBox } from '../components/ChartBox'
import ChartFunctionDescription from '../components/ChartFunctionDescription'

import { loadBytesPerIP } from '../components/charts/bytesPerIPChart/loadBytesPerIPChart'
import { loadTrafficOverTime } from '../components/charts/trafficOverTimeChart/loadTrafficOverTimeChart'
import { loadPacketSizeFrequency } from '../components/charts/packetSizeFrequencyChart/loadPacketSizeFrequencyChart'
import { loadAvgIPGPerIP } from '../components/charts/avgIPGPerIPChart/loadAvgIPGPerIPChart'
import { loadTopActiveIPs } from '../components/charts/topActiveIPsChart/loadTopActiveIPsChart'
import { loadIPEntropyByWindow } from '../components/charts/ipEntropyChart/loadIpEntropyChart'
import { loadAnomalyPatterns } from '../components/charts/anomalyPatternsChart/loadAnomalyPatternsChart'

export const AdvancedCharts = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const handleChange =
    (key: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(prev => ({ ...prev, [key]: isExpanded }))
    }

  return (
    <ChartContainer>
      <ChartBox title="Top 10 IPs Mais Ativos" description="Exibe os IPs que mais enviaram pacotes, útil para identificar os principais emissores de tráfego.">
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-top-ips']} onChange={handleChange('code-top-ips')}>
          <ChartFunctionDescription>{loadTopActiveIPs.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['top-ips']} onChange={handleChange('top-ips')}>
          <TopActiveIPsChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox title="IPG Médio e Desvio Padrão por IP" description="Mede a regularidade ou dispersão dos envios de pacotes por IP.">
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-avg-ipg']} onChange={handleChange('code-avg-ipg')}>
          <ChartFunctionDescription>{loadAvgIPGPerIP.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['avg-ipg']} onChange={handleChange('avg-ipg')}>
          <AvgIPGPerIPChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox title="Entropia da Distribuição de IPs" description="Calcula a aleatoriedade ou previsibilidade dos IPs de origem.">
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-entropy']} onChange={handleChange('code-entropy')}>
          <ChartFunctionDescription>{loadIPEntropyByWindow.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['entropy']} onChange={handleChange('entropy')}>
          <IPEntropyChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox title="Volume Total de Bytes por IP" description="Quantifica a quantidade de dados transmitidos por cada IP.">
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-bytes']} onChange={handleChange('code-bytes')}>
          <ChartFunctionDescription>{loadBytesPerIP.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['bytes']} onChange={handleChange('bytes')}>
          <BytesPerIPChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox title="Variação de Tráfego no Tempo" description="Mostra flutuações do tráfego ao longo do tempo em janelas regulares.">
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-traffic']} onChange={handleChange('code-traffic')}>
          <ChartFunctionDescription>{loadTrafficOverTime.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['traffic']} onChange={handleChange('traffic')}>
          <TrafficOverTimeChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox title="Relação entre Tamanho dos Pacotes e Frequência" description="Avalia padrões de envio em função do tamanho dos pacotes.">
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-packets']} onChange={handleChange('code-packets')}>
          <ChartFunctionDescription>{loadPacketSizeFrequency.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['packets']} onChange={handleChange('packets')}>
          <PacketSizeFrequencyChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox title="Padrões Anômalos de Comunicação" description="Destaca comportamentos atípicos, como bursts ou longos períodos sem tráfego.">
        <ChartAccordion title="Ver Código" expanded={!!expanded['code-anomalies']} onChange={handleChange('code-anomalies')}>
          <ChartFunctionDescription>{loadAnomalyPatterns.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['anomalies']} onChange={handleChange('anomalies')}>
          <AnomalyPatternsChart />
        </ChartAccordion>
      </ChartBox>

      <ChartBox title="Mapa de Calor: IPs x Tempo x Volume" description="Representação densa da atividade por IP ao longo do tempo.">
        Em construção!
        {/* <ChartAccordion title="Ver Código" expanded={!!expanded['code-heatmap']} onChange={handleChange('code-heatmap')}>
          <ChartFunctionDescription>{loadTrafficHeatmap.toString()}</ChartFunctionDescription>
        </ChartAccordion>
        <ChartAccordion title="Gerar Gráfico" expanded={!!expanded['heatmap']} onChange={handleChange('heatmap')}>
          <TrafficHeatmap />
        </ChartAccordion> */}
      </ChartBox>
    </ChartContainer>
  )
}

export default AdvancedCharts
