import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { imageUpload, saveOrUpdateUser } from "../../utils";
import SmallLoader from "../../components/Shared/SmallLoader";

const SignUpHr = () => {
    const { createUser, updateUserProfile, loading, setLoading } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const from = "/"; // Default redirect


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const { fullName, email, password, companyName, companyLogo, dob } = data;
        const dateOfBirth = new Date(dob);
        const formattedDate = dateOfBirth.toLocaleDateString('en-GB');
        const imageFile = companyLogo[0];

        try {
            setLoading(true);
            // 1. Upload company logo/profile photo
            const photoURL = await imageUpload(imageFile);
            await createUser(email, password);
            await updateUserProfile(fullName, photoURL);

            await saveOrUpdateUser({
                name: fullName,
                companyName,
                companyLogo: photoURL,
                email,
                password,
                dob: formattedDate,
                role: 'hr',
                packageLimit: parseInt(5),
                currentEmployees: parseInt(0),
                subscription: 'basic',
            });
            navigate(from, { replace: true });
            toast.success('HR Account Created Successfully');
            console.log(data);
        } catch (err) {
            console.error(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark min-h-screen flex flex-col transition-colors duration-300">

            {/* Header - Kept from HTML but adapted */}
            <header className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm p-4 justify-between border-b border-border-light dark:border-border-dark">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/')} className="flex items-center justify-center rounded-full w-8 h-8 text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-300 cursor-pointer transition-colors">
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </button>
                    <h1 className="text-primary text-xl font-bold leading-tight tracking-[-0.015em]">Create Account</h1>
                </div>
            </header>

            <main className="grow p-4 md:p-6 flex flex-col items-center justify-center">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center pt-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                            <span className="material-symbols-outlined text-4xl">person_add</span>
                        </div>
                        <h2 className="text-2xl font-bold text-primary">HR Manager Registration</h2>
                        <p className="text-text-light/70 mt-2 text-sm">Join AssetVerse to manage your corporate assets efficiently.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium leading-6 text-text-light dark:text-text-dark mb-1.5" htmlFor="fullName">Full Name</label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="material-symbols-outlined text-gray-400 text-lg">person</span>
                                </div>
                                <input
                                    className="block w-full rounded-lg border-0 py-3 pl-10 text-text-light ring-1 ring-inset ring-border-light placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                    id="fullName"
                                    placeholder="Jane Doe"
                                    type="text"
                                    {...register("fullName", { required: "Full name is required" })}
                                />
                                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                            </div>
                        </div>

                        {/* Company Name */}
                        <div>
                            <label className="block text-sm font-medium leading-6 text-text-light dark:text-text-dark mb-1.5" htmlFor="companyName">Company Name</label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="material-symbols-outlined text-gray-400 text-lg">domain</span>
                                </div>
                                <input
                                    className="block w-full rounded-lg border-0 py-3 pl-10 text-text-light ring-1 ring-inset ring-border-light placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                    id="companyName"
                                    placeholder="Acme Corp"
                                    type="text"
                                    {...register("companyName", { required: "Company name is required" })}
                                />
                                {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}
                            </div>
                        </div>

                        {/* Company Logo Upload */}
                        <div>
                            <label className="block text-sm font-medium leading-6 text-text-light mb-1.5">Company Logo</label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-border-light dark:border-border-dark px-6 py-8 bg-white dark:bg-background-dark   transition-colors">
                                <div className="text-center">
                                    <span className="material-symbols-outlined text-gray-300 text-5xl mx-auto block mb-2">cloud_upload</span>
                                    <div className="mt-2 flex text-sm leading-6 text-gray-600 justify-center">
                                        <label className="relative cursor-pointer rounded-md font-semibold text-secondary focus-within:outline-none focus-within:ring-2 focus-within:ring-secondary focus-within:ring-offset-2 hover:text-secondary/80" htmlFor="file-upload">
                                            <span className="font-bold text-xl">Upload a file</span>
                                            <input
                                                id="file-upload"
                                                type="file"
                                                className="sr-only"
                                                {...register("companyLogo", { required: "Please upload a company logo" })}
                                            />
                                        </label>
                                        <p className="pl-1 text-text-light/60 dark:text-text-dark/60">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-500">PNG, JPG, GIF up to 5MB</p>
                                    {errors.companyLogo && <p className="text-red-500 text-xs mt-2">{errors.companyLogo.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium leading-6 text-text-light dark:text-text-dark mb-1.5" htmlFor="email">Email Address</label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="material-symbols-outlined text-gray-400 text-lg">mail</span>
                                </div>
                                <input
                                    className="block w-full rounded-lg border-0 py-3 pl-10 text-text-light ring-1 ring-inset ring-border-light placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                    id="email"
                                    placeholder="you@company.com"
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email"
                                        }
                                    })}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium leading-6 text-text-light dark:text-text-dark mb-1.5" htmlFor="password">Password</label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="material-symbols-outlined text-gray-400 text-lg">lock</span>
                                </div>
                                <input
                                    className="block w-full rounded-lg border-0 py-3 pl-10 text-text-light ring-1 ring-inset ring-border-light placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                    id="password"
                                    placeholder="Min. 6 characters"
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Password must be at least 6 characters" }
                                    })}
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="focus:outline-none flex items-center">
                                        <span className="material-symbols-outlined text-gray-400 text-lg cursor-pointer hover:text-gray-600">
                                            {showPassword ? "visibility_off" : "visibility"}
                                        </span>
                                    </button>
                                </div>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="block text-sm font-medium leading-6 text-text-light dark:text-text-dark mb-1.5" htmlFor="dob">Date of Birth</label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="material-symbols-outlined text-gray-400 text-lg">calendar_today</span>
                                </div>
                                <input
                                    className="block w-full rounded-lg border-0 py-3 px-2 pl-10 ring-1 ringinset ring-border-light placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                    id="dob"
                                    type="date"
                                    {...register("dob", { required: "Date of Birth is required" })}
                                />
                                {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>}
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center">
                                <input
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary bg-transparent"
                                    id="remember-me"
                                    type="checkbox"
                                    {...register("terms", { required: "You must agree to the Terms of Service" })}
                                />
                                <label className="ml-2 block text-sm text-text-light/80 dark:text-text-dark/80" htmlFor="remember-me">
                                    I agree to the <a className="text-secondary font-semibold hover:underline" href="#">Terms of Service</a>
                                </label>
                            </div>
                        </div>
                        {errors.terms && <p className="text-red-500 text-xs">{errors.terms.message}</p>}

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="flex cursor-pointer w-full justify-center rounded-lg bg-primary px-3 py-4 text-sm font-bold leading-6 text-white shadow-sm hover:bg-primary/90  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? <SmallLoader /> : "Create Account"}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <p className="text-text-light/60 dark:text-text-dark/60">
                            Already have an account?{' '}
                            <Link to="/login" className="font-bold text-primary hover:text-secondary transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SignUpHr;