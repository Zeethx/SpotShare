import React from 'react'
import Container from '../components/Container/Container'
import  Form from '../components/Form/Form'

function Home() {
  return (
    <div>
        <Container>
            <h1 className='text-2xl font-bold text-center mt-4'>Home</h1>
            <p className='text-center mt-4'>Welcome to the Home page</p>
            <Form />
        </Container>
    </div>
  )
}

export default Home