import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = ({ value, prefix = "", suffix = "", duration = 2 }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.fromTo(
      element,
      { innerText: 0 },
      {
        innerText: value,
        duration: duration,
        ease: "power2.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          once: true,
        },
        onUpdate: function () {
          element.innerText = Math.ceil(this.targets()[0].innerText).toLocaleString();
        },
      }
    );
  }, [value, duration]);

  return (
    <span className="flex items-baseline">
      {prefix && <span className="text-xl sm:text-2xl md:text-3xl mr-1 text-white/90">{prefix}</span>}
      <span ref={elementRef} className="tabular-nums tracking-tight">0</span>
      {suffix && <span className="text-xl sm:text-2xl md:text-3xl ml-1 text-white/90">{suffix}</span>}
    </span>
  );
};

const Metric = ({ icon, value, label, prefix = "", suffix = "" }) => (
  <div className="group relative flex flex-col items-center justify-center p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    <div className="w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner ring-1 ring-white/10">
      <i className={`ph ${icon} text-4xl text-blue-300 group-hover:text-blue-200 drop-shadow-md`} />
    </div>
    <div className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 mb-2">
      <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
    </div>
    <div className="text-sm sm:text-base text-slate-300 font-semibold tracking-wider uppercase opacity-90">{label}</div>
  </div>
);

const ActionButton = ({ icon, label, primary }) => (
  <button
    className={`group relative flex-none w-32 p-4 rounded-2xl flex flex-col items-center gap-3 shadow-sm active:scale-95 transition-all duration-300 overflow-hidden
      ${primary
        ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-blue-500/30 shadow-lg"
        : "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-500/50"
      }`}
  >
    <div className={`absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ${primary ? '' : 'hidden'}`} />
    <i className={`ph-bold ${icon} text-2xl transition-transform group-hover:scale-110 ${primary ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
    <span className="text-xs font-semibold tracking-wide">{label}</span>
  </button>
);

const Features = () => {
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <main className="flex-1 pb-16">
      <div className="relative w-full overflow-hidden shadow-2xl py-24 bg-slate-900">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          style={{ backgroundImage: "url('https://i.ibb.co.com/6czRKGVJ/3409297.jpg')" }}
        />

        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px]" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-6 text-white">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <Metric
                icon="ph-user-circle-plus"
                value={350}
                suffix="+"
                label="Happy Clients"
              />
              <Metric
                icon="ph-buildings"
                value={1300}
                prefix="BDT "
                suffix=" MN+"
                label="AUM"
              />
              <Metric
                icon="ph-hand-coins"
                value={4}
                label="Mutual Funds"
              />
              <Metric
                icon="ph-chart-line-up"
                value={229}
                prefix="BDT "
                suffix=" MN+"
                label="Client Profits"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Features;
