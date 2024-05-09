import React from 'react'
import NextButton from '../Host/NextButton'
import BackButton from '../Host/BackButton'

function FormFooter({text, to, disabledCondition, onNextClick}) {
  return (
    <footer className="flex justify-between bottom-0 left-0 right-0 fixed px-10 py-5 border-gray-200 border-2">
            <BackButton />
            <h3 className='text-2xl'>{text}</h3>
            <NextButton to={to} disabledCondition={disabledCondition} onNextClick={onNextClick}/>
    </footer>
  )
}

export default FormFooter