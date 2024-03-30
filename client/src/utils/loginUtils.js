import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export function useLoginForm() {

    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [loginFormData, setLoginFormData] = useState({
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
        setLoginFormData({ ...loginFormData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/login", loginFormData, {
                withCredentials: true
            });
            if (res.data.error) {
                setIsFormSubmitted(false);
                setMessage(res.data.error);
                setTimeout(() => {
                    setMessage("");
                }, 2000);
            } else {
                setLoginFormData({
                    firstname: "",
                    lastname: "",
                    email: "",
                    password: ""
                });
                setIsFormSubmitted(true);
                setMessage("Login successful");
                setTimeout(() => {
                    navigate("/notes");
                }, 1000);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return {
        passwordVisibility,
        loginFormData,
        isFormSubmitted,
        message,
        togglePasswordVisibility,
        handleChange,
        handleSubmit,
    };
}