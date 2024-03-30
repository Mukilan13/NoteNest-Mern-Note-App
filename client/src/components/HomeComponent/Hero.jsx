import { Link } from "react-router-dom";
import heroImg from "../../images/hero.png";

const Hero = () => {
  return (
    <section className="hero">
      <div className="description">
        <h1>Every note and idea takes flight.</h1>
        <p>
          Streamline your life with NoteNest – the ultimate solution for
          effortlessly capturing and organizing your notes. Simplify your
          thoughts, boost productivity, and stay organized with ease.
        </p>
        <Link to="/signup">Sign up now</Link>
      </div>
      <img src={heroImg} alt="hero" />
    </section>
  );
};

export default Hero;
