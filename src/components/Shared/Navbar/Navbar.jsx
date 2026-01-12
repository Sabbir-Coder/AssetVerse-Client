import Container from '../Container'
import { AiOutlineMenu, AiOutlineClose, AiOutlineHome, AiOutlineInfoCircle, AiOutlineMail, AiOutlineQuestionCircle } from 'react-icons/ai'
import { MdOutlineDashboard, MdOutlinePriceChange, MdOutlineReviews, MdOutlineLightMode, MdOutlineModeNight } from 'react-icons/md'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'
import logo from '../../../assets/images/title-logo.png'
import useRole from '../../../hooks/useRole'
import { RxExit } from 'react-icons/rx'
import LoadingSpinner from '../LoadingSpinner'

const Navbar = () => {
  const { role } = useRole()
  const { user, logOut, loading } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) return savedTheme
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Theme Management
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.setAttribute('data-theme', 'light')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setTheme(nextTheme)
      })
    } else {
      setTheme(nextTheme)
    }
  }

  // Close mobile menu when location changes
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  if (loading) return <LoadingSpinner />

  const navLinks = [
    { name: 'Home', path: '/', icon: <AiOutlineHome className="text-xl" /> },
    { name: 'Testimonials', path: '#testimonials', icon: <MdOutlineReviews className="text-xl" />, isHash: true },
    { name: 'About', path: '#how-it-works', icon: <AiOutlineInfoCircle className="text-xl" />, isHash: true },
    { name: 'Contact', path: '#contact', icon: <AiOutlineMail className="text-xl" />, isHash: true },
    { name: 'FAQ', path: '#faq', icon: <AiOutlineQuestionCircle className="text-xl" />, isHash: true },
  ]

  return (
    <div className={`fixed w-full z-[999] transition-all duration-500 ${isScrolled
      ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-lg border-b border-slate-200/50 dark:border-slate-700/50 py-2'
      : 'bg-transparent py-4'
      }`}>
      <Container>
        <div className='flex flex-row items-center justify-between'>
          {/* Logo */}
          <Link to='/' className="flex items-center group">
            <img
              src={logo}
              alt='logo'
              className={`transition-all duration-500 object-contain ${isScrolled ? 'w-15 h-8' : 'w-18 h-10'}`}
            />
            <span className={`font-bold text-xl tracking-tight hidden sm:block ${isScrolled ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white'}`}>
              Asset<span className="text-[#048ba8]">Verse</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className='hidden lg:flex items-center gap-1 bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm'>
            {navLinks.map((link) => (
              link.isHash ? (
                <a
                  key={link.name}
                  href={link.path}
                  className='px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-[#048ba8] dark:hover:text-[#4db4c7] hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all duration-300'
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${location.pathname === link.path
                    ? 'bg-[#2e4057] text-white shadow-md shadow-[#2e4057]/20 dark:shadow-[#2e4057]/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-[#048ba8] dark:hover:text-[#4db4c7] hover:bg-white dark:hover:bg-slate-700'
                    }`}
                >
                  {link.name}
                </Link>
              )
            ))}
            {user && (
              <Link
                to='/dashboard/profile'
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${location.pathname.startsWith('/dashboard')
                  ? 'bg-[#2e4057] text-white shadow-md shadow-[#2e4057]/20 dark:shadow-[#2e4057]/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-[#048ba8] dark:hover:text-[#4db4c7] hover:bg-white dark:hover:bg-slate-700'
                  }`}
              >
                Dashboard
              </Link>
            )}
            {role === 'hr' && (
              <a
                href='#pricing'
                className='px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all duration-300'
              >
                Pricing
              </a>
            )}
          </nav>

          {/* Right side - Auth buttons/Avatar/Theme Toggle */}
          <div className='flex items-center gap-2 md:gap-4'>
            {/* Desktop Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="hidden md:flex p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-[#048ba8]/10 dark:hover:bg-[#048ba8]/20 hover:text-[#048ba8] dark:hover:text-[#4db4c7] transition-all duration-300 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <MdOutlineModeNight size={22} /> : <MdOutlineLightMode size={22} />}
            </button>

            <div className='hidden md:flex items-center gap-3'>
              {user ? (
                <div className="flex items-center gap-3">
                  <Link to='/dashboard/profile' className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2e4057] to-[#048ba8] rounded-full blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
                    <img
                      className='relative rounded-full object-cover h-10 w-10 border-2 border-white dark:border-slate-800'
                      referrerPolicy='no-referrer'
                      src={user?.photoURL || avatarImg}
                      alt='profile'
                    />
                  </Link>
                  <button
                    onClick={logOut}
                    className='flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 font-semibold cursor-pointer'
                  >
                    <RxExit /> <span className="hidden lg:inline">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                  to='/join-employee'
                  className='px-4 py-2.5 text-slate-600 dark:text-slate-400 hover:text-[#048ba8] dark:hover:text-[#4db4c7] font-medium transition-all'
                  >
                    Join Employee
                  </Link>
                  <Link
                    to='/join-hr'
                    className='px-5 py-2.5 bg-[#2e4057] hover:bg-[#293a4f] text-white rounded-xl font-semibold transition-all shadow-lg shadow-[#2e4057]/20 dark:shadow-[#2e4057]/20'
                  >
                    Join as HR
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all duration-300"
              >
                {theme === 'light' ? <MdOutlineModeNight size={22} /> : <MdOutlineLightMode size={22} />}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2.5 rounded-xl transition-all duration-300 ${isOpen
                  ? 'bg-[#2e4057] text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
              >
                {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </Container>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[1000] lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-white dark:bg-slate-900 z-[1001] lg:hidden transition-transform duration-500 ease-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
          } shadow-2xl flex flex-col`}
      >
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <Link to='/' className="flex items-center gap-2">
            <img src={logo} alt='logo' className="w-10 h-10 object-contain" />
            <span className="font-bold text-xl dark:text-white">AssetVerse</span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {/* Profile Section in Sidebar */}
          {user && (
            <div className="mb-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-3">
                <img
                  className='rounded-full h-12 w-12 border-2 border-[#048ba8]'
                  src={user?.photoURL || avatarImg}
                  alt='profile'
                />
                <div className="overflow-hidden">
                  <h3 className="font-bold text-slate-900 dark:text-white truncate">{user?.displayName}</h3>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                </div>
              </div>
              <Link
                to="/dashboard/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2 bg-[#2e4057] text-white rounded-xl text-sm font-semibold"
              >
                <MdOutlineDashboard /> View Profile
              </Link>
            </div>
          )}

          {/* Nav Links in Sidebar */}
          <div className="space-y-1">
            {navLinks.map((link) => (
              link.isHash ? (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-[#048ba8] dark:hover:text-[#4db4c7] hover:bg-[#048ba8]/10 dark:hover:bg-[#048ba8]/20 rounded-xl transition-all font-medium"
                >
                  {link.icon}
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-[#048ba8] dark:hover:text-[#4db4c7] hover:bg-[#048ba8]/10 dark:hover:bg-[#048ba8]/20 rounded-xl transition-all font-medium"
                >
                  {link.icon}
                  {link.name}
                </Link>
              )
            ))}

            {user && (
              <Link
                to="/dashboard/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all font-medium"
              >
                <MdOutlineDashboard className="text-xl" />
                Dashboard
              </Link>
            )}

            {role === 'hr' && (
              <a
                href="#pricing"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all font-medium"
              >
                <MdOutlinePriceChange className="text-xl" />
                Pricing
              </a>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 dark:border-slate-800">
          {user ? (
            <button
              onClick={() => {
                logOut()
                setIsOpen(false)
              }}
              className="flex items-center justify-center gap-2 w-full py-3 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-xl font-bold transition-all border border-red-100 dark:border-red-900/20 cursor-pointer"
            >
              <RxExit /> Logout
            </button>
          ) : (
            <div className="space-y-3">
              <Link
                to="/join-employee"
                onClick={() => setIsOpen(false)}
                className="block w-full py-3 text-center text-slate-600 dark:text-slate-400 font-semibold"
              >
                Join as Employee
              </Link>
              <Link
                to="/join-hr"
                onClick={() => setIsOpen(false)}
                className="block w-full py-3 bg-[#2e4057] text-white text-center rounded-xl font-bold shadow-lg shadow-[#2e4057]/20 dark:shadow-[#2e4057]/20"
              >
                Join as HR Manager
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
