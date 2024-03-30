import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function useSignupForm() {
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [signupFormData, setSignupFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisibility((prev) => !prev);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupFormData({ ...signupFormData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/signup", signupFormData)
            if (res.data.error) {
                setIsFormSubmitted(false)
                setMessage(res.data.error)
                setTimeout(() => {
                    setMessage("")
                }, 2000)
            } else {
                setSignupFormData({
                    firstname: "",
                    lastname: "",
                    email: "",
                    password: ""
                })
                setIsFormSubmitted(true)
                setMessage("Registration successful")
                setTimeout(() => {
                    navigate("/notes")
                }, 1000)
            }
        } catch (err) {
            console.log(err);
        }
    };

    return {
        passwordVisibility,
        signupFormData,
        isFormSubmitted,
        message,
        togglePasswordVisibility,
        handleChange,
        handleSubmit,
    }
}