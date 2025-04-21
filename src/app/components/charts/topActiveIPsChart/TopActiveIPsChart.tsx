import React from 'react';
import { BarChart } from '@mui/x-charts';

const data = [
  { ip: '192.168.0.1', packets: 1200 },
  { ip: '10.0.0.1', packets: 1150 },
  { ip: '172.16.0.5', packets: 980 },
  { ip: '192.168.1.7', packets: 920 },
  { ip: '10.1.0.2', packets: 870 },
  { ip: '172.16.1.8', packets: 800 },
  { ip: '192.168.100.100', packets: 750 },
  { ip: '10.2.3.4', packets: 690 },
  { ip: '172.20.10.5', packets: 650 },
  { ip: '192.168.5.10', packets: 610 }
];

const TopActiveIPsChart = () => (
  <BarChart
    dataset={data}
    xAxis={[{ dataKey: 'ip', label: 'IP', scaleType: 'band' }]}
    series={[{ dataKey: 'packets', label: 'Pacotes' }]}
    height={250}
  />
);

export default TopActiveIPsChart;