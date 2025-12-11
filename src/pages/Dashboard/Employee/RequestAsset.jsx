import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import AssetCard from '../../../components/AssetCard';

const RequestAsset = () => {
    const [search, setSearch] = useState("");
    const axiosSecure = useAxiosSecure()
    const { data: assets, isLoading, isError } = useQuery({
        queryKey: ['assets'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/all-assets`);
            return response.data;
        }
    })
    // console.log(assets);



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
            <div className='flex mt-15 justify-between items-center px-3'>

                <div className='grid grid-cols-1 sm:grid-cols-2 mx-auto justify-center items-center md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {filteredAssets.length === 0 ? (
                        <p className='text-center font-bold text-gray-600'>No assets found.</p>
                    ) : (
                        filteredAssets.map(asset => (
                            <AssetCard key={asset._id} asset={asset} />
                        ))
                    )}
                </div>

            </div>
        </div>
    );
};
export default RequestAsset;