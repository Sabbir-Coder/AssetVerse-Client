import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const AssetList = () => {
    const [search, setSearch] = useState("");
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { data: assets, isLoading, isError, refetch } = useQuery({
        queryKey: ['assets'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/assets?email=${user?.email}`);
            return response.data;
        }
    })
    // console.log(assets);


    const handleDelete = async (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.delete(`${import.meta.env.VITE_API_URL}/assets/${id}`);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    refetch()
                }
            });
            console.log(id);

        } catch (error) {
            console.error("Error deleting asset:", error);
        }
        refetch(); // Refetch assets after deletion

    };

    // Filter assets by product name
    const filteredAssets = assets?.filter(asset =>
        asset.productName.toLowerCase().includes(search.toLowerCase())
    );

    if (isLoading) {
        return <LoadingSpinner />;
    }
    if (isError) {
        return <div>Error loading assets.</div>;
    }

    return (
        <div className="overflow-x-auto">
            <div className='flex justify-between items-center px-3'>
                <div>
                    <h2 className='font-bold text-3xl'>My All Assets here</h2>
                </div>
                <label className="input p-2 ml-3 my-4 flex items-center gap-2 focus-within:outline-blue-700">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input
                        type="search"
                        required
                        placeholder="Search"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="bg-transparent outline-blue-500 focus:outline-blue-700"
                    />
                </label>
            </div>
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>Date Added</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAssets && filteredAssets.length === 0 ? (
                        <tr className='pt-17'>
                            <td colSpan="6" rowSpan="8" className="text-center text-gray-400 text-3xl font-bold pt-9">
                                No assets found.
                            </td>
                        </tr>
                    ) : (
                        filteredAssets && filteredAssets.map((asset, index) => (
                            <tr key={asset._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={asset.image}
                                                    alt={asset.productName} />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="font-bold">{asset.productName}</div>
                                </td>
                                <td>{asset.productType}</td>
                                <td>{asset.quantity}</td>
                                <td>{asset.dateAdded}</td>
                                <td className='flex justify-center md:flex-row flex-col gap-1 items-center'>
                                    <Link to={`/assets/edit/${asset._id}`} className="btn btn-danger btn-outline btn-sm">Edit</Link>
                                    <button onClick={() => handleDelete(asset._id)} className="btn btn-danger btn-sm bg-red-600 text-white">Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AssetList;