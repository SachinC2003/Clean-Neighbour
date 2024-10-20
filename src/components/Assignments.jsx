import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import GarbageCollectorComplaintCard from './GarbageCollectorComplaintCard';

const Assignments = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [assignedComplaints, setAssignedComplaints] = useState([]);
  const [currentUserUid, setCurrentUserUid] = useState(null);
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
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log(currentUserUid)
        const userQuery = query(collection(db, 'users'), where('id', '==', currentUserUid));
        const userSnapshot = await getDocs(userQuery);
        console.log(userSnapshot)
        if (!userSnapshot.empty) {
          userSnapshot.forEach((doc) => {
            setUserDetails(doc.data());
          });
        } else {
          console.log('No user found with the provided UID.');
        }
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      }
    };

    fetchUserDetails();
  },[currentUserUid]);

  useEffect(() => {
    const fetchAssignedComplaints = async () => {
      if (userDetails && userDetails.team) {
        try {
          const complaintsQuery = query(
            collection(db, 'complaints'), 
            where('assigned', '==', userDetails.team),
            where('status', '==', 'assigned')
        );
        
          const complaintsSnapshot = await getDocs(complaintsQuery);
          const complaintsData = [];
          complaintsSnapshot.forEach((doc) => {
            complaintsData.push({ id: doc.id, ...doc.data() });
          });
          setAssignedComplaints(complaintsData);
        } catch (error) {
          console.error('Error fetching assigned complaints:', error.message);
        }
      }
    };

    fetchAssignedComplaints();
  }, [userDetails]);

  return (
    <div className='overflow-scroll w-100'>
      {assignedComplaints.map((complaint) => {
        return(<GarbageCollectorComplaintCard key={complaint.id} complaint={complaint}></GarbageCollectorComplaintCard>)
      }
        
      )}
    </div>
  );
};

export default Assignments;
