import { Link, useNavigate } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { imageUpload } from "../../utils";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import SmallLoader from "../../components/Shared/SmallLoader";

const SignUpEmployee = () => {
    const { createUser, updateUserProfile, loading ,setLoading} = useAuth();
    const from = location.state?.from?.pathname || "/";
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const axiosSecure = useAxiosSecure()


    // react hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        setLoading(true)
        // Handle form submission logic here
        const { name, email, photo, password, dob } = data;

        const dateOfBirth = new Date(dob);
        const formattedDate = dateOfBirth.toLocaleDateString('en-GB');
        const ImageFile = photo[0];


        try {
            //1. Upload profile photo to imgbb
            const photoURL = await imageUpload(ImageFile);
            await createUser(email, password);
            await updateUserProfile(name, photoURL);

            //2. User Registration
            await axiosSecure.post('/users', {
                name,
                email,
                photoURL,
                password,
                dob: formattedDate,
                role: 'employee',

            })


            navigate(from, { replace: true })
            toast.success('Signup Successful')
        } catch (err) {
            console.log(err)
            toast.error(err?.message)
        }
        finally {
            setLoading(false)
        }
    }

    // Handle Google Signin
    //   const handleGoogleSignIn = async () => {
    //     try {
    //       //User Registration using google
    //       await signInWithGoogle()

    //       navigate(from, { replace: true })
    //       toast.success('Signup Successful')
    //     } catch (err) {
    //       console.log(err)
    //       toast.error(err?.message)
    //     }
    //   }

    return (
        <div className="bg-background-light dark:bg-background-dark font-display min-h-screen w-full flex flex-col overflow-x-hidden">
            {/* Main */}
            <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm p-4 justify-between border-b border-border-light dark:border-border-dark">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="flex items-center justify-center rounded-full w-8 h-8 text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-300 cursor-pointer transition-colors">
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </button>
                    <h1 className="text-primary text-xl font-bold leading-tight tracking-[-0.015em]">Create Account</h1>
                </div>
            </header>
            <main className="flex-1 px-4 py-8 flex justify-between items-start gap-4 ">
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
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <label className="form-label" htmlFor="full-name">Full Name</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    person
                                </span>
                                <input
                                    className="form-input px-3 pl-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full"
                                    id="name"
                                    placeholder="John Doe"
                                    type="text"
                                    {...register("name", {
                                        required: "Name is required",
                                        maxLength: { value: 40, message: "Name must be at most 40 characters long" },
                                        minLength: { value: 2, message: "Name must be at least 2 characters long" }
                                    })}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                                )}
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
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Email is not valid"
                                        }
                                    })}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                )}
                            </div>
                        </div>

                        {/* photo */}
                        <div>
                            <label className="form-label" htmlFor="email">Profile Picture</label>
                            <div className="relative">
                                <input type="file" className="file-input w-full"
                                    {...register("photo", { required: "Profile Picture is required" })}
                                />
                                {errors.photo && (
                                    <p className="mt-1 text-sm text-red-600">{errors.photo.message}</p>
                                )}
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
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Password must be at least 6 characters long" }
                                    })}
                                    placeholder="Minimum 6 characters"
                                    type={showPassword ? 'text' : 'password'}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500 ">
                                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                    {showPassword ? 'Hide' : 'Show'}

                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                            )}
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
                                    {...register("dob", { required: "Date of Birth is required" })}
                                />
                                {errors.dob && (
                                    <p className="mt-1 text-sm text-red-600">{errors.dob.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center rounded-lg h-12 px-5 bg-primary text-white text-base font-bold cursor-pointer tracking-[0.015em]"
                            >
                                {loading ? <SmallLoader /> : <span className="truncate">Create Account</span>}
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
