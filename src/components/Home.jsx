import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../config/firebase'; 
import ComplaintCard from './ComplaintCard';

const Home = () => {
  const [userComplaints, setUserComplaints] = useState([]);
  const [currentUserUid, setCurrentUserUid] = useState(null);

  useEffect(() => {
    const fetchUserComplaints = async () => {
      if (!currentUserUid) {
        console.error('User not logged in.');
        return;
      }
      const q = query(collection(db, 'complaints'), where('complainerid', '==', currentUserUid));
      try {
        const querySnapshot = await getDocs(q);
        const complaintsData = [];

        querySnapshot.forEach((doc) => {
          const complaintData = doc.data();
          complaintsData.push({ id: doc.id, ...complaintData });
        });

        setUserComplaints(complaintsData);
      } catch (error) {
        console.error('Error fetching user complaints:', error.message);
      }
    };

    fetchUserComplaints();
  }, [currentUserUid]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserUid(user.uid);
      } else {
        setCurrentUserUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className='p-2 w-full h-full overflow-scroll'>
      <h1 className='text-xl'>User Complaints</h1>

      <ul className='mt-3 grid grid-cols-1 lg:grid-cols-2 '>
        {userComplaints.map((complaint) => (
          <li className='col-span-1' key={complaint.id}>
            <ComplaintCard complaint={complaint}></ComplaintCard>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
