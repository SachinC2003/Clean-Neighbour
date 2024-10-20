import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import Alert from './Alert';
import { decodeFirebaseError } from '../constants/firebaseErrorMessages';
import { addDoc, collection } from 'firebase/firestore';
 
const LoginForm = () => {
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate =useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const userCredential = await signInWithEmailAndPassword(auth,loginInfo.email, loginInfo.password);
        //const dbUsers = collection(db, 'users');
        // await addDoc(dbUsers,{
        //   email:userCredential.user.email,
        //   id:userCredential.user.uid,
        //   role:'user',
        //   notifications:[]
        // })
        console.log(userCredential)
        console.log('User logged successfully:', userCredential.user);
        navigate('/home')
    } catch (err) {
      console.log(err)
        console.log(err.code)
        const errMessage = decodeFirebaseError(err)
        setError(errMessage);
        setAltertopen(true)
    }
};
  const [showPassword, setShowPassword] = useState(false);
  const [alertOpen,setAltertopen]=useState(false)
  const [error, setError] = useState(null);
  const [loginInfo,setLoginInfo] = useState({
    email:"",
    password:"",
  });
  return (
    <div>
      
      <Alert title={"Login error"} open={alertOpen} setAltertopen={setAltertopen} message={error}></Alert>  
      <form>
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="bg-white py-6 rounded-md px-10 max-w-lg shadow-md">
            <h1 className="text-center text-lg font-bold text-gray-500">Login</h1>
            <div className="space-y-4 mt-6">
              
              <div className="w-full">
                <input value={loginInfo.email} type="text" placeholder="email" className="w-full px-4 py-2 bg-gray-50" 
                   onChange={(e)=>{
                    setLoginInfo({...loginInfo,email:e.target.value})
                  }}                
                />
              </div>
              <div className="flex items-center">
                <input value={loginInfo.password} type={showPassword ? 'text' : 'password'} placeholder="password" className="px-4 py-2 bg-gray-50" 
                  onChange={(e)=>{
                    setLoginInfo({...loginInfo,password:e.target.value})
                  }}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="ml-2 p-2 bg-gray-50 rounded-md hover:bg-gray-300  "
                >
                  {showPassword ? 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                    </svg>
                  : 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                  }
                </button>
              </div>
            </div>
            <button className="w-full mt-5 bg-indigo-600 text-white py-2 rounded-md font-semibold tracking-tight"
              onClick={handleSubmit}
            >Login</button>
            <p className='pt-2'>Don't have an account? <Link className='underline text-blue-500' to={'/signup'}>
                  Sign up
            </Link></p>
          </div>
          
        </div>
      </form>
    </div>
  )
}

export default LoginForm