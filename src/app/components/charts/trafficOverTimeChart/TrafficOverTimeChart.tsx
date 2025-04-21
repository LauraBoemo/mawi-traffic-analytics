import React from 'react';
import { LineChart } from '@mui/x-charts';

const data = [
  { time: 0, bytes: 1200 },
  { time: 1, bytes: 1600 },
  { time: 2, bytes: 1300 },
  { time: 3, bytes: 1900 }
];

const TrafficOverTimeChart = () => (
  <LineChart
    dataset={data}
    xAxis={[{ dataKey: 'time', label: 'Tempo (s)' }]}
    series={[{ dataKey: 'bytes', label: 'Bytes Transmitidos' }]}
    height={250}
  />
);

export default TrafficOverTimeChart;