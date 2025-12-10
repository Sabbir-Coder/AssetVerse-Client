import { BsFingerprint } from 'react-icons/bs'
import MenuItem from './MenuItem'
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { RiTeamFill } from "react-icons/ri";
import { GiBassetHoundHead } from "react-icons/gi";

const EmployeeMenu = ({ onItemClick }) => {

  return (
    <>
      <MenuItem onClick={onItemClick} icon={GiBassetHoundHead} label='My Assets' address='my-assets' />
      <MenuItem onClick={onItemClick} icon={VscGitPullRequestNewChanges} label='Request an Asset' address='request-asset' />
      <MenuItem onClick={onItemClick} icon={RiTeamFill} label='My Team' address='my-team' />
    </>
  )
}

export default EmployeeMenu
