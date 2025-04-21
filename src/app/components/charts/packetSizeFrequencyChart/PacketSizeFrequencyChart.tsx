import React from 'react';
import { LineChart } from '@mui/x-charts';

const data = [
  { size: 64, frequency: 300 },
  { size: 128, frequency: 450 },
  { size: 256, frequency: 400 },
  { size: 512, frequency: 300 },
  { size: 1024, frequency: 150 }
];

const PacketSizeFrequencyChart = () => (
  <LineChart
    dataset={data}
    xAxis={[{ dataKey: 'size', label: 'Tamanho do Pacote (bytes)' }]}
    series={[{ dataKey: 'frequency', label: 'Frequência' }]}
    height={250}
  />
);

export default PacketSizeFrequencyChart;