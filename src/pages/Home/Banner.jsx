import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import gsap from "gsap";


import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";

const Banner = () => {
  const heroTextRef = useRef(null);
  const heroVisualRef = useRef(null);
  const assetsCardRef = useRef(null);
  const requestCardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text animation
      gsap.from(".hero-text > *", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Swiper / visual container
      gsap.from(heroVisualRef.current, {
        opacity: 0,
        x: 60,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      });

      // Floating cards
      gsap.from(assetsCardRef.current, {
        opacity: 0,
        y: -30,
        duration: 1,
        ease: "power3.out",
        delay: 0.8,
      });

      gsap.from(requestCardRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        delay: 1,
      });

      // Floating subtle motion (infinite)
      gsap.to([assetsCardRef.current, requestCardRef.current], {
        y: "+=10",
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert(); // cleanup
  }, []);



  const useInfiniteCounter = ({
    start = 0,
    end = 1284,
    duration = 20000,
  }) => {
    const [value, setValue] = useState(start);

    useEffect(() => {
      let startTime = null;

      const animate = (time) => {
        if (!startTime) startTime = time;
        const progress = time - startTime;
        const percentage = Math.min(progress / duration, 1);

        const currentValue = Math.floor(
          start + percentage * (end - start)
        );

        setValue(currentValue);

        if (percentage < 1) {
          requestAnimationFrame(animate);
        } else {
          startTime = null;
          requestAnimationFrame(animate); // 🔁 infinite loop
        }
      };

      requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animate);
    }, [start, end, duration]);

    return value;
  };


  const assetsCount = useInfiniteCounter({
    start: 0,
    end: 1284,
    duration: 20500,
  });


  return (
    <section ref={heroVisualRef} className="relative overflow-hidden bg-gradient-to-br from-[#2e4057]/5 via-white to-[#048ba8]/5 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">

      {/* Decorative blur elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#2e4057]/10 dark:bg-[#2e4057]/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#048ba8]/10 dark:bg-[#048ba8]/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div ref={heroVisualRef} className="space-y-6 hero-text">
          <span ref={heroTextRef} className="inline-block px-4 py-1 text-sm font-medium text-[#048ba8] dark:text-[#4db4c7] bg-[#048ba8]/10 dark:bg-[#048ba8]/20 rounded-full">
            Smart Asset Management Platform
          </span>

          <h1 ref={heroTextRef} className="text-4xl md:text-5xl xl:text-6xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
            Track, Manage & Optimize <br />
            <span className="text-[#2e4057] dark:text-[#5c6d7d]">Your Company Assets</span>
          </h1>

          <p ref={heroTextRef} className="text-slate-600 dark:text-slate-400 text-lg max-w-xl">
            A centralized solution to manage assets, monitor usage, control requests,
            and improve operational efficiency — all in one dashboard.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link to='/login' className="px-6 cursor-pointer py-3 rounded-xl bg-[#2e4057] dark:bg-[#5c6d7d] text-white font-semibold shadow-lg hover:bg-[#293a4f] dark:hover:bg-[#2e4057] transition">
              Get Started
            </Link>

            <button ref={heroTextRef} className="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition">
              View Demo
            </button>
          </div>

          <div ref={heroTextRef} className="flex items-center gap-6 pt-6 text-sm text-slate-600 dark:text-slate-400">
            <span>✔ Secure</span>
            <span>✔ Role Based Access</span>
            <span>✔ Real-time Tracking</span>
          </div>
        </div>

        {/* RIGHT CONTENT (Swiper / Image / Dashboard Mock) */}
        {/* RIGHT CONTENT (Swiper / Dashboard Preview) */}
        <div className="relative hero-visual">
          <div className="relative rounded-2xl shadow-2xl bg-white dark:bg-slate-800 p-4 overflow-hidden border border-slate-200 dark:border-slate-700">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop
              pagination={{ clickable: true }}
              className="h-[260px] md:h-80 rounded-xl"
              onSlideChangeTransitionStart={(swiper) => {
                const activeImg =
                  swiper.el.querySelector(".swiper-slide-active img");

                if (!activeImg) return;

                gsap.fromTo(
                  activeImg,
                  { scale: 1.08, opacity: 0.7 },
                  {
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                  }
                );
              }}
            >


              <SwiperSlide>
                <div className="h-full rounded-xl bg-linear-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
                  <img
                    src="https://i.ibb.co.com/5XqHBxrQ/slider1.jpg"
                    alt="Dashboard Preview"
                    className="object-cover w-full h-full"
                  />
                </div>
              </SwiperSlide>

              {/* Slide 2 */}
              <SwiperSlide>
                <div className="h-full rounded-xl bg-linear-to-br from-indigo-100 to-purple-200 flex items-center justify-center">
                  <img
                    src="https://i.ibb.co.com/WWvByPG6/slider2.jpg"
                    alt="Assets Overview"
                    className="object-cover w-full h-full"
                  />
                </div>
              </SwiperSlide>

              {/* Slide 3 */}
              <SwiperSlide>
                <div className="h-full rounded-xl bg-linear-to-br from-emerald-100 to-teal-200 flex items-center justify-center">
                  <img
                    src="https://i.ibb.co.com/wNMLcHf2/slider3.webp"
                    alt="Reports & Analytics"
                    className="object-cover w-full h-full"
                  />
                </div>
              </SwiperSlide>
              {/* Slide 4 */}
              <SwiperSlide>
                <div className="h-full rounded-xl bg-linear-to-br from-emerald-100 to-teal-200 flex items-center justify-center">
                  <img
                    src="https://i.ibb.co.com/1trZ7sZ7/slider4.jpg"
                    alt="Reports & Analytics"
                    className="object-cover w-full h-full"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          {/* Floating cards */}
          <div ref={assetsCardRef} className="absolute z-10 -top-6 -left-6 bg-white dark:bg-slate-800 shadow-lg rounded-xl p-4 w-40 text-sm border border-slate-200 dark:border-slate-700">
            <p className="font-semibold text-slate-900 dark:text-slate-100">Assets</p>
            <p className="text-[#2e4057] dark:text-[#5c6d7d] text-xl font-bold">
              {assetsCount.toLocaleString()}
            </p>

          </div>

          <div ref={assetsCardRef} className="absolute z-9 -bottom-6 -right-6 bg-white dark:bg-slate-800 shadow-lg rounded-xl p-4 w-40 text-sm border border-slate-200 dark:border-slate-700">
            <p className="font-semibold text-slate-900 dark:text-slate-100">Requests</p>
            <p className="text-[#048ba8] dark:text-[#4db4c7] text-xl font-bold">98%</p>
          </div>
        </div>


      </div>
    </section>
  )
}

export default Banner
