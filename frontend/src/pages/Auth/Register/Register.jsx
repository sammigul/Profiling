import React, { useState, useEffect } from "react";

import { useNavigate, Link } from 'react-router-dom';

import { registerUser } from "../../../services/authentication";

import './register_styles.css'

import { saveDataToLocalStorage } from "../../../utils/LocalStorage";

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const [errorVisible, setErrorVisible] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState('')



    const navigate = useNavigate();

    const redirectProfile = () => {
        navigate("/");
    };

    const validateForm = () => {
        // Validating user input
        if (!name || !email || !password) {
            setErrorVisible(true)
            setErrorMsg('Please fill out all fields');
            return false;
        }


        // It is most probably not needed, as html handles it if we set input type = email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorVisible(true)
            setErrorMsg('Please enter a valid email address.');
            return false;
        }
        return true
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const data = { name, email, password };

        try {
            const response = await registerUser(data);

            if (response.status === 201) {
                console.log(response.data);
                saveDataToLocalStorage("refreshToken", response.data.refreshToken);
                saveDataToLocalStorage("accessToken", response.data.accessToken);
                saveDataToLocalStorage("userName", response.data.user.name);
                saveDataToLocalStorage("userEmail", response.data.user.email);
                redirectProfile();
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorVisible(true)
            setErrorMsg(error.response.data.message)
        }
    };

    // If user is already logged in, redirect to profile page
    // Commenting out this code as task is to implement with login and register links

    /*
        useEffect(() => {
            const accessToken = localStorage.getItem("accessToken");
            if (accessToken) redirectProfile();
        }, []);
    */

    return (
    <div className="main-containerr" onFocus={()=>setErrorVisible(false)} >
        <section className="section-containerr">
            <h2  className="headingr  ">
                Sign Up
            </h2>
            { errorVisible && (
            <div className="error-containerr ">
                <p  className="error-textr">{errorMsg}</p>
            </div>)
            }
                        
            <form  onSubmit={handleSubmit}>
            
            {/* Can Extract this and create a component but, will have to provide props for all these attributes */}
                <div className="input-containerr">
                    <label htmlFor="name" className="labelr">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="inputr"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </div>

                <div className="input-containerr">
                    <label className="labelr" htmlFor="email" >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="inputr"
                        placeholder="gul@gmail.com"
                        autoComplete="true"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>

                <div className="input-containerr">
                    <label className="labelr" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className="inputr"
                        placeholder="Your password"
                    />
                </div>
                <div className="btnr-container">
                    <button type="submit" className="btnr">
                        Register
                    </button>
                </div>
            </form>
            <p className="sec-textr">
                Already have and account? <Link to={'/login'} className="link" >Login</Link>
            </p>
        </section>
    </div>
    );
}
export default Register;
