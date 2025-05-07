'use client'

import React from 'react'

import TopActiveIPsChart from '../components/charts/topActiveIPsChart/TopActiveIPsChart'
import IPEntropyChart from '../components/charts/ipEntropyChart/IPEntropyChart'
import BytesPerIPChart from '../components/charts/bytesPerIPChart/BytesPerIPChart'
import TrafficOverTimeChart from '../components/charts/trafficOverTimeChart/TrafficOverTimeChart'
import PacketSizeFrequencyChart from '../components/charts/packetSizeFrequencyChart/PacketSizeFrequencyChart'
import AnomalyPatternsChart from '../components/charts/anomalyPatternsChart/AnomalyPatternsChart'
import AvgIPGPerIPChart from '../components/charts/avgIPGPerIPChart/AvgIPGPerIPChart'

import { ChartBox } from '../components/ChartBox'
import ChartContainer from '../components/ChartContainer'
import TrafficHeatmap from '../components/charts/trafficHeatmap/TrafficHeatmap'


export const AdvancedCharts = () => (
  <ChartContainer>
    <ChartBox fullWidth title="Top 10 IPs Mais Ativos" description="Exibe os IPs que mais enviaram pacotes, útil para identificar os principais emissores de tráfego.">
      <TopActiveIPsChart />
    </ChartBox>

    <ChartBox fullWidth title="IPG Médio e Desvio Padrão por IP" description="Mede a regularidade ou dispersão dos envios de pacotes por IP.">
      <AvgIPGPerIPChart />
    </ChartBox>

    <ChartBox fullWidth title="Entropia da Distribuição de IPs" description="Calcula a aleatoriedade ou previsibilidade dos IPs de origem.">
      <IPEntropyChart />
    </ChartBox>

    <ChartBox fullWidth title="Volume Total de Bytes por IP" description="Quantifica a quantidade de dados transmitidos por cada IP.">
      <BytesPerIPChart />
    </ChartBox>

    <ChartBox fullWidth title="Variação de Tráfego no Tempo" description="Mostra flutuações do tráfego ao longo do tempo em janelas regulares.">
      <TrafficOverTimeChart />
    </ChartBox>

    <ChartBox fullWidth title="Relação entre Tamanho dos Pacotes e Frequência" description="Avalia padrões de envio em função do tamanho dos pacotes.">
      <PacketSizeFrequencyChart />
    </ChartBox>

    <ChartBox fullWidth title="Padrões Anômalos de Comunicação" description="Destaca comportamentos atípicos, como bursts ou longos períodos sem tráfego.">
      <AnomalyPatternsChart />
    </ChartBox>

    {/* TODO: Descobrir um bom HeatMap */}
    <ChartBox title="Mapa de Calor: IPs x Tempo x Volume" description="Representação densa da atividade por IP ao longo do tempo.">
      <TrafficHeatmap />
    </ChartBox>
  </ChartContainer>
)

export default AdvancedCharts