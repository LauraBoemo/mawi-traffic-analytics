'use client'

import React from 'react'

import BurstnessChart from '../components/charts/burstnessChart/BurstnessChart'
import CDFChart from '../components/charts/cdfChart/CDFChart'
import HorizontalScanChart from '../components/charts/horizontalScanChart/HorizontalScanChart'
import IPGChart from '../components/charts/ipgChart/IPGChart'
import PacketsWindowChart from '../components/charts/packetsWindowChart/PacketWindowChart'
import StatsChart from '../components/charts/statsChart/StatsChart'
import TemporalDistChart from '../components/charts/temporalDistChart/TemporalDistChart'
import AvgPacketSizeChart from '../components/charts/avgPacketSizeChart/AVGPacketSizeChart'

import { ChartBox } from '../components/ChartBox'
import ChartContainer from '../components/ChartContainer'

export const NonTrivialCharts = () => (
  <ChartContainer>
    <ChartBox fullWidth title="IPG (Inter-Packet Gap)" description="Intervalo de tempo entre pacotes consecutivos, útil para detectar padrões de tráfego e anomalias.">
      <IPGChart />
    </ChartBox>

    <ChartBox fullWidth title="Tamanho Médio por IP" description="Apresenta o tamanho médio dos pacotes enviados por cada endereço IP.">
      <AvgPacketSizeChart />
    </ChartBox>

    <ChartBox fullWidth title="Distribuição Temporal de Pacotes por IP" description="Evolução do número de pacotes ao longo do tempo, segmentado por IP.">
      <TemporalDistChart />
    </ChartBox>

    <ChartBox fullWidth title="Burstness" description="Visualiza picos de envio de pacotes em curtos períodos de tempo.">
      <BurstnessChart />
    </ChartBox>

    <ChartBox fullWidth title="Pacotes por Janela de Tempo" description="Distribuição de pacotes em janelas de tempo fixas, útil para detectar sobrecarga de tráfego.">
      <PacketsWindowChart />
    </ChartBox>

    <ChartBox fullWidth title="CDF do Tamanho de Pacotes" description="Distribuição acumulada do tamanho dos pacotes, indicando a proporção de pacotes abaixo de um certo tamanho.">
      <CDFChart />
    </ChartBox>

    <ChartBox fullWidth title="Skewness e Kurtosis" description="Medidas estatísticas da distribuição do IPG: assimetria e achatamento.">
      <StatsChart />
    </ChartBox>

    <ChartBox fullWidth title="IPs com Destinos Únicos (Scan)" description="Detecta IPs que tentam se comunicar com muitos destinos únicos — possível indício de varredura de rede.">
      <HorizontalScanChart />
    </ChartBox>
  </ChartContainer>
)

export default NonTrivialCharts
