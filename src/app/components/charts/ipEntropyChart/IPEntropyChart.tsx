import React from 'react';
import { BarChart } from '@mui/x-charts';

const data = [
  { window: '00:00-00:10', entropy: 2.3 },
  { window: '00:10-00:20', entropy: 3.1 },
  { window: '00:20-00:30', entropy: 2.8 }
];

const IPEntropyChart = () => (
  <BarChart
    dataset={data}
    xAxis={[{ dataKey: 'window', label: 'Janela', scaleType: 'band' }]}
    series={[{ dataKey: 'entropy', label: 'Entropia' }]}
    height={250}
  />
);

export default IPEntropyChart;