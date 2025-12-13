import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';


const Payment = () => {
    const { packageId } = useParams()
    const axiosSecure = useAxiosSecure()
    const { data: plan, isLoading } = useQuery({
        queryKey: ['packages', packageId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/packages/${packageId}`)
            return res.data
        }
    })

  

    const handlePayment = async () => {
        const paymentInfo = {
            price: plan.price,
            packageId: plan._id,
            name: plan.name
        }
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo)
        console.log(res.data)
    }


    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <div>
            <h1>Please pay for -  {plan.name} = ${plan.price}</h1>
            <button onClick={handlePayment} className='btn btn-primary'>Pay</button>
        </div>
    );
};

export default Payment;