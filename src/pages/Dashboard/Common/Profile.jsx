import useAuth from '../../../hooks/useAuth'
import coverImg from '../../../assets/images/cover.jpg'
import useRole from '../../../hooks/useRole';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const Profile = () => {
  const { user } = useAuth()
  const { role, isRoleLoading } = useRole();

  if (isRoleLoading) return <LoadingSpinner />

  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-64px)] py-12 px-4 bg-slate-50'>
      <div className='bg-white shadow-xl rounded-[2rem] w-full max-w-3xl overflow-hidden relative group'>
        {/* Cover Image */}
        <div className='h-60 overflow-hidden relative'>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-80" />
          <img
            alt='cover photo'
            src={coverImg}
            className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
          />
        </div>

        <div className='relative px-6 pb-8 md:px-10 z-20'>
          {/* Profile Header (Image + Role) */}
          <div className='flex flex-col md:flex-row items-center md:items-end -mt-16 mb-6 gap-6'>
            <div className='relative'>
              <div className='h-32 w-32 md:h-40 md:w-40 rounded-full p-1 bg-white shadow-2xl'>
                <img
                  alt='profile'
                  src={user?.photoURL}
                  className='w-full h-full object-cover rounded-full border-4 border-slate-50'
                />
              </div>
              <span className='absolute bottom-2 right-2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wide border-2 border-white'>
                {role}
              </span>
            </div>

            <div className='flex-1 text-center md:text-left mb-2 md:mb-4'>
              <h2 className='text-3xl font-bold text-slate-800 mb-1'>
                {user?.displayName}
              </h2>
              <p className='text-slate-500 font-medium'>
                {user?.email}
              </p>
            </div>

            <div className='flex gap-3'>
              <button className='px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300'>
                Edit Profile
              </button>
            </div>
          </div>

          <hr className='border-slate-100 my-8' />

          {/* User Details Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='p-6 bg-slate-50 rounded-2xl border border-slate-100'>
              <p className='text-xs font-bold text-slate-400 uppercase tracking-wider mb-2'>
                User ID
              </p>
              <p className='text-slate-700 font-mono text-sm break-all'>
                {user?.uid}
              </p>
            </div>

            <div className='p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group/pass cursor-pointer hover:border-blue-200 transition-colors'>
              <div>
                <p className='text-xs font-bold text-slate-400 uppercase tracking-wider mb-1'>
                  Security
                </p>
                <p className='text-slate-800 font-semibold'>
                  Password & Auth
                </p>
              </div>
              <button className='text-blue-600 text-sm font-bold group-hover/pass:translate-x-1 transition-transform'>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
