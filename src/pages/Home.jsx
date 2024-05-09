import React from "react";
import { Container, HeroSection, WhySection, HowTo, Testimonial} from "../components"
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function Home() {
  return (
    <div>
      <Header />
        <Container>
          <HeroSection />
          <HowTo />
          <WhySection />
          <Testimonial />
        </Container>
      <Footer />
    </div>
  );
}

export default Home;