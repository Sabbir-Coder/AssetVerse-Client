import { useState } from 'react'
import { Link } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import logo from '../../../assets/images/logo-flat.png'
import LoadingSpinner from '../../Shared/LoadingSpinner'

// Icons
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
import { AiOutlineClose } from 'react-icons/ai'

// User Menu
import MenuItem from './Menu/MenuItem'
import EmployeeMenu from './Menu/EmployeeMenu'
import HrMenu from './Menu/HrMenu'
import useRole from '../../../hooks/useRole'

const Sidebar = () => {
  const { logOut } = useAuth()
  const [isActive, setActive] = useState(false)
  const { role, isRoleLoading } = useRole()

  const handleToggle = () => setActive(!isActive)
  const closeSidebar = () => setActive(false)

  if(isRoleLoading) return <LoadingSpinner />

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden flex justify-between items-center z-20 px-4 py-3  bg-white shadow">
        <button
          onClick={handleToggle}
          className="p-2 rounded focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-6 w-6" />
        </button>
        <Link to={'/'}>
          <img src={logo} width='100' alt="" /></Link>
      </div>

      {/* Background Overlay */}
      {isActive && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/30 md:hidden z-10"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 inset-y-0 left-0 z-20 max-h-[800px] w-59 bg-white shadow-xl
          transform transition-transform duration-200 ease-in-out
          ${isActive ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
        `}
      >
        <div className="flex flex-col justify-between h-full px-2 py-4">

          {/* Top Row (Logo + Close Button for mobile) */}
          <div className="flex items-center justify-between px-3">

            {/* Logo */}
            <Link to="/" onClick={closeSidebar} className="hidden md:block">
              <img src={logo} alt="logo" width="130" />
            </Link>

            {/* Close button on small screens */}
            <button
              className="md:hidden p-2 rounded focus:bg-gray-200"
              onClick={closeSidebar}
            >
              <AiOutlineClose className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          {/* Middle Content */}
          <div className="flex-1 overflow-y-auto mt-4">
            <nav>
              {role === 'employee' && <EmployeeMenu />}
              {role === 'hr' && <HrMenu />}
            </nav>
          </div>

          {/* Bottom Content */}
          <div>
            <hr />

            <MenuItem
              icon={FcSettings}
              label="Profile"
              address="/dashboard/profile"
              onClick={closeSidebar}
            />

            <button
              onClick={() => {
                logOut()
                closeSidebar()
              }}
              className="flex w-full items-center px-4 py-2 mt-4 text-gray-600 hover:bg-gray-200 transition"
            >
              <GrLogout className="w-5 h-5" />
              <span className="ml-3 font-medium">Logout</span>
            </button>
          </div>

        </div>
      </div>
    </>
  )
}

export default Sidebar
