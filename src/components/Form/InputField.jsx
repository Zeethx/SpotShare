import React, { forwardRef, useId } from 'react';

function InputField({
    type,
    placeholder,
    className = "",
    ...rest 
}, ref) {
    const defaultClasses = "mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500";
    const id = useId();
    return (
      <div className='w-full'>
            <input
              type={type}
              placeholder={placeholder}
              className={`${defaultClasses} ${className}`}
              id={id}
              ref={ref}
              {...rest}
            />
      </div>
  );
}

export default forwardRef(InputField);
