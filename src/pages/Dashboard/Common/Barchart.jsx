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
    name: item._id, // This is the product name
    value: Number(item.totalRequests)
  }));

  if (!chartData.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-slate-50 rounded-2xl border border-slate-100">
        <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">bar_chart</span>
        <p className="text-slate-500 font-medium">No request data available yet</p>
      </div>
    );
  }

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#ec4899', '#8b5cf6'];

  return (
    <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-800">Most Requested Assets</h3>
        <p className="text-sm text-slate-500">Top 5 items by employee requests</p>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar
              dataKey="value"
              shape={<TriangleBar />}
              label={{ position: 'top', fill: '#64748b', fontSize: 12 }}
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
    </div>
  );
}
