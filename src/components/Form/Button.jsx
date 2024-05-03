import React from 'react'

function Button({
    type,
    text,
    // classname is this or given value
    className = "w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500 rounded-lg transition duration-200 hover:bg-indigo-600 ease",
    disabled = false,
    ...rest
}) {
  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      {...rest}
    >
      {text}
    </button>
  )
}

export default Button