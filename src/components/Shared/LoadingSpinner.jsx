import { BarLoader } from 'react-spinners'

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <BarLoader height={20} width={100} size={100} color='blue' />
    </div>
  )
}

export default LoadingSpinner
