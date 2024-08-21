import React from "react";

const About = () => {
  return (
    <div className="p-8 font-outfit">
      <div className="max-w-7xl mx-auto text-center py-12">
        <h2 className="text-base font-semibold tracking-wide uppercase">About us</h2>
        <h1 className="mt-2 text-3xl leading-9 font-extrabold sm:text-5xl sm:leading-12 text-center">
          Parking made easier and <span className="underline">accessible</span>!
        </h1>
        <p className="mt-4 max-w-2xl text-xl leading-7 text-slate-900 mx-auto">
          SpotShare is a user-friendly application that allows individuals to
          rent out their private parking spaces to others. Founded by{" "}
          <span className="font-bold">Raghav Anand</span> and{" "}
          <span className="font-bold">Harshit Bedi</span>, we are
          revolutionizing urban parking.
        </p>
      </div>


      <div className="py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white text-slate-900 p-6 rounded-xl drop-shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-slate-900">
              The idea for SpotShare was born out of a common frustration: the
              endless search for parking spaces in busy cities. We realized that
              while many people struggle to find parking, there are countless
              unused parking spaces in residential and commercial areas. This
              led us to create a platform that connects those with available
              parking spaces to those in need of them.
            </p>
          </div>
          <div className="bg-white text-slate-900 p-6 rounded-xl drop-shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
            <p className="text-slate-900">
              SpotShare is a user-friendly application that allows individuals
              to rent out their private parking spaces to others. Whether you
              have a driveway, a garage, or a reserved spot that’s sitting
              empty, SpotShare lets you monetize it by offering it to drivers
              who need a place to park.
            </p>
            <p className="text-slate-900 mt-4">
              For drivers, SpotShare provides a seamless experience to find and
              book parking spaces in advance or on the go. Say goodbye to the
              hassle of circling the block and hello to stress-free parking with
              just a few taps on your smartphone.
            </p>
          </div>
          <div className="bg-white text-slate-900 p-6 rounded-xl drop-shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <ul className="list-disc list-inside text-slate-900">
              <li>
                <strong>List Your Space:</strong> If you have a parking space
                you’re not using, you can list it on SpotShare. Provide details
                about the location, availability, and pricing, and set your own
                terms.
              </li>
              <li className="mt-2">
                <strong>Find and Book:</strong> Drivers can search for available
                parking spaces in their desired area, view prices, and book a
                spot that fits their needs. It’s quick, easy, and secure.
              </li>
              <li className="mt-2">
                <strong>Park and Go:</strong> Once booked, drivers can park
                their vehicle at the reserved spot. Payments are handled through
                the app, making the entire process smooth and hassle-free.
              </li>
            </ul>
          </div>
        </div>
      </div>


      <div className="py-12">
        <div className="max-w-7xl mx-auto text-center drop-shadow-xl p-6 rounded-xl bg-white">
          <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-900 text-xl">
            At SpotShare, we envision a world where parking is no longer a
            source of stress. By leveraging technology and community sharing, we
            aim to create a sustainable solution to urban parking challenges,
            making cities more accessible for everyone.
          </p>
        </div>
      </div>

      <div className="border-t border-slate-700 my-8"></div> {/* Divider */}

      <div className="max-w-7xl mx-auto py-12">
        <h2 className="text-4xl font-bold mb-6 text-center">Meet Our Team</h2>
        <div className="flex flex-col sm:flex-row items-center justify-around">
          <div className="bg-white text-gray-800 p-6 m-4 rounded-xl shadow-md max-w-sm text-center">
            <img src="/images/founders/raghav.jpg" alt="Raghav Anand" className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Raghav Anand</h3>
            <p className="text-slate-900">Founder & CEO</p>
            <p className="mt-4 text-slate-900">Raghav is passionate about solving urban parking problems with innovative technology solutions. His vision drives SpotShare towards making cities more accessible for everyone.</p>
          </div>
          <div className="bg-white text-gray-800 p-6 m-4 rounded-xl shadow-md max-w-sm text-center">
            <img src="images/founders/harshit.jpg" alt="Harshit Bedi" className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Harshit Bedi</h3>
            <p className="text-slate-900">Co-Founder & CTO</p>
            <p className="mt-4 text-slate-900">Harshit is the tech brain behind SpotShare. With his expertise in software development, he ensures the platform is robust, user-friendly, and efficient for all users.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
