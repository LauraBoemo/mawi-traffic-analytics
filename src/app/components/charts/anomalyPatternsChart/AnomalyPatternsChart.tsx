import React from 'react';
import { LineChart } from '@mui/x-charts';

const data = [
  { time: 0, packets: 5 },
  { time: 1, packets: 3 },
  { time: 2, packets: 60 },
  { time: 3, packets: 0 },
  { time: 4, packets: 0 },
  { time: 5, packets: 20 }
];

const AnomalyPatternsChart = () => (
  <LineChart
    dataset={data}
    xAxis={[{ dataKey: 'time', label: 'Tempo (s)' }]}
    series={[{ dataKey: 'packets', label: 'Pacotes' }]}
    height={250}
  />
);

export default AnomalyPatternsChart;