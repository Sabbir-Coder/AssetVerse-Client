const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#2e4057]/95 border-t border-gray-100 dark:border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#048ba8] to-[#f18f01]">
                AssetVerse
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Empowering businesses with smart asset management solutions. Track, manage, and optimize your resources efficiently.
            </p>
            <div className="flex gap-4">
              {['facebook', 'twitter', 'instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center hover:bg-[#048ba8]/10 hover:text-[#048ba8] transition-all duration-300 shadow-sm hover:shadow dark:hover:shadow-[#048ba8]/20"
                >
                  <img
                    src={`https://cdn.simpleicons.org/${social === 'facebook' ? 'facebook' : social === 'twitter' ? 'x' : social}/048ba8`}
                    alt={social}
                    className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                  <span className="capitalize sr-only">{social}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-6 text-lg">Platform</h3>
            <ul className="space-y-4">
              {['Home', 'Features', 'Pricing', 'Testimonials'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-slate-500 dark:text-slate-400 hover:text-[#048ba8] transition-colors flex items-center gap-2 group text-sm font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-[#048ba8] transition-colors"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-6 text-lg">Company</h3>
            <ul className="space-y-4">
              {['About Us', 'Careers', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-[#048ba8] transition-colors flex items-center gap-2 group text-sm font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-[#048ba8] transition-colors"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-6 text-lg">Stay Updated</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-4 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#048ba8]/20 focus:border-[#048ba8] transition-all text-sm dark:text-white"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#f18f01] text-white rounded-lg hover:bg-[#e08201] transition-colors shadow-lg shadow-[#f18f01]/30 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 dark:text-slate-500 text-sm">
            © {new Date().getFullYear()} AssetVerse Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-400 dark:text-slate-500">
            <a href="#" className="hover:text-[#048ba8] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#048ba8] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#048ba8] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
