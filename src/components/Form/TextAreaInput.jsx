import React, {forwardRef, useId} from 'react'

function TextAreaInput({ type, placeholder, className, ...rest }, ref) {
    const id = useId();
  return (
    <div className=''>
          <textarea
            type={type}
            placeholder={placeholder}
            className={className || "py-2 lg:py-4 px-6 rounded border hover:border-2 hover:border-black font-bold text-xl w-full mr-2 my-1 lg:my-0 resize-none"}
            id={id}
            ref={ref}
            draggable ="false"
            {...rest}
          />
    </div>
  )
}

export default forwardRef(TextAreaInput);