import React, { useState } from 'react';
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
console.log(myAssets);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("");

    const filteredAssets = myAssets?.filter(asset => {
        const matchesSearch = asset.productName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType ? asset.productType === filterType : true;
        return matchesSearch && matchesType;
    });


    const handlePrint = (asset) => {
        const printContent = `
    <html>
      <head>
        <title>Asset Details</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h2 { margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          img { width: 100px; height: 100px; object-fit: cover; border-radius: 8px; }
        </style>
      </head>
      <body>
        <h2>Assigned Asset Details</h2>
        <table>
          <tr><th>Image</th><td><img src="${asset.assetImage}" /></td></tr>
          <tr><th>Name</th><td>${asset.productName}</td></tr>
          <tr><th>Type</th><td>${asset.productType}</td></tr>
          <tr><th>Company</th><td>${asset.companyName}</td></tr>
          <tr><th>Request Date</th><td>${new Date(asset.requestDate).toLocaleDateString()}</td></tr>
          <tr><th>Approval Date</th><td>${asset.approvalDate ? new Date(asset.approvalDate).toLocaleDateString() : "-"}</td></tr>
          <tr><th>Status</th><td>${asset.status}</td></tr>
        </table>
      </body>
    </html>
  `;

        const win = window.open("", "_blank", "width=800,height=600");
        win.document.write(printContent);
        win.document.close();
        win.print();
    };



    if (isLoading) return <LoadingSpinner />;

    if (isError) return <div>Error loading assets</div>;

    return (
        <div className="overflow-x-auto p-4">
            <h2 className='text-3xl font-bold text-gray-600 my-5'>All Requested Assets</h2>
            <p className='text-gray-500 mb-10'>All your requested assets and their status.
            </p>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by asset name"
                    className="input input-bordered w-full max-w-xs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="select select-bordered w-full max-w-xs"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="">All Types</option>
                    <option value="Returnable">Returnable</option>
                    <option value="Non-Returnable">Non-returnable</option>
                </select>
            </div>

            <table className="table-auto border-collapse border-gray-300 border w-full">
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
                        <th className="border border-gray-300 text-gray-500 px-4 py-2">Print</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAssets?.length === 0 ? <tr><td colSpan="9" className="text-center py-4 border border-gray-300 text-gray-400">No assets found</td></tr> : filteredAssets?.map((req, i) => (
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
                            '><button onClick={() => handlePrint(req)} className='btn btn-primary'>Print</button></td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default MyAsset;