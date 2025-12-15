import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import AssetCard from '../../../components/AssetCard';

const RequestAsset = () => {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 9;

    const axiosSecure = useAxiosSecure();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['assets', currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/all-assets?page=${currentPage}&limit=${limit}`
            );
            return res.data;
        },
        keepPreviousData: true,
    });

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div>Error loading assets.</div>;

    const { assets, total } = data;
    const totalPages = Math.ceil(total / limit);

    // Client-side search (only on current page data)
    const filteredAssets = assets.filter(asset =>
        asset.productName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="overflow-x-auto">
            {/* Header & Search */}
            <div className='flex justify-between items-center px-3'>
                <h2 className='font-bold text-3xl'>My All Assets here</h2>

                <label className="input p-2 ml-3 my-4 flex items-center gap-2">
                    <input
                        type="search"
                        placeholder="Search"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="bg-transparent outline-none"
                    />
                </label>
            </div>

            {/* Assets Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-3'>
                {filteredAssets.length === 0 ? (
                    <p className='text-center font-bold text-gray-600'>
                        No assets found.
                    </p>
                ) : (
                    filteredAssets.map(asset => (
                        <AssetCard key={asset._id} asset={asset} />
                    ))
                )}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-8 gap-2">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                >
                    Previous
                </button>

                {[...Array(totalPages).keys()].map(page => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page + 1)}
                        className={`px-4 py-2 border rounded ${
                            currentPage === page + 1
                                ? 'bg-blue-600 text-white'
                                : ''
                        }`}
                    >
                        {page + 1}
                    </button>
                ))}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default RequestAsset;
