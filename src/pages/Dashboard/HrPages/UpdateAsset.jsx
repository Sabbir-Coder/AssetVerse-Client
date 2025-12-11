import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const UpdateAsset = () => {
    const { user, loading, setLoading } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { isPending, isError, mutateAsync, reset: mutationReset } = useMutation({
        mutationFn: async (data) => {
            await axios.post(`${import.meta.env.VITE_API_URL}/assets`, data);
        },
        onSuccess: () => {
            console.log('Product added successfully');
            toast.success('Product added successfully');
            mutationReset();
        },
        onError: (error) => {
            console.error('Error adding product:', error);
            toast.error('Error adding product');
        },
        onMutate: () => {
            console.log('Adding product...');
        },
        onSettled: (data, error) => {
            if (data) {
                console.log('Product addition process settled with data:', data);
            }
            if (error) {
                console.error('Product addition process settled with error:', error);
            }
        }
    });
    const onsubmit = async (data) => {
        const formData = new FormData();
        formData.append('image', data.image[0]);}


        return (
            <div className='w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
                <form onSubmit={handleSubmit(onsubmit)}>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                        <div className='space-y-6'>
                            {/* Name */}
                            <div className='space-y-1 text-sm'>
                                <label htmlFor='name' className='block text-gray-600'>
                                    Product Name
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md bg-white'
                                    name='name'
                                    id='name'
                                    type='text'                          
                                    placeholder='Product Name'
                                    required
                                    {...register("productName", {
                                        required: "Name is required"
                                    })}
                                />
                                {errors["productName"] && (
                                    <p className="mt-1 text-sm text-red-600">{errors["productName"].message}</p>
                                )}
                            </div>
                            {/* Product Type */}
                            <div className='space-y-1 text-sm'>
                                <label htmlFor='productType' className='block text-gray-600 '>
                                    Product Type
                                </label>
                                <select
                                    required
                                    className='w-full px-4 py-3 border-blue-300 outline outline-blue-300 focus:outline-blue-500 rounded-md bg-white'
                                    name='productType'
                                    {...register("productType", {
                                        required: "Product type is required"
                                    })}
                                >
                                    <option value='Non-Returnable'>Non-Returnable</option>
                                    <option value='Returnable'>Returnable</option>
                                </select>
                                {errors["productType"] && (
                                    <p className="mt-1 text-sm text-red-600">{errors["productType"].message}</p>
                                )}
                            </div>
                            {/* Description */}
                            <div className='space-y-1 text-sm'>
                                <label htmlFor='description' className='block text-gray-600'>
                                    Description
                                </label>

                                <textarea
                                    id='description'
                                    placeholder='Write product description here...'
                                    className='block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border border-blue-300 bg-white focus:outline-blue-500 '
                                    name='description'
                                    {...register("description", {
                                        required: "Description is required"
                                    })}
                                >
                                    {errors["description"] && (
                                        <p className="mt-1 text-sm text-red-600">{errors["description"].message}</p>
                                    )}
                                </textarea>
                            </div>
                        </div>

                        <div className='space-y-6 flex flex-col'>

                            {/* Image & Quantity */}
                            <div className='flex justify-between gap-2'>
                                <div className=' p-4  w-full  m-auto rounded-lg grow'>

                                    <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                                        <div className='flex flex-col w-max mx-auto text-center'>

                                            <label>
                                                <input
                                                    className='text-sm cursor-pointer w-36 hidden'
                                                    type='file'
                                                    name='image'
                                                    id='image'
                                                    accept='image/*'
                                                    hidden
                                                    {...register("image", {
                                                        required: "Image is required"
                                                    })}
                                                />
                                                <div className='bg-blue-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-blue-700'>
                                                    Upload
                                                </div>
                                            </label>
                                            {errors["image"] && (
                                                <p className="mt-1 text-sm text-red-600">{errors["image"].message}</p>
                                            )}
                                            <p className='text-gray-400 text-xs mt-1'>PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Quantity */}
                                <div className='space-y-1 text-sm'>
                                    <label htmlFor='quantity' className='block text-gray-600'>
                                        Quantity
                                    </label>
                                    <input
                                        className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md bg-white'
                                        name='quantity'
                                        id='quantity'
                                        type='number'
                                        placeholder='Available quantity'
                                        required
                                        {...register("quantity", {
                                            required: "Quantity is required"
                                        })}
                                    />
                                    {errors["quantity"] && (
                                        <p className="mt-1 text-sm text-red-600">{errors["quantity"].message}</p>
                                    )}
                                </div>
                            </div>
                            {/* Image */}
                            {isPending || loading ? <SmallLoader /> :
                                <button
                                    type='submit'
                                    className='w-full cursor-pointer p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-blue-700 '
                                >
                                    Save & Continue
                                </button>
                            }
                        </div>
                    </div>
                </form>
            </div>
        )
    }


export default UpdateAsset;