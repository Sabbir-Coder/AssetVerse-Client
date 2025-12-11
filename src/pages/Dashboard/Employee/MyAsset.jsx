import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const MyAsset = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { data: myAssets, isLoading, isError } = useQuery({
        queryKey: ['myAssets', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/users/${user?.email}/assets`);
            return response.data;
        }
    })

    if (isLoading) return <LoadingSpinner />;

    if (isError) return <div>Error loading assets</div>;

    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-600 ">All Requested Assets</h2>
            <table className="table-auto border-collapse border w-full">
                <thead>
                    <tr>
                        <th className="border border-gray-300 text-gray-500 px-4 py-2">Asset Image</th>
                        <th className="border border-gray-300 text-gray-500 px-4 py-2">Asset Name</th>
                        <th className="border border-gray-300 text-gray-500 px-4 py-2">Asset Type</th>
                        <th className="border border-gray-300 text-gray-500 px-4 py-2">Company</th>
                        <th className="border border-gray-300 text-gray-500 px-4 py-2">Request Date</th>
                        <th className="border border-gray-300 text-gray-500 px-4 py-2">Approval Date</th>
                        <th className="border border-gray-300 text-gray-500 px-4 py-2">Status</th>
                        <th className="border border-gray-300 text-gray-500 px-4 py-2">Action</th>
                        <th className="border border-gray-300 text-gray-500 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {myAssets.length === 0 ? <tr><td colSpan="8" className="text-center py-4 border border-gray-300 text-gray-400">No assets found</td></tr> : myAssets?.map((req,i) => (
                        <tr key={i} className='text-sm'>
                            <td className="border border-gray-300 px-4 py-2">
                                <img src={req.assetImage} alt={req.productName} className="w-12 h-12 object-cover rounded" />
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{req.productName}</td>
                            <td className="border border-gray-300 px-4 py-2">{req.productType}</td>
                            <td className="border border-gray-300 px-4 py-2">{req.companyName}</td>
                            <td className="border border-gray-300 px-4 py-2">{new Date(req.requestDate).toLocaleDateString()}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {req.approvalDate ? new Date(req.approvalDate).toLocaleDateString() : "-"}
                            </td>
                            <td
                                className={`border border-gray-300 px-4 py-2 font-bold ${req.status === "Rejected" ? "text-red-600" : "text-green-600"
                                    }`}
                            >
                                {req.status === "Rejected" ? "Rejected" : "Approved"}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {req.status === 'Approved' && req.productType === 'Returnable' && (
                                    <button className="bg-blue-600 cursor-pointer text-white px-2 py-1 rounded">
                                        Return
                                    </button>
                                )}
                            </td>
                            <td className='text-center border border-gray-300
                            '><button className='btn btn-primary'>Print</button></td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default MyAsset;