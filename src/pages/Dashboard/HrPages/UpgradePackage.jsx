import React from "react";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import PackageCard from "./PackageCard";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const UpgradePackage = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { isLoading, data: upgradePackages = [] } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/packages`)
            return res.data
        }
    })
    console.log(upgradePackages);
    if (isLoading) return <LoadingSpinner />

    return (
        <div className="bg-background-light dark:bg-background-dark font-body min-h-screen transition-colors duration-300">
            {/* Header & Toggle */}
            <div className="flex mb-20 flex-col items-center justify-center space-y-6 pt-4">
                <h1 className="text-4xl font-display font-medium text-gray-900">
                    Pricing
                </h1>
                <div className="bg-white p-1.5 rounded-full shadow-sm border border-gray-100  flex items-center relative w-48">
                    <div className="absolute left-1.5 w-[50%] h-[calc(100%-0.75rem)] bg-gray-900 rounded-full transition-all duration-300 shadow-md"></div>
                    <button className="flex-1 relative z-10 py-2 text-sm font-medium text-white text-center transition-colors">
                        Annual
                    </button>
                    <button className="flex-1 relative z-10 py-2 text-sm font-medium text-gray-500 text-center transition-colors">
                        Monthly
                    </button>
                </div>
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 w-full space-y-8 pb-12 mt-10">

                {
                    upgradePackages.map(plan => <PackageCard plan={plan} key={plan._id} />)}

            </div>
        </div>
    );
};

export default UpgradePackage;
