import { Pie, PieChart, Tooltip, Legend, Cell } from 'recharts';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import SmallLoader from '../../../components/Shared/SmallLoader';

export default function TwoLevelPieChart() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: assets = [], isLoading } = useQuery({
        queryKey: ['assets', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assets?email=${user?.email}`);
            return res.data;
        }
    });


    const COLORS = ['#2563EB', '#F97316'];
    // Aggregate asset types
    const returnableCount = assets.filter(
        asset => asset.productType === 'Returnable'
    ).length;

    const nonReturnableCount = assets.filter(
        asset => asset.productType === 'Non-Returnable'
    ).length;

    const pieData = [
        { name: 'Returnable', value: returnableCount },
        { name: 'Non-Returnable', value: nonReturnableCount },
    ];
    if (isLoading) return <SmallLoader />;

    return (
        <PieChart width={'100%'} height={400}>

            <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
            >
                {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    );
}
