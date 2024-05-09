import React, { forwardRef, useId } from 'react';

function InputField({
    type,
    placeholder,
    className,
    ...rest 
}, ref) {
    const defaultClasses = "mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-color focus:border-primary-color";
    const id = useId();
    return (
      <div className=''>
            <input
              type={type}
              placeholder={placeholder}
              className={className ? className : defaultClasses}
              id={id}
              ref={ref}
              {...rest}
            />
      </div>
  );
}

export default forwardRef(InputField);
