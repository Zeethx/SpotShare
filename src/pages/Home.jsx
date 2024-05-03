import React from 'react'
import Container from '../components/Container/Container'
import  Form from '../components/Form/Form'

function Home() {
  return (
    <div>
        <Container>
            <h1 className='text-2xl font-bold text-primary-color text-center mt-4'>Find a Spot, Share a Spot</h1>
            <div className='flex flex-row w-full'>
                <div className='w-1/2'>
                    <h2 className='text-primary-black'>
                        Where every parking space is an opportunity to earn and save.
                    </h2>
                    <Form />
                </div>
                <div className='w-1/2'>
                    <img src='/parking.png' alt='parking' />
                </div>
            </div>
        </Container>
    </div>
  )
}

export default Home