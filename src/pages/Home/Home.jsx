import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import Banner from './Banner';
import Features from './Features';
import PackageCard from '../Dashboard/HrPages/PackageCard';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useRole from '../../hooks/useRole';
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const { role } = useRole()

  const { isLoading, data: upgradePackages = [] } = useQuery({
    queryKey: ["packages"],
    enabled: !!user?.email, // ⬅️ IMPORTANT
    queryFn: async () => {
      const res = await axiosSecure.get("/packages");
      return res.data;
    },
  });
  // Refs for GSAP animations
  const heroRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroButtonRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const featureCardsRef = useRef([]);
  const pricingSectionRef = useRef(null);
  const pricingCardsRef = useRef([]);
  const testimonialRef = useRef(null);
  const testimonialHeaderRef = useRef(null);
  const testimonialSwiperRef = useRef(null);
  const stepsSectionRef = useRef(null);
  const stepsHeaderRef = useRef(null);
  const stepsRef = useRef([]);
  const faqSectionRef = useRef(null);
  const faqHeaderRef = useRef(null);
  const faqItemsRef = useRef([]);
  const ctaSectionRef = useRef(null);

  useEffect(() => {
    // Feature Cards
    const cards = featureCardsRef.current;
    if (cards.length > 0) {
      gsap.fromTo(cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // Animate "Why AssetVerse" section header
    if (aboutSectionRef.current) {
      gsap.fromTo(aboutSectionRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: "top 85%",
          }
        }
      );
    }

    // Helper for Section Headers
    const animateHeader = (ref) => {
      if (ref.current) {
        gsap.fromTo(ref.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
            }
          }
        );
      }
    };

    animateHeader(testimonialHeaderRef);
    animateHeader(stepsHeaderRef);
    animateHeader(faqHeaderRef);

    // Testimonials Swiper Container
    if (testimonialSwiperRef.current) {
      gsap.fromTo(testimonialSwiperRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: testimonialSwiperRef.current,
            start: "top 85%",
          }
        }
      );
    }

    // Steps Items
    const stepItems = stepsRef.current;
    if (stepItems.length > 0) {
      gsap.fromTo(stepItems,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stepsSectionRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // FAQ Items
    const faqItems = faqItemsRef.current;
    if (faqItems.length > 0) {
      gsap.fromTo(faqItems,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: faqSectionRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // CTA Section
    if (ctaSectionRef.current) {
      gsap.fromTo(ctaSectionRef.current.children,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ctaSectionRef.current,
            start: "top 85%",
          }
        }
      );
    }
  }, []);

  // Separate effect for Packages as they are loaded asynchronously
  useEffect(() => {
    const pricingCards = pricingCardsRef.current;

    // Ensure we have data and refs before animating
    if (upgradePackages.length > 0 && pricingCards.length > 0 && pricingSectionRef.current) {
      // Clear previous animations/state if needed

      gsap.fromTo(pricingCards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pricingSectionRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, [upgradePackages]);

  // Testimonials data for Swiper
  const testimonials = [
    {
      quote: "AssetVerse transformed how we manage our IT hardware. We've seen a 30% reduction in lost assets within the first six months. It's an essential tool for any modern enterprise.",
      name: "Jane Doe",
      title: "VP of IT, Innovate Corp",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      quote: "The real-time tracking feature has completely changed our workflow. We now have full visibility of all our assets across multiple locations.",
      name: "Michael Chen",
      title: "Operations Director, TechFlow Inc",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      quote: "Implementing AssetVerse was seamless. The onboarding process took less than a week and the ROI was visible within the first month.",
      name: "Sarah Williams",
      title: "CTO, Global Systems Ltd",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

  // Features data
  const features = [
    {
      icon: "trending_up",
      title: "Increase Efficiency",
      description: "Streamline asset tracking and deployment."
    },
    {
      icon: "shield",
      title: "Reduce Costs",
      description: "Minimize asset loss and optimize procurement."
    },
    {
      icon: "gavel",
      title: "Ensure Compliance",
      description: "Maintain regulatory and internal policy adherence."
    }
  ];



  // Steps data
  const steps = [
    {
      number: 1,
      title: "Onboard & Integrate",
      description: "Easily import your existing asset data and connect with your current software stack in minutes."
    },
    {
      number: 2,
      title: "Track & Manage",
      description: "Use mobile scanning and real-time dashboards to monitor asset location, status, and maintenance schedules."
    },
    {
      number: 3,
      title: "Optimize & Report",
      description: "Generate insightful reports to make data-driven decisions on procurement, lifecycle, and cost-saving."
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use industry-standard encryption and security protocols to ensure your data is safe and confidential at all times."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We offer comprehensive support through email, chat, and phone. Our Premium plan includes a dedicated account manager for personalized assistance."
    },
    {
      question: "Can AssetVerse integrate with other tools?",
      answer: "Yes, our Standard and Premium plans include API access, allowing you to integrate AssetVerse with your existing HR, finance, and IT management systems."
    }
  ];

  // Helper function to add refs to arrays
  const addToFeatureRefs = (el) => {
    if (el && !featureCardsRef.current.includes(el)) {
      featureCardsRef.current.push(el);
    }
  };

  const addToPricingRefs = (el) => {
    if (el && !pricingCardsRef.current.includes(el)) {
      pricingCardsRef.current.push(el);
    }
  };

  const addToStepsRefs = (el) => {
    if (el && !stepsRef.current.includes(el)) {
      stepsRef.current.push(el);
    }
  };

  const addToFaqRefs = (el) => {
    if (el && !faqItemsRef.current.includes(el)) {
      faqItemsRef.current.push(el);
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
      {/* Hero Section with Background Image */}
      <Banner />
      <Features />

      {/* Why AssetVerse Section */}
      <section className="py-20 px-4  relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-corporate/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-corporate/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div ref={aboutSectionRef} className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-secondary-corporate font-bold tracking-wider uppercase text-sm mb-3 block">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-bold text-black/80 mb-6 leading-tight">
              Empowering Your Business with <span className="text-blue-700">Smart Asset Management</span>
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed">
              Experience the next generation of asset tracking. We combine powerful features with intuitive design to streamline your operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                ref={addToFeatureRefs}
                className="group relative bg-slate-800/10 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-2xl border border-slate-200 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-corporate/10 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500" />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-corporate to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-black/80 mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="mt-6 flex items-center text-primary-corporate font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Learn more <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      {
        user && role === 'hr' && (
          <section id='pricing' ref={pricingSectionRef} className="py-20 px-4 relative overflow-hidden bg-slate-50/50">
            {/* Decorative background blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
              <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
              <div className="absolute bottom-[20%] right-[10%] w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-16 max-w-3xl mx-auto">
                <span className="text-secondary-corporate font-bold tracking-wider uppercase text-sm mb-3 block">Pricing Plans</span>
                <h2 className="text-4xl md:text-5xl font-bold text-black/80 mb-6 leading-tight">
                  Choose the Perfect Plan for <span className="text-blue-700">Your Team</span>
                </h2>
                <p className="text-lg text-gray-500">
                  Scalable solutions designed to grow with your business needs.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
                {upgradePackages.map(plan => (
                  <div key={plan._id} ref={addToPricingRefs} className="h-full">
                    <PackageCard plan={plan} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      }

      {/* Testimonial Section with Swiper */}
      <section id='testimonials' className="py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-corporate/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div ref={testimonialRef} className="max-w-7xl mx-auto relative z-10">
          <div ref={testimonialHeaderRef} className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-secondary-corporate font-bold tracking-wider uppercase text-sm mb-3 block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold text-black/80">
              Trusted by <span className="text-blue-700">Industry Leaders</span>
            </h2>
          </div>

          <div ref={testimonialSwiperRef} className="max-w-4xl mx-auto">
            <Swiper
              modules={[Autoplay, Pagination, EffectFade, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                bulletClass: 'swiper-pagination-bullet !bg-secondary-corporate/30',
                bulletActiveClass: 'swiper-pagination-bullet-active !bg-secondary-corporate',
              }}
              navigation={{
                prevEl: '.swiper-button-prev-custom',
                nextEl: '.swiper-button-next-custom',
              }}
              loop={true}
              className="testimonial-swiper"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-white/50 text-center mx-4 my-8 relative group">
                    <div className="w-20 h-20 mx-auto mb-6 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-corporate to-secondary-corporate rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity" />
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg relative z-10"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-md z-20">
                        <span className="material-symbols-outlined text-secondary-corporate text-lg">
                          format_quote
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-600 italic text-xl my-6 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex flex-col items-center gap-1">
                      <p className="font-bold text-black/80 text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-slate-500 font-medium">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Custom Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-2">
              <button className="swiper-button-prev-custom w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-primary-corporate hover:scale-110 shadow-sm hover:shadow-md transition-all">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="swiper-button-next-custom w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-primary-corporate hover:scale-110 shadow-sm hover:shadow-md transition-all">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id='how-it-works' ref={stepsSectionRef} className="py-20 px-4 relative overflow-hidden bg-slate-50/50">
        <div className="max-w-7xl mx-auto relative z-10">
          <div ref={stepsHeaderRef} className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-secondary-corporate font-bold tracking-wider uppercase text-sm mb-3 block">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-bold text-black/80 mb-6 leading-tight">
              Get Started in <span className="text-blue-700">3 Simple Steps</span>
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed">
              We've streamlined the process so you can start managing assets in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} ref={addToStepsRefs} className="group relative bg-white rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-2xl border border-slate-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-secondary-corporate/5 to-transparent rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-500" />

                <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-gradient-to-br from-secondary-corporate/10 to-emerald-500/10 text-secondary-corporate font-bold text-2xl rounded-2xl group-hover:from-secondary-corporate group-hover:to-emerald-500 group-hover:text-white transition-all duration-300 mb-6">
                  {step.number}
                </div>
                <div className="relative z-10">
                  <h3 className="font-bold text-black/80 text-xl mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id='faq' ref={faqSectionRef} className="py-20 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary-corporate/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div ref={faqHeaderRef} className="text-center mb-16">
            <span className="text-secondary-corporate font-bold tracking-wider uppercase text-sm mb-3 block">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-bold text-black/80 mb-6 leading-tight">
              Frequently Asked <span className="text-blue-700">Questions</span>
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                ref={addToFaqRefs}
                className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <summary className="flex cursor-pointer items-center justify-between">
                  <h3 className="font-bold text-black/80 text-lg pr-4">
                    {faq.question}
                  </h3>
                  <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180 text-secondary-corporate flex-shrink-0">
                    expand_more
                  </span>
                </summary>
                <p className="mt-4 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id='contact' ref={ctaSectionRef} className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[2.5rem] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden group">
          {/* Animated Background */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 transition-transform duration-700 group-hover:scale-110" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Ready to take control of <br /><span className="text-blue-400">your assets?</span></h2>
            <p className="text-slate-400 mt-4 mb-10 text-lg md:text-xl max-w-2xl mx-auto">
              Join thousands of companies using AssetVerse to streamline their operations today.
            </p>
            <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300 group-hover:scale-105">
              <span className="mr-2">Request a Quote</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Bottom Spacer */}
      <div className="h-5 bg-background-light "></div>
    </div>
  );
};

export default Home;