<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>FileKit Banner</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,typography"></script>
<script>
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        primary: "#6366F1", // Indigo accent from the UI mockup
                        "background-light": "#F8FAFC", // Slate 50
                        "background-dark": "#0B0F15", // Deep dark blue/black from screenshot
                        "surface-dark": "#161B26",
                    },
                    fontFamily: {
                        display: ["Inter", "sans-serif"],
                        body: ["Inter", "sans-serif"],
                    },
                    borderRadius: {
                        DEFAULT: "0.5rem",
                        'xl': "1rem",
                        '2xl': "1.5rem",
                    },
                },
            },
        };
    </script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet"/>
<style>
        body { font-family: 'Inter', sans-serif; }html { scroll-behavior: smooth; }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white transition-colors duration-300 min-h-screen flex flex-col">
<header class="w-full px-6 py-4 flex justify-between items-center relative z-20">
<div class="flex items-center gap-2">
<div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/30">
                F
            </div>
<span class="text-xl font-bold tracking-tight text-slate-900 dark:text-white">FileKit</span>
</div>
<button class="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
<span class="material-icons-round text-slate-600 dark:text-slate-300">menu</span>
</button>
</header>
<main class="flex-grow flex flex-col px-6 pt-6 pb-12 relative overflow-hidden">
<div class="absolute top-[-10%] left-1/2 transform -translate-x-1/2 w-[150%] h-[50vh] bg-emerald-500/10 dark:bg-emerald-500/20 blur-[80px] rounded-[100%] pointer-events-none z-0"></div>
<div class="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none z-0"></div>
<div class="relative z-10 flex flex-col items-center text-center mb-10 md:items-start md:text-left max-w-2xl mx-auto">
<h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-slate-900 dark:text-white">
                Empower your workspace simplify your files with <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary">FileKit</span>
</h1>
<p class="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
                Streamline, secure, and share files effortlessly. Boost collaboration and productivity in one intuitive platform.
            </p>
<div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
<button class="w-full sm:w-auto px-8 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-semibold text-base shadow-lg hover:translate-y-[-1px] transition-transform duration-200 flex items-center justify-center gap-2">
                    Subscribe
                </button>
<button class="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl font-medium text-base hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                    Free Trial
                </button>
</div>
</div>
<div class="relative z-10 w-full max-w-4xl mx-auto mt-4 perspective-1000">
<div class="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden transform rotate-x-2 transition-transform duration-500 hover:rotate-0">
<div class="h-10 border-b border-slate-100 dark:border-slate-700/50 flex items-center px-4 gap-2 bg-slate-50 dark:bg-[#1A202C]">
<div class="flex gap-1.5">
<div class="w-3 h-3 rounded-full bg-red-400"></div>
<div class="w-3 h-3 rounded-full bg-amber-400"></div>
<div class="w-3 h-3 rounded-full bg-emerald-400"></div>
</div>
<div class="flex-1 ml-4 h-6 bg-slate-200 dark:bg-slate-700 rounded-md opacity-50 w-full max-w-xs mx-auto hidden sm:block"></div>
</div>
<div class="flex h-[400px] sm:h-[500px]">
<aside class="w-16 sm:w-64 bg-slate-50 dark:bg-[#131720] border-r border-slate-200 dark:border-slate-700/50 flex flex-col py-6 items-center sm:items-start sm:px-4 gap-6">
<div class="w-full space-y-2">
<div class="h-10 w-10 sm:w-full bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center sm:justify-start sm:px-3 text-primary">
<span class="material-icons-round text-xl">folder</span>
<span class="hidden sm:inline ml-3 font-medium text-sm">My Files</span>
</div>
<div class="h-10 w-10 sm:w-full hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center justify-center sm:justify-start sm:px-3 text-slate-400 transition-colors cursor-pointer">
<span class="material-icons-round text-xl">people</span>
<span class="hidden sm:inline ml-3 font-medium text-sm">Shared</span>
</div>
<div class="h-10 w-10 sm:w-full hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center justify-center sm:justify-start sm:px-3 text-slate-400 transition-colors cursor-pointer">
<span class="material-icons-round text-xl">star</span>
<span class="hidden sm:inline ml-3 font-medium text-sm">Starred</span>
</div>
<div class="h-10 w-10 sm:w-full hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center justify-center sm:justify-start sm:px-3 text-slate-400 transition-colors cursor-pointer">
<span class="material-icons-round text-xl">schedule</span>
<span class="hidden sm:inline ml-3 font-medium text-sm">Recent</span>
</div>
</div>
<div class="mt-auto w-full">
<div class="h-10 w-10 sm:w-full hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center justify-center sm:justify-start sm:px-3 text-slate-400 transition-colors cursor-pointer">
<span class="material-icons-round text-xl">settings</span>
<span class="hidden sm:inline ml-3 font-medium text-sm">Settings</span>
</div>
</div>
</aside>
<section class="flex-1 flex flex-col">
<div class="h-16 border-b border-slate-200 dark:border-slate-700/50 flex items-center justify-between px-6">
<h3 class="font-semibold text-slate-800 dark:text-white">My Files</h3>
<div class="flex gap-3">
<span class="material-icons-round text-slate-400 text-xl cursor-pointer">search</span>
<span class="material-icons-round text-slate-400 text-xl cursor-pointer">notifications</span>
<div class="w-6 h-6 rounded-full bg-emerald-500"></div>
</div>
</div>
<div class="p-6 flex-1 overflow-hidden relative">
<div class="space-y-4">
<div class="flex items-center p-3 bg-primary/10 dark:bg-primary/20 rounded-lg border border-primary/20">
<div class="w-10 h-10 rounded bg-primary flex items-center justify-center text-white">
<span class="material-icons-round text-sm">description</span>
</div>
<div class="ml-4 flex-1">
<div class="h-2.5 w-32 bg-slate-800 dark:bg-white rounded opacity-80 mb-1.5"></div>
<div class="h-2 w-20 bg-slate-400 dark:bg-slate-500 rounded opacity-60"></div>
</div>
<span class="material-icons-round text-primary text-xl">more_vert</span>
</div>
<div class="flex items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors">
<div class="w-10 h-10 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400">
<span class="material-icons-round text-sm">image</span>
</div>
<div class="ml-4 flex-1">
<div class="h-2.5 w-24 bg-slate-300 dark:bg-slate-600 rounded mb-1.5"></div>
<div class="h-2 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
</div>
</div>
<div class="flex items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors">
<div class="w-10 h-10 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400">
<span class="material-icons-round text-sm">folder</span>
</div>
<div class="ml-4 flex-1">
<div class="h-2.5 w-28 bg-slate-300 dark:bg-slate-600 rounded mb-1.5"></div>
<div class="h-2 w-12 bg-slate-200 dark:bg-slate-700 rounded"></div>
</div>
</div>
<div class="flex items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors">
<div class="w-10 h-10 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400">
<span class="material-icons-round text-sm">videocam</span>
</div>
<div class="ml-4 flex-1">
<div class="h-2.5 w-32 bg-slate-300 dark:bg-slate-600 rounded mb-1.5"></div>
<div class="h-2 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
</div>
</div>
</div>
<div class="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block">
<div class="w-64 h-64 bg-slate-100 dark:bg-slate-800 rounded-xl shadow-lg p-4 flex flex-col">
<div class="flex-1 bg-slate-200 dark:bg-slate-700 rounded-lg mb-4 relative overflow-hidden group cursor-pointer">
<img alt="Preview Image Abstract" class="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHlGQmFFB1B0e0cJJlyzlj7hZ8UYXR7DpaNceqTV2Hlx9Fsqqym0HvxblTLcKOberz3WNED74iDM3IKynVS9LJ-SHuBEfMWGMbymcplxjNE1JDElDthqoPonvDi5KjS1gBIYCuKoyjUaFncJkq8Ya-lDHWLhcsU2e2Q1RTUqjUcaU6wOqHNYD97VaPsbtqBF_V2wxkLeTm73F6oqeN57BKs0FtxJODeh9YZrPe8zwwSi5Bs-dOx34AlQCg7ytC2pKG98T3isf4zlg"/>
<div class="absolute inset-0 flex items-center justify-center">
<div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
<span class="material-icons-round text-slate-900 ml-1">play_arrow</span>
</div>
</div>
</div>
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded bg-purple-500 flex items-center justify-center">
<span class="material-icons-round text-white text-xs">image</span>
</div>
<div>
<div class="text-xs font-bold text-slate-800 dark:text-white">My house design</div>
<div class="text-[10px] text-slate-400">jpg</div>
</div>
</div>
</div>
</div>
</div>
</section>
</div>
</div>
<div class="absolute -bottom-10 left-0 right-0 h-20 bg-primary/20 blur-[60px] rounded-full z-[-1]"></div>
</div>
</main>
<footer class="py-6 text-center text-slate-500 dark:text-slate-600 text-sm">
        © 2023 FileKit Inc. All rights reserved.
    </footer>
<script>
        // Check system preference for dark mode initially
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        }
        // Optional: Manual toggle for testing (Double tap logo to toggle)
        document.querySelector('.w-8.h-8').addEventListener('dblclick', () => {
            document.documentElement.classList.toggle('dark');
        });
    </script>

</body></html>