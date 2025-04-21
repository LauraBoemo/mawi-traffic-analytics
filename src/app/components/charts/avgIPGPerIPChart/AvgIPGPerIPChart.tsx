import React from 'react';
import { LineChart } from '@mui/x-charts';

const data = [
  { ip: '192.168.0.1', avg: 20, std: 5 },
  { ip: '10.0.0.1', avg: 25, std: 6 },
  { ip: '172.16.0.5', avg: 18, std: 4 },
  { ip: '192.168.1.7', avg: 30, std: 7 }
];

const AvgIPGPerIPChart = () => (
  <LineChart
    dataset={data}
    xAxis={[{ dataKey: 'ip', label: 'IP', scaleType: 'band' }]}
    series={[
      { dataKey: 'avg', label: 'IPG Médio' },
      { dataKey: 'std', label: 'Desvio Padrão' }
    ]}
    height={250}
  />
);

export default AvgIPGPerIPChart;