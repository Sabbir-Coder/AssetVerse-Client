const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-blue-100">
      
      {/* Decorative blur elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div className="space-y-6 hero-text">
          <span className="inline-block px-4 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
            Smart Asset Management Platform
          </span>

          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
            Track, Manage & Optimize <br />
            <span className="text-blue-600">Your Company Assets</span>
          </h1>

          <p className="text-gray-600 text-lg max-w-xl">
            A centralized solution to manage assets, monitor usage, control requests,
            and improve operational efficiency — all in one dashboard.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition">
              Get Started
            </button>

            <button className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition">
              View Demo
            </button>
          </div>

          <div className="flex items-center gap-6 pt-6 text-sm text-gray-500">
            <span>✔ Secure</span>
            <span>✔ Role Based Access</span>
            <span>✔ Real-time Tracking</span>
          </div>
        </div>

        {/* RIGHT CONTENT (Swiper / Image / Dashboard Mock) */}
        <div className="relative hero-visual">
          <div className="relative rounded-2xl shadow-2xl bg-white p-4">
            {/* Swiper container placeholder */}
            <div className="h-[260px] md:h-80 rounded-xl bg-linear-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-gray-500 font-medium">
              Swiper Slide / Dashboard Preview
            </div>
          </div>

          {/* Floating cards */}
          <div className="absolute -top-6 -left-6 bg-white shadow-lg rounded-xl p-4 w-40 text-sm floating-card">
            <p className="font-semibold text-gray-800">Assets</p>
            <p className="text-blue-600 text-xl font-bold">1,284</p>
          </div>

          <div className="absolute -bottom-6 -right-6 bg-white shadow-lg rounded-xl p-4 w-40 text-sm floating-card">
            <p className="font-semibold text-gray-800">Requests</p>
            <p className="text-green-600 text-xl font-bold">98%</p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default HeroBanner
