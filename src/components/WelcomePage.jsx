import React from 'react';
import { Link } from "react-router-dom";
import cleaningImage1 from '../assets/cleaning1.jpg';
import cleaningImage2 from '../assets/cleaning2.jpg';
import backgroundImage from '../assets/background.jpg';

const WelcomePage = () => {
  return (
    <div className="relative bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0 opacity-70">
        <img src={backgroundImage} alt="Background" className="object-cover w-full h-full" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-3xl text-center font-bold text-orange-500 mb-4">Welcome to Clean Naiber</h1>
        <p className="text-lg text-gray-800 text-center mb-4 font-bold">Transforming Spaces, Enhancing Lives: Where Cleanliness Meets Comfort.</p>
        
        {/* Centered images */}
        <div className="flex justify-center">
          <img src={cleaningImage1} alt="Cleaning Service" className="w-1/4 rounded-md shadow-lg mr-4" />
          <img src={cleaningImage2} alt="Cleaning Service" className="w-1/4 rounded-md shadow-lg ml-4" />
        </div>
        
        <p className="text-lg text-gray-800 text-center mt-10 ml-20 mr-20">We're here to make your environment cleaner and healthier! Our professional cleaning services are tailored to meet your needs. Let us take care of the cleaning, so you can focus on what matters most to you.</p>
        <p className="text-lg text-gray-800 text-center mt-4 ml-20 mr-20">Contact us today to schedule your cleaning appointment and experience the difference!</p>
        <div className="flex justify-center mt-8">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-4">
            <Link to={`/signup`}>Sign Up</Link>
          </button>
          <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded">
            <Link to={`/login`}>Log In</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;