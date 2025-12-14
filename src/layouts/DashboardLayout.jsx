import { Outlet } from 'react-router'
import Sidebar from '../components/Dashboard/Sidebar/Sidebar'

const DashboardLayout = () => {
  return (
    <div className='min-h-screen md:flex bg-white'>
      {/* Left Side: Sidebar Component */}
      <Sidebar />
      {/* Right Side: Dashboard Dynamic Content */}
      <div className='flex-1 bg-[#ffecec] p-3 overflow-y-auto'>
        {/* Outlet for dynamic contents */}
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
