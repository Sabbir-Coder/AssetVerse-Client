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

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  // Refs for GSAP animations
  const heroRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroButtonRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const featureCardsRef = useRef([]);
  const pricingSectionRef = useRef(null);
  const pricingCardsRef = useRef([]);
  const testimonialRef = useRef(null);
  const stepsSectionRef = useRef(null);
  const stepsRef = useRef([]);
  const faqSectionRef = useRef(null);
  const faqItemsRef = useRef([]);
  const ctaSectionRef = useRef(null);

  // Testimonials data for Swiper
  const testimonials = [
    {
      quote: "AssetVerse transformed how we manage our IT hardware. We've seen a 30% reduction in lost assets within the first six months. It's an essential tool for any modern enterprise.",
      name: "Jane Doe",
      title: "VP of IT, Innovate Corp"
    },
    {
      quote: "The real-time tracking feature has completely changed our workflow. We now have full visibility of all our assets across multiple locations.",
      name: "Michael Chen",
      title: "Operations Director, TechFlow Inc"
    },
    {
      quote: "Implementing AssetVerse was seamless. The onboarding process took less than a week and the ROI was visible within the first month.",
      name: "Sarah Williams",
      title: "CTO, Global Systems Ltd"
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

  // Pricing plans data
  const pricingPlans = [
    {
      name: "Basic",
      description: "For small teams getting started.",
      price: "$99",
      employees: "Up to 50 Employees",
      features: ["Real-time Tracking", "Basic Reporting"],
      popular: false,
      buttonText: "Choose Plan"
    },
    {
      name: "Standard",
      description: "For growing businesses that need more power.",
      price: "$249",
      employees: "Up to 250 Employees",
      features: ["All Basic Features", "Custom Reporting", "API Access"],
      popular: true,
      buttonText: "Choose Plan"
    },
    {
      name: "Premium",
      description: "For large organizations with advanced needs.",
      price: "Contact Us",
      employees: "250+ Employees",
      features: ["All Standard Features", "Dedicated Support", "Advanced Security"],
      popular: false,
      buttonText: "Contact Sales"
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

  useEffect(() => {
    // Hero section animation
    const heroTl = gsap.timeline();
    heroTl
      .fromTo(
        heroRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
      )
      .fromTo(
        heroTextRef.current?.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        heroButtonRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.4"
      );

    // About section title animation
    gsap.fromTo(
      aboutSectionRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Feature cards stagger animation
    gsap.fromTo(
      featureCardsRef.current,
      { opacity: 0, y: 60, rotateX: -15 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featureCardsRef.current[0],
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Pricing section animation
    gsap.fromTo(
      pricingSectionRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: pricingSectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Pricing cards animation with scale effect
    gsap.fromTo(
      pricingCardsRef.current,
      { opacity: 0, y: 80, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: pricingCardsRef.current[0],
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Testimonial section animation
    gsap.fromTo(
      testimonialRef.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: testimonialRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Steps section animation
    gsap.fromTo(
      stepsSectionRef.current?.querySelector('h2'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: stepsSectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Steps stagger animation with slide in
    gsap.fromTo(
      stepsRef.current,
      { opacity: 0, x: -60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: stepsRef.current[0],
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // FAQ section animation
    gsap.fromTo(
      faqSectionRef.current?.querySelector('h2'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: faqSectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // FAQ items animation
    gsap.fromTo(
      faqItemsRef.current,
      { opacity: 0, y: 40, rotateX: -10 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: faqItemsRef.current[0],
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // CTA section animation
    gsap.fromTo(
      ctaSectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

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
      <div className="@container">
        <div className="@[480px]:px-4 @[480px]:py-3">
          <div
            ref={heroRef}
            className="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-background-light dark:bg-background-dark @[480px]:rounded-xl min-h-[400px] md:min-h-[500px] relative"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(10, 37, 64, 0.8) 0%, rgba(10, 37, 64, 0.2) 60%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBVGD4FoaeZpuVXRISr1qSt-OWIZeFTSQ7r4P21ib9M9AwQs8LMI0xFVv2TzJ2tkkeuhNZJWrk3nsl-hns2XV7ociybS_kWWcOdkKdXraG3R9x3wbHPohpSDZu2JlLRKsiBH-4uWiuUG8VCik7BpyLzrSkoPXMiVZzlnu-og8SkP3NjOSVJn8oAO7wyrMh2dnv3gnlh-8Qv48HchM5tSMCf3aKWAOmkvl5cCx18L_qXzgjM7W-ejNLCe3YDpmlm8Lnn1tc4NcR-bA")`
            }}
          >
            <div ref={heroTextRef} className="flex flex-col p-6 md:p-10 gap-4">
              <h1 className="text-white tracking-tight text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Simplify Your Corporate Asset Management
              </h1>
              <p className="text-gray-200 text-base md:text-lg leading-normal max-w-2xl">
                Gain full control and visibility over your company's valuable assets, from acquisition to disposal.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="flex px-4 py-3 justify-center -mt-10 md:-mt-12 z-10">
        <button
          ref={heroButtonRef}
          className="flex w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-8 bg-gradient-to-r from-secondary-corporate to-emerald-500 text-white text-lg font-bold leading-normal tracking-wide shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          <span className="truncate">Get a Demo</span>
        </button>
      </div>

      {/* About Section */}
      <h2
        ref={aboutSectionRef}
        className="text-primary-corporate text-2xl md:text-3xl font-bold leading-tight tracking-tight px-4 pb-3 pt-12"
      >
        Why AssetVerse?
      </h2>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {features.map((feature, index) => (
          <div
            key={index}
            ref={addToFeatureRefs}
            className="flex flex-1 gap-4 rounded-xl border border-gray-200  bg-white p-6 flex-col hover:shadow-lg hover:border-secondary-corporate/50 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="text-secondary-corporate bg-secondary-corporate/10 w-12 h-12 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">{feature.icon}</span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-text-light text-lg font-bold leading-tight">
                {feature.title}
              </h3>
              <p className="text-text-muted-light text-sm font-normal leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Packages Section */}
      <div className="px-4 py-10" ref={pricingSectionRef}>
        <h2 className="text-primary-corporate text-2xl md:text-3xl font-bold leading-tight tracking-tight pb-8 text-center">
          Flexible Plans for Teams of All Sizes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              ref={addToPricingRefs}
              className={`flex flex-col gap-4 rounded-2xl p-6 relative transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 ${plan.popular
                  ? 'border-2 border-secondary-corporate bg-white  shadow-lg'
                  : 'border border-gray-200 bg-white'
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-secondary-corporate to-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                  MOST POPULAR
                </div>
              )}
              <div className="flex flex-col gap-2">
                <h3 className="text-primary-corporate text-xl font-bold">
                  {plan.name}
                </h3>
                <p className="text-text-muted-light text-sm">
                  {plan.description}
                </p>
                <p className="text-primary-corporate text-4xl font-extrabold mt-3">
                  {plan.price}
                  {plan.price !== "Contact Us" && (
                    <span className="text-base font-normal text-text-muted-light">
                      /mo
                    </span>
                  )}
                </p>
                <p className="text-text-muted-light text-sm">
                  {plan.employees}
                </p>
              </div>
              <ul className="flex flex-col gap-3 text-text-light mt-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary-corporate text-xl">
                      check_circle
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full mt-4 flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 text-base font-bold leading-normal tracking-wide transition-all duration-300 ${plan.popular
                    ? 'bg-gradient-to-r from-secondary-corporate to-emerald-500 text-white hover:shadow-lg'
                    : 'bg-secondary-corporate/15 text-secondary-corporate hover:bg-secondary-corporate/25'
                  }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial Section with Swiper */}
      <div
        ref={testimonialRef}
        className="px-4 py-12 bg-gradient-to-br from-primary-corporate/5 to-secondary-corporate/5"
      >
        <div className="max-w-3xl mx-auto">
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
                <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                  <span className="material-symbols-outlined text-secondary-corporate text-5xl mb-4 block">
                    format_quote
                  </span>
                  <p className="text-text-light italic text-lg my-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex flex-col items-center gap-1">
                    <p className="font-bold text-text-light text-lg">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-text-muted-light">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button className="swiper-button-prev-custom w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-primary-corporate hover:bg-secondary-corporate/10 transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="swiper-button-next-custom w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-primary-corporate hover:bg-secondary-corporate/10 transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div ref={stepsSectionRef} className="px-4 py-12">
        <h2 className="text-primary-corporate text-2xl md:text-3xl font-bold leading-tight tracking-tight pb-10 text-center">
          Get Started in 3 Simple Steps
        </h2>
        <div className="flex flex-col gap-8 max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} ref={addToStepsRefs} className="flex items-start gap-5 group">
              <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-secondary-corporate/20 to-emerald-500/20 text-secondary-corporate font-bold text-xl rounded-2xl group-hover:from-secondary-corporate group-hover:to-emerald-500 group-hover:text-white transition-all duration-300">
                {step.number}
              </div>
              <div className="pt-2">
                <h3 className="font-bold text-text-light text-lg mb-1">
                  {step.title}
                </h3>
                <p className="text-text-muted-light text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div
        ref={faqSectionRef}
        className="px-4 py-12 bg-gradient-to-br from-primary-corporate/5 to-secondary-corporate/5 dark:from-white/5 dark:to-white/3"
      >
        <h2 className="text-primary-corporate text-2xl md:text-3xl font-bold leading-tight tracking-tight pb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <details
              key={index}
              ref={addToFaqRefs}
              className="group rounded-xl bg-white p-5 border border-gray-200  hover:shadow-md transition-all duration-300"
            >
              <summary className="flex cursor-pointer items-center justify-between">
                <h3 className="font-bold text-text-light pr-4">
                  {faq.question}
                </h3>
                <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180 text-secondary-corporate flex-shrink-0">
                  expand_more
                </span>
              </summary>
              <p className="mt-4 text-text-muted-light  text-sm leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>

      {/* Contact CTA Section */}
      <div ref={ctaSectionRef} className="p-4 py-16 text-center">
        <h2 className="text-primary-corporate text-2xl md:text-3xl font-bold leading-tight tracking-tight">
          Ready to take control of your assets?
        </h2>
        <p className="text-text-muted-light mt-3 mb-8 text-lg">
          Let's talk about how AssetVerse can help your business grow.
        </p>
        <button className="flex w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-8 bg-gradient-to-r from-primary-corporate to-blue-700 text-white text-lg font-bold leading-normal tracking-wide mx-auto shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
          <span className="truncate">Request a Quote</span>
        </button>
      </div>

      {/* Bottom Spacer */}
      <div className="h-5 bg-background-light "></div>
    </div>
  );
};

export default Home;