import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const TimelineChart = () => {
  const labels = [
    'Jul 2019', 'Oct 2019', 'Jan 2020', 'Apr 2020', 'Jul 2020', 'Oct 2020',
    'Jan 2021', 'Apr 2021', 'Jul 2021', 'Oct 2021', 'Jan 2022', 'Apr 2022',
    'Jul 2022', 'Oct 2022', 'Jan 2023', 'Apr 2023', 'Jul 2023', 'Oct 2023',
    'Jan 2024', 'Apr 2024', 'Jul 2024', 'Oct 2024',
  ];

  const altsSignal = [
    0.8, 0.7, 0.65, 0.5, 0.6, 0.7, 0.8, 0.7, 0.6, 0.55, 0.45, 0.4,
    0.5, 0.6, 0.7, 0.8, 0.75, 0.6, 0.55, 0.45, 0.4, 0.35,
  ];
  const btcPrice = [10085, 9150, 9350, 8658, 11351, 13780, 33141, 57750, 41490, 61318, 38483, 37640, 23336, 20489, 23134, 29228, 29231, 34654, 42894, 66245, 100000, 95000];

  const buyHouse = [
    0.9, 0.88, 0.85, 0.87, 0.89, 0.91, 0.92, 0.93, 0.94, 0.9, 0.88, 0.87,
    0.85, 0.86, 0.88, 0.9, 0.92, 0.94, 0.95, 0.91, 0.89, 0.9,
  ];
  const sellHouse = [
    0.1, 0.12, 0.15, 0.13, 0.11, 0.09, 0.08, 0.07, 0.06, 0.1, 0.12, 0.13,
    0.15, 0.14, 0.12, 0.1, 0.08, 0.06, 0.05, 0.09, 0.11, 0.1,
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Alts Signal',
        data: altsSignal,
        borderColor: 'yellow',
        backgroundColor: 'rgba(255, 223, 0, 0.2)',
        borderWidth: 2,
        yAxisID: 'y',
        tension: 0.3,
      },
      {
        label: 'BTC Price',
        data: btcPrice,
        borderColor: 'gray',
        backgroundColor: 'rgba(128, 128, 128, 0.2)',
        borderWidth: 2,
        yAxisID: 'y1',
        tension: 0.3,
      },
      {
        label: 'Buy a House',
        data: buyHouse,
        borderColor: 'red',
        borderWidth: 2,
        borderDash: [10, 5],
        yAxisID: 'y',
      },
      {
        label: 'Sell Your House',
        data: sellHouse,
        borderColor: 'green',
        borderWidth: 2,
        borderDash: [10, 5],
        yAxisID: 'y',
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to resize based on container
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          title: (context: { label: any }[]) => `Date: ${context[0].label}`,
          label: (tooltipItem: any) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
        },
      },
      title: {
        display: true,
        text: 'Alts Buy Signal Timeline',
      },
    },
    scales: {
      x: {
        grid: { display: true },
        title: {
          display: true,
          text: 'Timeline',
        },
      },
      y: {
        type: 'linear' as const,
        position: 'left' as const,
        min: 0,
        max: 1,
        title: {
          display: true,
          text: 'Signal Strength',
        },
      },
      y1: {
        type: 'linear',
        position: 'right' as const,
        min: 0,
        max: 120000,
        grid: { drawOnChartArea: false },
        title: {
          display: true,
          text: 'BTC Price (USD)',
        },
      },
    },
  };

  return (
    <div style={{ height: '100vh' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default TimelineChart;
