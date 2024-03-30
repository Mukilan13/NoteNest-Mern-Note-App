import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import "./signupform.css";
import { useSignupForm } from "../../utils/signupUtils";

const SignupForm = () => {
  const {
    passwordVisibility,
    signupFormData,
    isFormSubmitted,
    message,
    togglePasswordVisibility,
    handleChange,
    handleSubmit,
  } = useSignupForm();

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
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
          <div className="name-inputs">
            <input
              type="text"
              name="firstname"
              value={signupFormData.firstname}
              onChange={handleChange}
              placeholder="First name"
            />
            <input
              type="text"
              name="lastname"
              value={signupFormData.lastname}
              onChange={handleChange}
              placeholder="Last name"
            />
          </div>
          <input
            type="email"
            name="email"
            value={signupFormData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <div className="password-input">
            <input
              type={passwordVisibility ? "text" : "password"}
              name="password"
              value={signupFormData.password}
              onChange={handleChange}
              placeholder="Password"
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
          <button type="submit">Sign up</button>
        </form>
        <p>
          Already have an account ? <Link to="/login">Login</Link>
        </p>
      </div>
    </>
  );
};

export default SignupForm;
