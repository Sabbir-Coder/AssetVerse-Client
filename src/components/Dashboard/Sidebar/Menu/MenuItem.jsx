/* eslint-disable no-unused-vars */
import { NavLink } from 'react-router'

const MenuItem = ({ label, address, icon: Icon, onClick }) => {
  return (
    <NavLink
      to={address}
      onClick={onClick}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-[#18439e] ${isActive ? 'bg-gray-300  text-[#18439e]' : 'text-[#1F2937]'
        }`
      }
    >
      <Icon className='w-5 h-5' />

      <span className='mx-3 font-medium'>{label}</span>
    </NavLink>
  )
}

export default MenuItem
