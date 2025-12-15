import Container from '../Container'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'
import logo from '../../../assets/images/logo-flat.png'
import useRole from '../../../hooks/useRole'
import { RxExit } from 'react-icons/rx'
import LoadingSpinner from '../LoadingSpinner'

const Navbar = () => {
  const { role } = useRole()
  const { user, logOut,loading } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if(loading) return <LoadingSpinner/>

  return (
    <div className={`fixed w-full bg-white z-999 shadow-sm transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className={`transition-all duration-300 ${isScrolled ? 'py-1.5' : 'py-2'}`}>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-8'>
            {/* Logo */}
            <Link to='/'>
              <img
                src={logo}
                alt='logo'
                className={`transition-all duration-300 mr-15 ${isScrolled ? 'w-20 h-10' : 'w-28 h-13'}`}
              />
            </Link>

            {/* Desktop Navigation Links - Hidden on mobile */}
            <nav className='hidden md:flex items-center gap-8 flex-1'>
              <Link
                to='/'
                className='text-gray-700 hover:text-primary font-medium transition'
              >
                Home
              </Link>


              {user && (
                <Link
                  to='/dashboard/profile'
                  className='text-gray-700 hover:text-primary font-medium transition'
                >
                  Dashboard
                </Link>
              )}
              {role === 'hr' && (
                <a
                  href='#pricing'
                  className='text-gray-700 hover:text-primary font-medium transition'
                >
                  Pricing
                </a>
              )}

              <a href="#testimonials" className='text-gray-700 hover:text-primary font-medium transition'>Testimonials</a>
              <a href="#how-it-works" className='text-gray-700 hover:text-primary font-medium transition'>About</a>
              <a href="#contact" className='text-gray-700 hover:text-primary font-medium transition'>Contact</a>
              <a href="#faq" className='text-gray-700 hover:text-primary font-medium transition'>FAQ</a>
            </nav>

            {/* Right side - Auth buttons/Avatar */}
            <div className='flex items-center gap-4'>
              {/* Desktop Auth Buttons - Hidden on mobile */}
              <div className='flex items-center gap-3'>
                {user ? (
                  <>
                    <Link to='/dashboard/profile'>
                      <img
                        className='rounded-full object-cover h-10 w-10 object-cover'
                        referrerPolicy='no-referrer'
                        src={user && user.photoURL ? user.photoURL : avatarImg}
                        alt='profile'
                      /></Link>

                    <button
                      onClick={logOut}
                      className='hidden md:flex px-4 btn btn-primary rounded-full py-3 border-0 hover:bg-blue-600 transition font-semibold flex justify-center items-center cursor-pointer'
                    >
                      <RxExit /> <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>

                    <Link
                      to='/join-employee'
                      className='text-gray-700 mr-2 btn btn-outline hover:text-primary font-medium transition'
                    >
                      Join as Employee
                    </Link>
                    <Link
                      to='/join-hr'
                      className=' btn btn-primary text-white hover:bg-blue-600 font-medium transition'
                    >
                      Join as HR Manager
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Button - Visible only on mobile */}
              <div className='md:hidden relative'>
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className={`p-3 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition-all duration-300 ${isScrolled ? 'scale-95' : 'scale-100'}`}
                >
                  <AiOutlineMenu />
                </div>

                {/* Mobile Dropdown Menu */}
                {isOpen && (
                  <div className='absolute rounded-xl shadow-md w-[60vw] bg-white overflow-hidden right-0 top-14 text-sm'>
                    <div className='flex flex-col cursor-pointer'>
                      <Link
                        to='/'
                        onClick={() => setIsOpen(false)}
                        className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                      >
                        Home
                      </Link>

                      {user ? (
                        <>
                          <Link
                            to='/dashboard/profile'
                            onClick={() => setIsOpen(false)}
                            className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                          >
                            Dashboard
                          </Link>
                          {role === 'hr' && (
                            <a
                              href='#pricing'
                              onClick={() => setIsOpen(false)}
                              className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                            >
                              Pricing
                            </a>
                          )}

                          <a href="#testimonials" onClick={() => setIsOpen(false)}
                            className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'>Testimonials</a>
                          <a href="#how-it-works" onClick={() => setIsOpen(false)}
                            className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'>About</a>
                          <a href="#contact" onClick={() => setIsOpen(false)}
                            className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'>Contact</a>
                          <a href="#faq" onClick={() => setIsOpen(false)}
                            className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'>FAQ</a>
                          <div
                            onClick={() => {
                              logOut()
                              setIsOpen(false)
                            }}
                            className='px-4 btn btn-primary rounded-xl py-3 border-0 hover:bg-blue-600 transition font-semibold cursor-pointer'
                          >
                            Logout
                          </div>
                        </>
                      ) : (
                        <>
                          <Link
                            to='/join-employee'
                            onClick={() => setIsOpen(false)}
                            className='px-4 py-3  hover:bg-neutral-100 transition font-semibold'
                          >
                            Join as Employee
                          </Link>
                          <Link
                            to='/join-hr'
                            onClick={() => setIsOpen(false)}
                            className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                          >
                            Join as HR Manager
                          </Link>


                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
