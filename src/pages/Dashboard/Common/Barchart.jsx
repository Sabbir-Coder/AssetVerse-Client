import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SmallLoader from '../../../components/Shared/SmallLoader';

// Curved bar path (same as Recharts example)
const getPath = (x, y, width, height) => {
  return `
    M${x},${y + height}
    C${x + width / 3},${y + height}
     ${x + width / 2},${y + height / 3}
     ${x + width / 2},${y}
    C${x + width / 2},${y + height / 3}
     ${x + (2 * width) / 3},${y + height}
     ${x + width},${y + height}
    Z
  `;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;
  return (
    <path
      d={getPath(x, y, width, height)}
      stroke="none"
      fill={fill}
    />
  );
};

export default function MostRequestedAssetsChart() {
  const axiosSecure = useAxiosSecure();

  const { data: mostRequested = [], isLoading } = useQuery({
    queryKey: ['most-requested-assets'],
    queryFn: async () => {
      const res = await axiosSecure.get('/most-requested-assets');
      return res.data;
    }
  });

  if (isLoading) return <SmallLoader />;

  const chartData = mostRequested.map(item => ({
    name: item._id,
    value: Number(item.totalRequests)
  }));

  if (!chartData.length) {
    return <p className="text-center">No request data available</p>;
  }

  const COLORS =  ['#0088FE', '#00C49F', '#FFBB28', 'black','#ffbfcb']

  return (
    <div style={{ width: '100%', height: 420 }}>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} width="auto" />
          <Tooltip />

          <Bar
            dataKey="value"
            shape={TriangleBar}
            label={{ position: 'top' }}
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
