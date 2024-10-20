import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Layout from './Layout';


const ProtectedRoute = ({ children , rRole}) => {
  const navigate =useNavigate();
  const [user, setUser] = useState(false);
  const [role , setRole]=useState('')
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(!user)navigate('/login')
      else {
        setUser(user);
        const q = query(collection(db, 'users'), where('id', '==', auth.currentUser.uid));
        try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          if(userData.role!==rRole && rRole!=='any'){
            console.log(userData.role) 
            navigate('/inbox');
          }
          setRole(userData.role)

        });
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      }
      }
    });
    return () => unsubscribe();
  }, []);
 
  return (
    <div>
      <Layout role={role} >
        {children}
      </Layout>
    </div>
  );
  
};
export default ProtectedRoute;