import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';

const Logout = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        auth.signOut().then(function() {
        console.log("User signed out");
        navigate('/')
        }).catch(function(error) {
        console.error("Error signing out:", error);
        });
    },[]);
  return (
    <div>

    </div>
  )
}

export default Logout