import Features from "../components/HomeComponent/Features";
import Footer from "../components/HomeComponent/Footer";
import Hero from "../components/HomeComponent/Hero";
import Navbar from "../components/HomeComponent/Navbar";

const Home = () => {
  return (
    <section className="home">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </section>
  );
};

export default Home;
