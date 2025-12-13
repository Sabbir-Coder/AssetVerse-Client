import MenuItem from './MenuItem'
import { GiBassetHoundHead } from "react-icons/gi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaCodePullRequest } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { GiUpgrade } from "react-icons/gi";
import { MdDashboard } from 'react-icons/md';

const HrMenu = ({ onItemClick }) => {
  return (
    <>
      <MenuItem onClick={onItemClick} icon={MdDashboard} label='Dashboard' address='/dashboard' />
      <MenuItem onClick={onItemClick} icon={GiBassetHoundHead} label='Asset List' address='asset-list' />
      <MenuItem onClick={onItemClick} icon={IoIosAddCircleOutline} label='Add Asset' address='add-asset' />
      <MenuItem onClick={onItemClick} icon={FaCodePullRequest} label='All Requests' address='all-requests' />
      <MenuItem onClick={onItemClick} icon={IoIosPeople} label='My Employee List' address='my-employee-list' />
      <MenuItem onClick={onItemClick} icon={GiUpgrade} label='Upgrade Package' address='upgrade-package' />
    </>
  )
}

export default HrMenu
