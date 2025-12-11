import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const AllRequests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch all requests for this HR / company
    const { data: requests, isLoading, refetch } = useQuery({
        queryKey: ['assetRequests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/asset-requests?HrEmail=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    // Approve mutation
    const approveMutation = useMutation({
        mutationFn: async (requestId) => {
            return axiosSecure.patch(`/asset-requests/${requestId}/approve`);
        },
        onSuccess: () => {
            toast.success('Request approved');
            refetch();
        },
        onError: () => toast.error('Error approving request')
    });

    // Reject mutation
    const rejectMutation = useMutation({
        mutationFn: async (requestId) => {
            return axiosSecure.patch(`/asset-requests/${requestId}/reject`);
        },
        onSuccess: () => {
            toast.success('Request rejected');
            refetch();
        },
        onError: () => toast.error('Error rejecting request')
    });

    const handleApprove = (request) => {
        Swal.fire({
            title: `Approve ${request.productName}?`,
            text: `This will deduct quantity from the asset.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Approve',
        }).then((result) => {
            if (result.isConfirmed) {
                approveMutation.mutate(request._id);
            }
        });
    };

    const handleReject = (request) => {
        rejectMutation.mutate(request._id);
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-2xl font-bold mb-4">All Asset Requests</h2>
            <table className="table-auto border-collapse border border-gray-300 w-full">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Employee</th>
                        <th className="border border-gray-300 px-4 py-2">Asset</th>
                        <th className="border border-gray-300 px-4 py-2">Type</th>
                        <th className="border border-gray-300 px-4 py-2">Date</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
       
                    </tr>
                </thead>
                <tbody>
                    {requests?.map((req) => (
                        <tr key={req._id}>
                            <td className="border border-gray-300 px-4 py-2">{req.requesterName}</td>
                            <td className="border border-gray-300 px-4 py-2">{req.productName}</td>
                            <td className="border border-gray-300 px-4 py-2">{req.productType}</td>
                            <td className="border border-gray-300 px-4 py-2">{new Date(req.requestDate).toLocaleDateString()}</td>
                            <td
                                className={`border border-gray-300 px-4 py-2 font-bold ${req.requestStatus === "Rejected" ? "text-red-600" : "text-green-600"
                                    }`}
                            >
                                {req.requestStatus === "Rejected" ? "Rejected" : req.requestStatus === "Approved" ? "Approved" : "Pending"}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 flex gap-2">
                                {req.requestStatus === 'Pending' && (
                                    <>
                                        <button
                                            className="bg-green-500 text-white px-2 py-1 rounded"
                                            onClick={() => handleApprove(req)}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                            onClick={() => handleReject(req)}
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                                {req.requestStatus !== 'Pending' && <span className="text-gray-500">No Actions</span>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllRequests;
