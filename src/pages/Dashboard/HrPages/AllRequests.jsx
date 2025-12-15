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
        onError: (error) => {
            const message =
                error?.response?.data?.message || 'Failed to approve request';
            toast.error(message);
        },
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
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 ">All Asset Requests</h2>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto rounded-lg shadow border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Employee</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Asset</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white  divide-y divide-gray-200 ">
                        {requests?.map((req) => (
                            <tr key={req._id} className="hover:bg-gray-200 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">{req.requesterName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">{req.productName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">{req.productType}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">{new Date(req.requestDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${req.requestStatus === "Rejected" ? "bg-red-100 text-red-800 " :
                                            req.requestStatus === "Approved" ? "bg-green-100 text-green-800 " :
                                                "bg-yellow-100 text-yellow-800 "}`}>
                                        {req.requestStatus === "Rejected" ? "Rejected" : req.requestStatus === "Approved" ? "Approved" : "Pending"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {req.requestStatus === 'Pending' ? (
                                        <div className="flex space-x-2">
                                            <button
                                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors"
                                                onClick={() => handleApprove(req)}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
                                                onClick={() => handleReject(req)}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    ) : (
                                        <span className="text-gray-400">No Actions</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {(!requests || requests.length === 0) && (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500 ">
                                    No requests found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {requests?.map((req) => (
                    <div key={req._id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 ">{req.productName}</h3>
                                <p className="text-sm text-gray-500 ">{req.productType}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                                ${req.requestStatus === "Rejected" ? "bg-red-100 text-red-800 " :
                                    req.requestStatus === "Approved" ? "bg-green-100 text-green-800 " :
                                        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"}`}>
                                {req.requestStatus === "Rejected" ? "Rejected" : req.requestStatus === "Approved" ? "Approved" : "Pending"}
                            </span>
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 ">Requester:</span>
                                <span className="text-gray-900 font-medium">{req.requesterName}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 ">Date:</span>
                                <span className="text-gray-900 font-medium">{new Date(req.requestDate).toLocaleDateString()}</span>
                            </div>
                        </div>

                        {req.requestStatus === 'Pending' && (
                            <div className="flex gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                                <button
                                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded text-sm font-medium transition-colors"
                                    onClick={() => handleApprove(req)}
                                >
                                    Approve
                                </button>
                                <button
                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded text-sm font-medium transition-colors"
                                    onClick={() => handleReject(req)}
                                >
                                    Reject
                                </button>
                            </div>
                        )}
                    </div>
                ))}
                {(!requests || requests.length === 0) && (
                    <div className="text-center py-8 text-gray-500 ">
                        No requests found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllRequests;
