import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import { useLoginForm } from "../../utils/loginUtils";
import "./loginform.css";

const LoginForm = () => {
  const {
    passwordVisibility,
    loginFormData,
    isFormSubmitted,
    message,
    togglePasswordVisibility,
    handleChange,
    handleSubmit,
  } = useLoginForm();
  return (
    <>
      <div
        className="err-text"
        style={{
          transform: message ? "translateY(0)" : "translateY(-60px)",
        }}
      >
        {isFormSubmitted ? (
          <CheckCircleTwoToneIcon className="success" />
        ) : (
          <CancelTwoToneIcon className="failure" />
        )}
        {message}
      </div>
      <div className="form-container">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={loginFormData.email}
            onChange={handleChange}
          />
          <div className="password-input">
            <input
              type={passwordVisibility ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              value={loginFormData.password}
              onChange={handleChange}
            />
            {passwordVisibility ? (
              <VisibilityRoundedIcon
                className="pass"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <VisibilityOffRoundedIcon
                className="pass"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
