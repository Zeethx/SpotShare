import React from "react";

function Testimonial() {
  return (
    <section className="px-5 lg:px-10 py-10 border rounded-lg shadow-lg my-16">
      <figure className="mx-auto max-w-7xl">
        <h1 className="mb-4 text-4xl font-semibold text-black">
          What drivers are saying?
        </h1>
        <blockquote className="mt-10 text-xl text-gray-900">
          <p>
            “As someone who frequently struggles to find convenient parking in
            the city, <span className="font-bold">SpotShare</span> has been a game-changer for me. The app is
            incredibly user-friendly, and it's saved me both time and money.
            Now, I spend less time driving around looking for a spot and more
            time doing what I need to do. SpotShare has not only made parking <span className="underline">hassle-free</span> but also ensures I'm never far from my destination.
            Highly recommended for any driver looking for an easy and reliable
            parking solution!”
          </p>
        </blockquote> 
        <figcaption className="mt-10 flex items-center gap-x-6">
          <div className="isolate flex -space-x-2">
            <img
              className="relative z-30 inline-block h-20 w-20 rounded-full ring-2 ring-white"
              src="/images/driver_profile.png"
              alt="Dan_Abromov"
            />
          </div>
          <div>
            <p className="font-semibold text-black">Maheepjot Singh Pruthi</p>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}
export default Testimonial;
