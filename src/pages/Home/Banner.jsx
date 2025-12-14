import React from 'react';

const Banner = () => {
    return (
        <div className="bg-[#F8FAFC] text-slate-900 min-h-screen flex flex-col font-sans">
     
            <main className="flex-grow flex flex-col px-6 pt-6 pb-12 relative overflow-hidden">
                <div className="absolute top-[-10%] left-1/2 transform -translate-x-1/2 w-[150%] h-[50vh] bg-emerald-500/10 blur-[80px] rounded-[100%] pointer-events-none z-0"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-[#6366F1]/10 blur-[100px] rounded-full pointer-events-none z-0"></div>

                <div className="relative z-10 flex flex-col items-center text-center mb-10 md:items-start md:text-left max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-slate-900">
                        Empower your workspace simplify your files with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-[#6366F1]">FileKit</span>
                    </h1>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
                        Streamline, secure, and share files effortlessly. Boost collaboration and productivity in one intuitive platform.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <button className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white rounded-xl font-semibold text-base shadow-lg hover:translate-y-[-1px] transition-transform duration-200 flex items-center justify-center gap-2">
                            Subscribe
                        </button>
                        <button className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-slate-300 text-slate-900 rounded-xl font-medium text-base hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                            Free Trial
                        </button>
                    </div>
                </div>

                <div className="relative z-10 w-full max-w-4xl mx-auto mt-4 perspective-1000">
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden transform rotate-x-2 transition-transform duration-500 hover:rotate-0">
                        <div className="h-10 border-b border-slate-100 flex items-center px-4 gap-2 bg-slate-50">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                            </div>
                            <div className="flex-1 ml-4 h-6 bg-slate-200 rounded-md opacity-50 w-full max-w-xs mx-auto hidden sm:block"></div>
                        </div>

                        <div className="flex h-[400px] sm:h-[500px]">
                            <aside className="w-16 sm:w-64 bg-slate-50 border-r border-slate-200 flex flex-col py-6 items-center sm:items-start sm:px-4 gap-6">
                                <div className="w-full space-y-2">
                                    <div className="h-10 w-10 sm:w-full bg-[#6366F1]/10 rounded-lg flex items-center justify-center sm:justify-start sm:px-3 text-[#6366F1]">
                                        <span className="material-symbols-outlined text-xl">folder</span>
                                        <span className="hidden sm:inline ml-3 font-medium text-sm">My Files</span>
                                    </div>
                                    <div className="h-10 w-10 sm:w-full hover:bg-slate-100 rounded-lg flex items-center justify-center sm:justify-start sm:px-3 text-slate-400 transition-colors cursor-pointer">
                                        <span className="material-symbols-outlined text-xl">people</span>
                                        <span className="hidden sm:inline ml-3 font-medium text-sm">Shared</span>
                                    </div>
                                    <div className="h-10 w-10 sm:w-full hover:bg-slate-100 rounded-lg flex items-center justify-center sm:justify-start sm:px-3 text-slate-400 transition-colors cursor-pointer">
                                        <span className="material-symbols-outlined text-xl">star</span>
                                        <span className="hidden sm:inline ml-3 font-medium text-sm">Starred</span>
                                    </div>
                                    <div className="h-10 w-10 sm:w-full hover:bg-slate-100 rounded-lg flex items-center justify-center sm:justify-start sm:px-3 text-slate-400 transition-colors cursor-pointer">
                                        <span className="material-symbols-outlined text-xl">schedule</span>
                                        <span className="hidden sm:inline ml-3 font-medium text-sm">Recent</span>
                                    </div>
                                </div>
                                <div className="mt-auto w-full">
                                    <div className="h-10 w-10 sm:w-full hover:bg-slate-100 rounded-lg flex items-center justify-center sm:justify-start sm:px-3 text-slate-400 transition-colors cursor-pointer">
                                        <span className="material-symbols-outlined text-xl">settings</span>
                                        <span className="hidden sm:inline ml-3 font-medium text-sm">Settings</span>
                                    </div>
                                </div>
                            </aside>

                            <section className="flex-1 flex flex-col">
                                <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6">
                                    <h3 className="font-semibold text-slate-800">My Files</h3>
                                    <div className="flex gap-3">
                                        <span className="material-symbols-outlined text-slate-400 text-xl cursor-pointer">search</span>
                                        <span className="material-symbols-outlined text-slate-400 text-xl cursor-pointer">notifications</span>
                                        <div className="w-6 h-6 rounded-full bg-emerald-500"></div>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 overflow-hidden relative">
                                    <div className="space-y-4">
                                        <div className="flex items-center p-3 bg-[#6366F1]/10 rounded-lg border border-[#6366F1]/20">
                                            <div className="w-10 h-10 rounded bg-[#6366F1] flex items-center justify-center text-white">
                                                <span className="material-symbols-outlined text-sm">description</span>
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <div className="h-2.5 w-32 bg-slate-800 rounded opacity-80 mb-1.5"></div>
                                                <div className="h-2 w-20 bg-slate-400 rounded opacity-60"></div>
                                            </div>
                                            <span className="material-symbols-outlined text-[#6366F1] text-xl">more_vert</span>
                                        </div>

                                        <div className="flex items-center p-3 hover:bg-slate-50 rounded-lg transition-colors">
                                            <div className="w-10 h-10 rounded bg-slate-200 flex items-center justify-center text-slate-400">
                                                <span className="material-symbols-outlined text-sm">image</span>
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <div className="h-2.5 w-24 bg-slate-300 rounded mb-1.5"></div>
                                                <div className="h-2 w-16 bg-slate-200 rounded"></div>
                                            </div>
                                        </div>

                                        <div className="flex items-center p-3 hover:bg-slate-50 rounded-lg transition-colors">
                                            <div className="w-10 h-10 rounded bg-slate-200 flex items-center justify-center text-slate-400">
                                                <span className="material-symbols-outlined text-sm">folder</span>
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <div className="h-2.5 w-28 bg-slate-300 rounded mb-1.5"></div>
                                                <div className="h-2 w-12 bg-slate-200 rounded"></div>
                                            </div>
                                        </div>

                                        <div className="flex items-center p-3 hover:bg-slate-50 rounded-lg transition-colors">
                                            <div className="w-10 h-10 rounded bg-slate-200 flex items-center justify-center text-slate-400">
                                                <span className="material-symbols-outlined text-sm">videocam</span>
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <div className="h-2.5 w-32 bg-slate-300 rounded mb-1.5"></div>
                                                <div className="h-2 w-24 bg-slate-200 rounded"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block">
                                        <div className="w-64 h-64 bg-slate-100 rounded-xl shadow-lg p-4 flex flex-col">
                                            <div className="flex-1 bg-slate-200 rounded-lg mb-4 relative overflow-hidden group cursor-pointer">
                                                <img
                                                    alt="Preview Image Abstract"
                                                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHlGQmFFB1B0e0cJJlyzlj7hZ8UYXR7DpaNceqTV2Hlx9Fsqqym0HvxblTLcKOberz3WNED74iDM3IKynVS9LJ-SHuBEfMWGMbymcplxjNE1JDElDthqoPonvDi5KjS1gBIYCuKoyjUaFncJkq8Ya-lDHWLhcsU2e2Q1RTUqjUcaU6wOqHNYD97VaPsbtqBF_V2wxkLeTm73F6oqeN57BKs0FtxJODeh9YZrPe8zwwSi5Bs-dOx34AlQCg7ytC2pKG98T3isf4zlg"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                                                        <span className="material-symbols-outlined text-slate-900 ml-1">play_arrow</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-purple-500 flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-white text-xs">image</span>
                                                </div>
                                                <div>
                                                    <div className="text-xs font-bold text-slate-800">My house design</div>
                                                    <div className="text-[10px] text-slate-400">jpg</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </section>
                        </div>
                    </div>

                    <div className="absolute -bottom-10 left-0 right-0 h-20 bg-[#6366F1]/20 blur-[60px] rounded-full z-[-1]"></div>
                </div>
            </main>

            <footer className="py-6 text-center text-slate-500 text-sm">
                © 2023 FileKit Inc. All rights reserved.
            </footer>
        </div>
    );
};

export default Banner;