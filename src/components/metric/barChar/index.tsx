import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box } from '@mui/material';
import { useChart } from 'components/chart';
import { BarCharData } from 'interfaces';

interface Props {
  title?: string
  subheader?: string
  chartData: BarCharData[]
  chartLabels: string[]
  suffix: string
};

export default function BarChar(props: Props) {
  const { title, subheader, chartLabels, chartData, suffix, ...other } = props;

  const chartOptions = useChart({
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y: number) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} ${suffix}`;
          }
          return y;
        },
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={chartData} options={chartOptions} height={280} />
      </Box>
    </Card>
  );
}
