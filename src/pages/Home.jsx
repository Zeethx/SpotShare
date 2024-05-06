import React from "react";
import { Container, HeroSection, WhySection, HowTo, Testimonial} from "../components"


function Home() {
  return (
    <div>
      <Container>
        <HeroSection />
        <HowTo />
        <WhySection />
        <Testimonial />
      </Container>
    </div>
  );
}

export default Home;