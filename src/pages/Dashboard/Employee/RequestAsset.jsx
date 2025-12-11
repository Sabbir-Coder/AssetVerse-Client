import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
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
            <div>
                <h2 className='font-bold text-3xl'>All Assets here</h2>
            </div>
            <div className='flex mt-15 justify-between items-center px-3'>

                <div className='grid grid-cols-1 sm:grid-cols-2 mx-auto justify-center items-center md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {filteredAssets.map(asset => (
                        <AssetCard key={asset._id} asset={asset} />
                    ))}
                </div>

            </div>
        </div>
    );
};
export default RequestAsset;