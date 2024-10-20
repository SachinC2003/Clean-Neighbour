import { collection, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase';
import ComplaintCard from './ComplaintCard';
import AdminComplaintCard from './AdminComplaintCard';

const Complaints = () => {
    const[complaints,setComplaints]=useState([]);
    useEffect(()=>{
        const getComplants = async ()=>{
            const dbComplains = collection(db,'complaints')
            const complaintsSnapshot = await getDocs(dbComplains);
            const complaintsData = complaintsSnapshot.docs.map((doc) => ({
                complaintid: doc.id,
                ...doc.data(),
              }));
              console.log(complaintsData); // Log fetched complaints data  
              setComplaints(complaintsData); // Update state with fetched complaints
        }
        getComplants();
    },[])
  return (
    <div className='h-full overflow-scroll'>
        <ul className='mt-3 grid grid-cols-1 lg:grid-cols-2 '>
            {complaints.map((complaint) => (
            <li className='col-span-1' key={complaint.complaintid}>
                <AdminComplaintCard complaint={complaint}></AdminComplaintCard>
            </li>
            ))}
        </ul>
    </div>
  )
}

export default Complaints