import React from 'react';
import CustomLink from '../components/CustomLink';
import {useNavigate} from 'react-router-dom'; 
// import '../styles/styles.css'
const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="h-screen bg-primary p-10">
            <div class="hidden lg:flex items-center justify-between" > 
            <p>PAYMATE.</p>
            <a href="">About Me</a>
            <button>Contact</button>
            </div>

            <h1>Finance Management In  Smart Way</h1>
            <button onClick={(e) => {
               e.preventDefault();
               navigate('/signup');
            }}>Take Me In</button>
            <CustomLink link = "signin" text = "Already Have an Account? Sign In" />
        </div>
    );
};

export default Home;

