import { Link, useNavigate } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";

const SignUpEmployee = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);


    return (
        <div className="bg-background-light dark:bg-background-dark font-display min-h-screen w-full flex flex-col overflow-x-hidden">
            {/* Main */}
            <main className="flex-1 px-4 py-8 flex justify-between items-start gap-4 ">
                <div onClick={() => navigate(-1)} className="flex items-center gap-2 cursor-pointer font-bold btn btn-outline btn-primary">
                    <IoIosArrowRoundBack className="text-4xl my-4" />
                    <p>Back</p>
                </div>
                <div className="max-w-md mx-auto">
                    <div className="text-left mb-7">
                        <h2 className="text-3xl font-bold text-[#111318] tracking-[-0.015em]">
                            Employee Registration
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            Create your account to join your company's workspace.
                        </p>
                    </div>


                    {/* Form */}
                    <form className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <label className="form-label" htmlFor="full-name">Full Name</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    person
                                </span>
                                <input
                                    className="form-input px-3 pl-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full"
                                    id="full-name"
                                    placeholder="John Doe"
                                    type="text"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="form-label" htmlFor="email">Email</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    mail
                                </span>
                                <input
                                    className="form-input px-3 pl-10 w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    id="email"
                                    placeholder="you@company.com"
                                    type="email"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="form-label" htmlFor="password">Password</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    lock
                                </span>
                                <input
                                    className="form-input px-3 pl-10 w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    id="password"
                                    placeholder="Minimum 6 characters"
                                    type={showPassword ? 'text' : 'password'}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500 ">
                                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                    {showPassword ? 'Hide' : 'Show'}

                                </button>
                            </div>
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="form-label" htmlFor="dob">Date of Birth</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    calendar_today
                                </span>
                                <input
                                    className="form-input px-3 pl-10 w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    id="dob"
                                    placeholder="YYYY-MM-DD"
                                    type="date"
                                />
                            </div>
                        </div>

                        {/* Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center rounded-lg h-12 px-5 bg-primary text-white text-base font-bold tracking-[0.015em]"
                            >
                                <span className="truncate cursor-pointer">Create Account</span>
                            </button>
                        </div>
                    </form>
                    <div className="divider">OR</div>
                    <div>
                        <p className="mt-5 text-center border-b border-gray-300 pb-3">Already have an account? <Link to="/login" className="font-medium text-primary cursor-pointer hover:underline">Login</Link></p>
                    </div>

                    {/* Footer Text */}
                    <div className="mt-8 text-left">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            By creating an account, you agree to our{" "}
                            <Link to="#" className="font-medium text-primary hover:underline">Terms of Service</Link>{" "}
                            and{" "}
                            <Link to="#" className="font-medium text-primary hover:underline">Privacy Policy</Link>.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SignUpEmployee;
