import React from "react";
import { Container, HeroSection, WhySection, HowTo, Testimonial} from "../components"
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Helmet } from "react-helmet";

function Home() {
  return (
    <div>
      <Helmet>
        <title>SpotShare | Find and Rent Parking Spaces Easily</title>
        <meta name="description" content="SpotShare helps you find and rent parking spaces effortlessly. Discover available parking spots near you and book them online with ease." />
        <meta name="keywords" content="parking, rent parking spaces, find parking, parking spots, SpotShare" />
      </Helmet>
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