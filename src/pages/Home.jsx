import React from "react";
import { Container, HeroSection, WhySection, HowTo} from "../components"


function Home() {
  return (
    <div>
      <Container>
        <HeroSection />
        <HowTo />
        <WhySection />
      </Container>
    </div>
  );
}

export default Home;