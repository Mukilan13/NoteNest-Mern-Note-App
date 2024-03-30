import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState } from "react";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleMenuToggle = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <header>
      <div className="logo">
        <img src={logo} alt="logo" />
        <h1>NoteNest</h1>
      </div>
      <div className="nav-links">
        <Link to="/">Contact Us</Link>
        <Link to="/">Help</Link>
        <Link to="/">Blog</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
      <div className="dropdown">
        {toggleMenu ? (
          <CloseRoundedIcon
            className="dropdown-icon"
            onClick={handleMenuToggle}
          />
        ) : (
          <MenuRoundedIcon
            className="dropdown-icon"
            onClick={handleMenuToggle}
          />
        )}
        <div className={`dropdown-menu ${toggleMenu ? "active" : ""}`}>
          <Link to="/">Contact Us</Link>
          <Link to="/">Help</Link>
          <Link to="/">Blog</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
