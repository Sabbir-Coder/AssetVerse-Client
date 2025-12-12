import React from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

const UpgradePackage = () => {
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



                <div className="relative rounded-3xl p-6 shadow-2xl shadow-gray-900/20  overflow-hidden transform scale-105 md:scale-100 md:hover:scale-105 transition-transform duration-300 border border-gray-800">
                    <div className="absolute -top-3 -right-3 w-32 h-16 bg-accent transform rotate-3 flex items-end justify-center pb-2 z-10 shadow-lg">
                        <span className="text-xs font-bold text-gray-900 flex items-center gap-1 mb-2 mr-2">
                            Free Plan <span className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
                        </span>
                    </div>
                    <div className="mt-4 mb-6 relative z-10">
                        <h3 className="text-lg font-medium  mb-2">Basic</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-display font-medium text-gray-500 line-through decoration-1">$5</span>
                            <span className="text-5xl font-display font-medium text-accent">Free</span>
                            <span className="text-sm text-gray-400">/ month</span>
                        </div>
                        <p className="text-xs text-yellow-500 mt-1">$228 billed yearly</p>
                       
                    </div>
                    <ul className="space-y-3 mb-8 relative z-10">
                        {[
                            "Access to core HR features",
                            "Employee record management",
                            "Basic reporting tools",
                            "Manage up to 5 employee",
                            "Track employee attendance",
                            "Assign and monitor tasks",
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <span className="text-white bg-lime-600 rounded-full p-0.5 mt-0.5">
                                    <span className="material-icons-round text-sm font-bold"><FaCheckCircle /></span>
                                </span>
                                <span className="text-sm text-gray-900">{item}</span>
                            </li>
                        ))}
                        <li className="flex items-start gap-3 opacity-40">
                            <span className="text-gray-500 p-0.5 mt-0.5">
                                <span className="material-icons-round text-sm"><FaTimes /></span>
                            </span>
                            <span className="text-sm text-gray-800">Email support</span>
                        </li>
                    </ul>
                    <button className="w-full cursor-pointer py-4 bg-[#040c50] rounded-2xl text-white font-bold hover:bg-[#33304e] transition-colors relative z-10">
                       Free Trial
                    </button>
                </div>


                <div className="relative bg-gray-900  rounded-3xl p-6 drop-shadow-2xl shadow-gray-900/20 text-white overflow-hidden transform scale-105 md:scale-110 md:hover:scale-115 transition-transform duration-300 border border-gray-800 dark:border-gray-800">
                    <div className="absolute -top-3 -right-3 w-32 h-16 bg-accent transform rotate-3 flex items-end justify-center pb-2 z-10 shadow-lg">
                        <span className="text-xs font-bold text-gray-900 flex items-center gap-1 mb-2 mr-2">
                            Save 27% <span className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
                        </span>
                    </div>
                    <div className="mt-4 mb-6 relative z-10">
                        <h3 className="text-lg font-medium text-white mb-2">Standard</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-display font-medium text-gray-500 line-through decoration-1">$12</span>
                            <span className="text-5xl font-display font-medium text-accent">$8</span>
                            <span className="text-sm text-gray-400">/ month</span>
                        </div>
                        <p className="text-xs text-yellow-500 mt-1">$228 billed yearly</p>
                     
                    </div>
                    <ul className="space-y-3 mb-8 relative z-10">
                        {[
                            "Access to core HR features",
                            "Employee record management",
                            "Basic reporting tools",
                            "Manage up to 10 team members",
                            "Track employee attendance",
                            "Assign and monitor tasks",
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <span className="bg-lime-500 text-gray-900 rounded-full p-0.5 mt-0.5">
                                    <span className="material-icons-round text-sm font-bold"><FaCheckCircle /></span>
                                </span>
                                <span className="text-sm text-gray-200">{item}</span>
                            </li>
                        ))}
                        <li className="flex items-start gap-3 opacity-40">
                            <span className="text-white p-0.5 mt-0.5">
                                <FaCheck />
                            </span>
                            <span className="text-sm text-white">Email support</span>
                        </li>
                    </ul>
                    <button className="w-full cursor-pointer py-4 rounded-2xl bg-white text-gray-900 font-bold hover:bg-gray-100 transition-colors relative z-10">
                        Purchase Plan
                    </button>
                </div>

                <div className="relative rounded-3xl p-6 shadow-2xl shadow-gray-900/20  overflow-hidden transform scale-105 md:scale-100 md:hover:scale-105 transition-transform duration-300 border border-gray-800">
                    <div className="absolute -top-3 -right-3 w-32 h-16 bg-accent transform rotate-3 flex items-end justify-center pb-2 z-10 shadow-lg">
                        <span className="text-xs font-bold text-gray-900 flex items-center gap-1 mb-2 mr-2">
                            Save 56% <span className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
                        </span>
                    </div>
                    <div className="mt-4 mb-6 relative z-10">
                        <h3 className="text-lg font-medium  mb-2">Premium</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-display font-medium text-gray-500 line-through decoration-1">$34</span>
                            <span className="text-5xl font-display font-medium text-accent">$15</span>
                            <span className="text-sm text-gray-400">/ month</span>
                        </div>
                        <p className="text-xs text-yellow-500 mt-1">$228 billed yearly</p>
                  
                    </div>
                    <ul className="space-y-3 mb-8 relative z-10">
                        {[
                            "Access to core HR features",
                            "Employee record management",
                            "Basic reporting tools",
                            "Manage up to 10 team members",
                            "Track employee attendance",
                            "Assign and monitor tasks",
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <span className="text-white bg-lime-600 rounded-full p-0.5 mt-0.5">
                                    <span className="material-icons-round text-sm font-bold"><FaCheckCircle /></span>
                                </span>
                                <span className="text-sm text-gray-900">{item}</span>
                            </li>
                        ))}
                        <li className="flex items-start gap-3 opacity-40">
                            <span className="text-green-600 p-0.5 mt-0.5">
                                <span className="material-icons-round text-sm"><FaCheckCircle /></span>
                            </span>
                            <span className="text-sm text-gray-900">Email support</span>
                            <span className="text-green-600 p-0.5 mt-0.5">
                                <span className="material-icons-round text-sm"><FaCheckCircle /></span>
                            </span>
                            <span className="text-sm text-gray-900">Special Lifetime support</span>
                        </li>
                    </ul>
                    <button className="w-full cursor-pointer py-4 bg-[#040c50] rounded-2xl text-white font-bold hover:bg-[#33304e] transition-colors relative z-10">
                     Purchase Premium Package
                    </button>
                </div>


            </div>
        </div>
    );
};

export default UpgradePackage;
