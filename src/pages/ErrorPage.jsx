
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'
import { useNavigate } from 'react-router'

const ErrorPage = () => {
  const navigate = useNavigate()
  const contentRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    // Animate content entrance
    gsap.fromTo(contentRef.current.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
    )

    // Floating animation for the image
    gsap.to(imageRef.current, {
      y: -20,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    })
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative overflow-x-hidden font-sans">
      <Navbar />

      {/* Decorative Background Blobs */}
      <main className="grow flex items-center justify-center relative z-10 px-6 py-12">
 
          {/* Text Content */}
          <div ref={contentRef} className="text-center">
            {/* Illustration */}
            <div className="flex justify-center w-full">
              <div ref={imageRef} className="relative animate-pulse w-54 md:w-80">
                <img
                  src="https://cdn3d.iconscout.com/3d/premium/thumb/404-error-4461124-3696774.png"
                  alt="404 Illustration"
                  className="w-full h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">
              Page Not Found
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate(-1)}
                className="px-8 py-4 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group"
              >
                <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform text-lg">arrow_back</span>
                Go Back
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                Back to Home
                <span className="material-symbols-outlined text-lg">home</span>
              </button>
            </div>
          </div>

      </main>
      <Footer />
    </div>
  )
}

export default ErrorPage
