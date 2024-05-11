import React from 'react'
import NextButton from '../Host/NextButton'
import BackButton from '../Host/BackButton'

function FormFooter({text, to, disabledCondition, onNextClick}) {
  return (
    <footer className="flex sm:flex-row justify-between items-center bottom-0 left-0 right-0 fixed px-4 sm:px-10 py-3 sm:py-5 border-gray-200 border-2 z-50 bg-primary-white">
        <BackButton />
        <h3 className='text-lg sm:text-xl lg:text-2xl font-medium text-wrap px-1'>{text}</h3>
        <NextButton to={to} disabledCondition={disabledCondition} onNextClick={onNextClick}/>
    </footer>
  )
}

export default FormFooter