import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const stepsRef = useRef(null);

  useEffect(() => {
    // Hero animation
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
      });

      gsap.from('.hero-button', {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        delay: 0.6,
        ease: 'back.out(1.7)'
      });

      // Feature cards animation
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 60,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      });



      // Steps animation
      gsap.from('.step-item', {
        scrollTrigger: {
          trigger: stepsRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        x: -50,
        stagger: 0.3,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Final CTA fade-in
      gsap.from('.final-cta', {
        scrollTrigger: {
          trigger: '.final-cta',
          start: 'top 90%',
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out'
      });
    });

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      quote: "AssetVerse transformed how we manage our IT hardware. We've seen a 30% reduction in lost assets within the first six months.",
      author: "Sarah Johnson",
      role: "VP of IT, TechCorp",
      rating: 5
    },
    {
      quote: "The real-time tracking feature has been a game-changer for our distributed team. Highly recommended!",
      author: "Michael Chen",
      role: "Operations Manager, GlobalTech",
      rating: 5
    },
    {
      quote: "Excellent customer support and intuitive interface. Our asset management has never been easier.",
      author: "Emily Rodriguez",
      role: "CFO, InnovateCo",
      rating: 5
    }
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-linear-to-b from-white to-gray-50">

      {/* Hero Section */}
      <main>
        <div className="@container" ref={heroRef}>
          <div className="@[480px]:p-4 p-0">
            <div
              className="relative flex min-h-[600px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 items-start justify-end px-4 pb-16 @[480px]:px-10 overflow-hidden"
              style={{
                backgroundImage: 'linear-gradient(135deg, rgba(19, 91, 236, 0.9) 0%, rgba(16, 22, 34, 0.8) 100%), url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070")'
              }}
            >
              {/* Animated background particles */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
                <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-1000"></div>
              </div>

              <div className="relative z-10 flex flex-col gap-4 text-left max-w-3xl">
                <h1 className="hero-title text-white text-5xl md:text-6xl font-black leading-tight tracking-tight">
                  Effortless Asset Management for Your Business
                </h1>
                <h2 className="hero-subtitle text-white/90 text-lg md:text-xl font-normal leading-relaxed">
                  Track, manage, and optimize every company asset from one central hub with AI-powered insights.
                </h2>
                <button className="hero-button flex w-fit items-center justify-center gap-2 rounded-xl h-14 px-8 bg-white text-primary text-base font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-xl hover:scale-105">
                  <span>Get Started Free</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <section className="py-16 px-4" ref={featuresRef}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-[#111318] text-3xl md:text-4xl font-bold leading-tight text-center mb-4">
              Why Choose AssetVerse?
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Streamline your operations with cutting-edge technology designed for modern businesses
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Efficiency Card */}
              <div className="feature-card group flex flex-col items-center text-center p-8 rounded-2xl border border-gray-200 bg-linear-to-br from-blue-50 to-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 opacity-100">
                <div className="flex items-center justify-center size-16 bg-linear-to-br from-blue-500 to-blue-600 text-white rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="material-symbols-outlined text-4xl">trending_up</span>
                </div>
                <h3 className="font-bold text-lg text-[#111318] mb-3">Increase Efficiency</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Streamline asset tracking and deployment across your organization with automated workflows.</p>
              </div>

              {/* Cost Reduction Card */}
              <div className="feature-card group flex flex-col items-center text-center p-8 rounded-2xl border border-gray-200 bg-linear-to-br from-green-50 to-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 opacity-100">
                <div className="flex items-center justify-center size-16 bg-linear-to-br from-green-500 to-green-600 text-white rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="material-symbols-outlined text-4xl">savings</span>
                </div>
                <h3 className="font-bold text-lg text-[#111318] mb-3">Reduce Costs</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Minimize asset loss and optimize procurement decisions with data-driven insights.</p>
              </div>

              {/* Accountability Card */}
              <div className="feature-card group flex flex-col items-center text-center p-8 rounded-2xl border border-gray-200 bg-linear-to-br from-purple-50 to-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 opacity-100">
                <div className="flex items-center justify-center size-16 bg-linear-to-br from-purple-500 to-purple-600 text-white rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="material-symbols-outlined text-4xl">verified_user</span>
                </div>
                <h3 className="font-bold text-lg text-[#111318] mb-3">Improve Accountability</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Track ownership and maintain complete asset visibility with real-time updates.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section with Swiper */}
        <section className="py-16 bg-linear-to-br from-primary/5 to-purple-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-[#111318] text-3xl md:text-4xl font-bold leading-tight text-center mb-12">
              Trusted by Industry Leaders
            </h2>
            <Swiper
              modules={[Autoplay, Pagination, EffectFade]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              effect="fade"
              className="testimonial-swiper pb-12"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
                    <div className="flex justify-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-yellow-400 text-3xl">star</span>
                      ))}
                    </div>
                    <p className="text-gray-700 text-lg md:text-xl italic text-center mb-8 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="text-center">
                      <p className="font-bold text-[#111318] text-lg">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-linear-to-r from-primary to-blue-700" ref={statsRef}>
          <div className="px-4 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                <p className="stat-number text-5xl md:text-6xl font-black text-white mb-2">500</p>
                <p className="text-white/90 text-sm md:text-base font-medium">Happy Clients</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="stat-number text-5xl md:text-6xl font-black text-white mb-2">99</p>
                <p className="text-white/90 text-sm md:text-base font-medium">Asset Accuracy %</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="stat-number text-5xl md:text-6xl font-black text-white mb-2">25000</p>
                <p className="text-white/90 text-sm md:text-base font-medium">Assets Tracked</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-4 bg-white" ref={stepsRef}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[#111318] text-3xl md:text-4xl font-bold leading-tight text-center mb-4">
              Get Started in 3 Easy Steps
            </h2>
            <p className="text-gray-600 text-center mb-12">Simple setup, powerful results</p>
            <div className="space-y-8">
              <div className="step-item flex items-start gap-6 p-6 rounded-2xl bg-linear-to-r from-blue-50 to-transparent hover:shadow-lg transition-all duration-300">
                <div className="shrink-0 flex items-center justify-center size-14 bg-linear-to-br from-primary to-blue-600 text-white rounded-2xl font-bold text-xl shadow-lg">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-xl text-[#111318] mb-2">Sign Up & Configure</h3>
                  <p className="text-gray-600 leading-relaxed">Create your account and set up your organization in minutes with our intuitive onboarding process.</p>
                </div>
              </div>
              <div className="step-item flex items-start gap-6 p-6 rounded-2xl bg-linear-to-r from-green-50 to-transparent hover:shadow-lg transition-all duration-300">
                <div className="shrink-0 flex items-center justify-center size-14 bg-linear-to-br from-green-500 to-green-600 text-white rounded-2xl font-bold text-xl shadow-lg">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-xl text-[#111318] mb-2">Import Your Assets</h3>
                  <p className="text-gray-600 leading-relaxed">Easily add your company assets using bulk import, QR codes, or our simple manual interface.</p>
                </div>
              </div>
              <div className="step-item flex items-start gap-6 p-6 rounded-2xl bg-linear-to-r from-purple-50 to-transparent hover:shadow-lg transition-all duration-300">
                <div className="shrink-0 flex items-center justify-center size-14 bg-linear-to-br from-purple-500 to-purple-600 text-white rounded-2xl font-bold text-xl shadow-lg">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-xl text-[#111318] mb-2">Track & Optimize</h3>
                  <p className="text-gray-600 leading-relaxed">Assign equipment to employees and start tracking everything with real-time analytics and insights.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="final-cta py-20 px-4 text-center bg-linear-to-br from-primary via-blue-600 to-purple-600 relative overflow-hidden" style={{ marginTop: '3rem' }}>
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight mb-4">
              Ready to Transform Your Asset Management?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Join hundreds of companies already optimizing their operations with AssetVerse
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center gap-2 rounded-xl h-14 px-8 bg-white text-primary text-base font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:scale-105">
                <span>Start Free Trial</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-xl h-14 px-8 bg-transparent border-2 border-white text-white text-base font-bold hover:bg-white/10 transition-all duration-300">
                <span>Schedule Demo</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">AssetVerse</h3>
              <p className="text-gray-400 text-sm">Modern asset management for modern businesses.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-400">© 2024 AssetVerse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;