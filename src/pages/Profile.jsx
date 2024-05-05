import React from 'react'
import { Container } from '../components'
import CircularImage from '../components/image'

export default function Profile() {

	const src = "../components/images/image.jpg"
  return (
	<Container>
		<div class="relative bg-white p-6">

			<div class="bg-cover bg-center h-64 w-full" style={{ backgroundImage: 'url(../components/images/bgimage.jpg)' }}>
   
    		<div class="text-white text-2xl font-semibold p-4">
			Greeting Name
			</div>
		</div>
		
			<div class="flex">
				
				<div class="bg-gray-100 p-4 flex-grow">
				
				<p>User Information</p>
				<p>Name</p>
				<p>Address</p>
				<p>Email</p>
				<p>Payment Method</p>
				<button class="bg-blue-500 text-white py-1 px-3 mt-2 rounded">Change payment</button>
				</div>

				
				<div class="bg-gray-100 p-4 flex-grow ml-4">
				<p>Past Parking History</p>
				
				<ul>
					<li>Parking Event 1</li>
					<li>Parking Event 2</li>
					<li>Parking Event 3</li>
				</ul>
				</div>
			</div>

		
			<div class="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
				<img src={require('../components/images/image.jpg') }alt="Profile Picture" class="w-24 h-24 rounded-full border-4 border-white"/>
			</div>
		</div>


	</Container>
  )
}
