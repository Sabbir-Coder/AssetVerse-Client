const Button = ({ label, onClick, disabled, outline, small, icon: Icon }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
          relative
          disabled:opacity-70
          disabled:cursor-not-allowed
          rounded-xl
          hover:opacity-90
          transition
          cursor-pointer
          px-4
          w-full
          ${outline ? 'bg-white dark:bg-slate-800' : 'bg-blue-600 dark:bg-blue-500'}
          ${outline ? 'border-slate-300 dark:border-slate-600' : 'border-blue-600 dark:border-blue-500'}
          ${outline ? 'text-slate-900 dark:text-slate-100' : 'text-white'}
          ${outline ? 'hover:bg-slate-100 dark:hover:bg-slate-700' : 'hover:bg-blue-700 dark:hover:bg-blue-600'}
          ${small ? 'text-sm' : 'text-md'}
          ${small ? 'py-2' : 'py-3'}
          ${small ? 'font-medium' : 'font-semibold'}
          border-2
        `}
    >
      {Icon && (
        <Icon
          size={24}
          className='
              absolute
              left-4
              top-3
            '
        />
      )}
      {label}
    </button>
  )
}

export default Button
