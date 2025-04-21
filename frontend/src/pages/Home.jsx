import React from 'react';
import CustomLink from '../components/CustomLink';
import {useNavigate} from 'react-router-dom'; 

const Home = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Finance Management In Smart Way</h1>
            <button onClick={(e) => {
               e.preventDefault();
               navigate('/signup');
            }}>Take Me In</button>
            <CustomLink link = "signup" text = "Already Have an Account? Sign In" />
        </div>
    );
};

export default Home;