import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import SmallLoader from '../../../components/Shared/SmallLoader';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const UpdateAsset = () => {
    const { id } = useParams();
    const assetId = id;
    const axiosSecure=useAxiosSecure()
    const navigate = useNavigate();
    const { user } = useAuth();
    console.log(assetId);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // 1. Load existing asset
    const { data: assetData, isLoading } = useQuery({
        queryKey: ["asset", assetId],
        queryFn: async () => {
            const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/assets/${assetId}`);
            return res.data;
        }
    });
    console.log(assetData);

    // Pre-fill form when data arrives
    useEffect(() => {
        if (assetData) {
            reset({
                productName: assetData.productName,
                productType: assetData.productType,
                description: assetData.description,
                quantity: assetData.quantity,
            });
        }
    }, [assetData, reset]);

    // 2. Update asset mutation
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data) => {
            return await axiosSecure.put(
                `${import.meta.env.VITE_API_URL}/assets/${assetId}`,
                data
            );
        },
        onSuccess: () => {
            toast.success("Asset updated successfully");
            navigate("/dashboard/asset-list");
        },
        onError: () => {
            toast.error("Failed to update asset");
        }
    });

    // 3. Submit handler
    const onSubmit = async (data) => {
        let imageUrl = assetData.image;

        // If a new image is uploaded → upload to imgbb
        if (data.image && data.image.length > 0) {
            const formData = new FormData();
            formData.append("image", data.image[0]);

            const uploadRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_Api_Key}`,
                formData
            );

            imageUrl = uploadRes.data.data.display_url;
        }

        const payload = {
            productName: data.productName,
            productType: data.productType,
            description: data.description,
            quantity: data.quantity,
            image: imageUrl,
            updatedBy: user?.email,
            updatedAt: new Date(),
        };

        await mutateAsync(payload);
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className='w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl p-10">

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                    <div className='space-y-6'>
                        {/* Product Name */}
                        <div className='space-y-1 text-sm'>
                            <label className='block text-gray-600'>Product Name</label>
                            <input
                                className='w-full px-4 py-3 border rounded-md bg-white'
                                type='text'
                                {...register("productName", { required: "Name is required" })}
                            />
                            {errors.productName && <p className="text-red-600">{errors.productName.message}</p>}
                        </div>

                        {/* Product Type */}
                        <div className='space-y-1 text-sm'>
                            <label className='block text-gray-600'>Product Type</label>
                            <select
                                className='w-full px-4 py-3 border rounded-md bg-white'
                                {...register("productType", { required: "Product type is required" })}
                            >
                                <option value='Non-Returnable'>Non-Returnable</option>
                                <option value='Returnable'>Returnable</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div className='space-y-1 text-sm'>
                            <label className='block text-gray-600'>Description</label>
                            <textarea
                                className='w-full h-32 px-4 py-3 border rounded-md bg-white'
                                {...register("description", { required: "Description is required" })}
                            />
                        </div>
                    </div>

                    <div className='space-y-6'>
                        {/* Image Upload */}
                        <div className='space-y-1 text-sm'>
                            <label className='block text-gray-600'>Replace Image (optional)</label>

                            <input
                                type='file'
                                accept='image/*'
                                className='file-input file-input-bordered w-full bg-white'
                                {...register("image")}
                            />

                            {assetData?.image && (
                                <img src={assetData.image} alt="Old" className="w-24 h-24 mt-2 rounded-md" />
                            )}
                        </div>

                        {/* Quantity */}
                        <div className='space-y-1 text-sm'>
                            <label className='block text-gray-600'>Quantity</label>
                            <input
                                type='number'
                                className='w-full px-4 py-3 border rounded-md bg-white'
                                {...register("quantity", { required: "Quantity is required" })}
                            />
                        </div>

                        <button
                            type='submit'
                            className='w-full cursor-pointer p-3 mt-5 text-center text-white rounded bg-blue-700'
                            disabled={isPending}
                        >
                            {isPending ? <SmallLoader /> : "Update Asset"}
                        </button>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default UpdateAsset;
