import React, { useState, useEffect } from "react";

import { useNavigate, Link } from 'react-router-dom';

import './login_styles.css'

// importing services
import { saveDataToLocalStorage } from "../../../utils/LocalStorage";
import { loginUser } from "../../../services/authentication";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorVisible, setErrorVisible] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState('')



    const navigate = useNavigate();

    const redirectProfile = () => {
        navigate("/");
    };

    const validateForm = () => {
        // Validating user input
        if (!email || !password) {
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

        const data = { email, password };

        try {
            const response = await loginUser(data);
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
    <div className="main-containerl"  onFocus={()=>setErrorVisible(false)} >
        <section className="section-containerl">
            <h2  className="headingl">
                Login
            </h2>
            { errorVisible && (
            <div className="error-containerl ">
                <p  className="error-textl">{errorMsg}</p>
            </div>)
            }
                        
            <form  onSubmit={handleSubmit}>
            
            {/* Can Extract this and create a component but, will have to provide props for all these attributes */}
                <div className="input-containerl">
                    <label htmlFor="email" className="labell" >
                        Email
                    </label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    className="inputl"
                    placeholder="gul@gmail.com"
                    autoComplete="true"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>

                <div className="input-containerl">
                    <label htmlFor="password" className="labell">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className="inputl"
                        placeholder="Your password"
                    />
                </div >
                <div className="btn-container">
                    <button type="submit" className="btnl">
                        Login
                    </button>
                </div>
            </form>
            <p className="sec-textl">
                Don't have and account? <Link to={'/register'} className="link" >Register</Link>
            </p>
        </section>
    </div>
    );
}
export default Login;
