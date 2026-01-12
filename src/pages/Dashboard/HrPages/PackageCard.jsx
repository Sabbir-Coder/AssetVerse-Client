import React from 'react';
import { FaCheckCircle } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';

const PackageCard = ({ plan }) => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
    const { price, name, features, _id } = plan;

    const { data: userData } = useQuery({
        queryKey: ["user", user?.email],
        enabled: !!user?.email, // important: wait for user to load
        queryFn: async () => {
            const response = await axiosSecure.get(`/users/${user.email}`);
            return response.data;
        },
    });
    console.log(userData);


    const handlePayment = async (plan) => {
        try {
            const paymentInfo = {
                price: plan.price,
                packageName: plan.name,
                packageId: plan._id,
                hrEmail: user.email,
            };

            const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

            if (res.data?.url) {
                window.location.href = res.data.url;
            } else {
                console.error("Stripe URL missing", res.data);
            }
        } catch (error) {
            console.error("Payment initiation failed:", error);
        }
    };

    if (loading) return <LoadingSpinner />;
    // Determine which buttons should be disabled
    const isPremiumPurchased = userData?.package === "Premium";
    const isStandardPurchased = userData?.package === "Standard";

    const isDisabled =
        name === "Free" || // Free plan is always disabled
        isPremiumPurchased && (name === "Premium" || name === "Standard") || // Disable Premium & Standard if Premium purchased
        isStandardPurchased && name === "Standard"; // Optional: disable Standard if Standard purchased
    // Determine button text
    const buttonText = (() => {
        if (isPremiumPurchased && (name === "Premium" || name === "Standard")) return "Purchased";
        if (isStandardPurchased && name === "Standard") return "Purchased";
        if (name === "Free") return "Free";
        return `Purchase ${name} Plan`;
    })();



    return (
        <div className="relative flex flex-col rounded-2xl p-6 shadow-xl bg-white dark:bg-slate-800 overflow-hidden transform scale-105 md:scale-100 md:hover:scale-105 transition-transform duration-300 border border-slate-200 dark:border-slate-700">
            <div className="absolute -top-3 -right-3 w-32 h-16 bg-indigo-600 dark:bg-indigo-500 transform rotate-3 flex items-end justify-center pb-2 z-10 shadow-lg rounded-xl">
                <span className="text-xs font-bold text-white flex items-center gap-1 mb-2 mr-2">
                    {name} Plan <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                </span>
            </div>
            <div className="mt-4 mb-6 relative z-10">
                <h3 className="text-lg font-medium mb-2 text-slate-900 dark:text-slate-100">{name}</h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-display font-medium text-slate-500 dark:text-slate-400 line-through decoration-1">${17}</span>
                    <span className="text-5xl font-display font-medium text-indigo-600 dark:text-indigo-500">${price}</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">/ month</span>
                </div>
                <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-1">$228 billed yearly</p>
            </div>
            <ul className="space-y-1 flex-1 mb-8 relative z-10">
                {features.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                        <span className="text-white bg-emerald-600 dark:bg-emerald-500 rounded-full p-0.5 mt-0.5">
                            <span className="material-icons-round text-sm font-bold"><FaCheckCircle /></span>
                        </span>
                        <span className="text-sm text-slate-900 dark:text-slate-100">{item}</span>
                    </li>
                ))}
            </ul>
            <button
                onClick={() => handlePayment(plan)}
                className={`w-full py-4 text-center rounded-xl text-white font-bold transition-colors relative z-10
        ${isDisabled
                        ? "bg-slate-400 dark:bg-slate-600 cursor-not-allowed pointer-events-none"
                        : "bg-blue-600 dark:bg-blue-500 cursor-pointer hover:bg-blue-700 dark:hover:bg-blue-600"
                    }`}
                disabled={isDisabled}
            >
                {buttonText}
            </button>


        </div>
    );
};

export default PackageCard;
