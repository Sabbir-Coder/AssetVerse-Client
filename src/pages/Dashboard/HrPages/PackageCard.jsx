import React from 'react';
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { Link } from 'react-router';

const PackageCard = ({ plan }) => {
    console.log(plan);
    const { price, name, features,_id } = plan

    return (
        <div className="relative flex flex-col rounded-3xl p-6 shadow-2xl shadow-gray-900/20  overflow-hidden transform scale-105 md:scale-100 md:hover:scale-105 transition-transform duration-300 border border-gray-800">
            <div className="absolute -top-3 -right-3 w-32 h-16 bg-accent transform rotate-3 flex items-end justify-center pb-2 z-10 shadow-lg">
                <span className="text-xs font-bold text-gray-900 flex items-center gap-1 mb-2 mr-2">
                    {name} Plan <span className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
                </span>
            </div>
            <div className="mt-4 mb-6 relative z-10">
                <h3 className="text-lg font-medium  mb-2">{name}</h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-display font-medium text-gray-500 line-through decoration-1">${17}</span>
                    <span className="text-5xl font-display font-medium text-accent">${price}</span>
                    <span className="text-sm text-gray-400">/ month</span>
                </div>
                <p className="text-xs text-yellow-500 mt-1">$228 billed yearly</p>

            </div>
            <ul className="space-y-1 flex-1 mb-8 relative z-10">
                {features.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                        <span className="text-white bg-lime-600 rounded-full p-0.5 mt-0.5">
                            <span className="material-icons-round text-sm font-bold"><FaCheckCircle /></span>
                        </span>
                        <span className="text-sm text-gray-900">{item}</span>
                    </li>
                ))}

            </ul>
            <Link to={`/dashboard/payment/${_id}`}
                className={`w-full py-4 text-center rounded-2xl text-white font-bold transition-colors relative z-10
    ${name === "Free" ? "bg-gray-500 cursor-not-allowed pointer-events-none" : "bg-[#040c50]  cursor-pointer  hover:bg-[#403e86]"}`}
                disabled={name === "Free"}
            >
                Purchase {name} Plan
            </Link>
        </div>
    );
};

export default PackageCard;