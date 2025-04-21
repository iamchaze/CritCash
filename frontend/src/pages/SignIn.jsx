import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CustomLink from "../components/CustomLink";

const SignIn = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    return (
        <>
        <h1>Welcome Back!</h1>
        <h3>Get Closer To Your Finances</h3>
        <div>
            <form>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input type="text" id="username" />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="text" id="password" />
                </div>
                <button onClick={(e) => {
                     e.preventDefault(); 
                     navigate('/dashboard')
                }}>Login</button>
                <CustomLink link = "signup" text = "Don't Have an Account? Sign Up"/>
            </form>
        </div>
        </>
    );
}   

export default SignIn;