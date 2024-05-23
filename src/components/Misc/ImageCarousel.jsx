import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function ImageCarousel({ images }) {
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 1024 },
          items: 1,
        },
        desktop: {
          breakpoint: { max: 1024, min: 768 },
          items: 1,
        },
        tablet: {
          breakpoint: { max: 768, min: 464 },
          items: 1,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      };
      return (
        <Carousel responsive={responsive} className="rounded-lg overflow-hidden mb-8">
          {images.map((url, index) => (
            <div key={index} className="p-2">
              <img src={url} alt={`Spot ${index}`} className="h-40 w-full object-contain rounded-lg" />
            </div>
          ))}
        </Carousel>
      );
}

export default ImageCarousel