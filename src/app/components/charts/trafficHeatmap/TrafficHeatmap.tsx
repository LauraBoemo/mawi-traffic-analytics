'use client'

import React from 'react'
import HeatMap from 'react-heatmap-grid'

const xLabels = ['0s', '1s', '2s', '3s', '4s']
const yLabels = ['192.168.0.1', '10.0.0.1', '172.16.0.5']
const data = [
  [5, 10, 15, 20, 25],
  [2, 3, 4, 8, 6],
  [0, 0, 10, 0, 1]
]

const TrafficHeatmap = () => (
  <div style={{ fontSize: '12px', width: '100%' }}>
    <HeatMap
      xLabels={xLabels}
      yLabels={yLabels}
      data={data}
      xLabelsLocation='bottom'
      xLabelWidth={60}
      yLabelWidth={100}
      squares
      height={30}
    />
  </div>
)

export default TrafficHeatmap
