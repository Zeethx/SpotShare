import React from 'react';

function InputField({ 
    type,
    placeholder,
    className = "",
    ...rest 
}) {
    const defaultClasses = "mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500";
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`${defaultClasses} ${className}`}
      {...rest}
    />
  );
}

export default InputField;
