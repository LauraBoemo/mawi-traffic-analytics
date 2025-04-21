import React from 'react';
import { BarChart } from '@mui/x-charts';

const data = [
  { ip: '192.168.0.1', bytes: 102400 },
  { ip: '10.0.0.1', bytes: 87500 },
  { ip: '172.16.0.5', bytes: 93200 }
];

const BytesPerIPChart = () => (
  <BarChart
    dataset={data}
    xAxis={[{ dataKey: 'ip', label: 'IP', scaleType: 'band' }]}
    series={[{ dataKey: 'bytes', label: 'Bytes' }]}
    height={250}
  />
);

export default BytesPerIPChart;