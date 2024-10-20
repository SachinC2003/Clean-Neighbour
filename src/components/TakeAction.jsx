import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import ComplaintAction from './ComplaintAction';

const TakeAction = () => {
  const {complaintid} =  useParams()
  const [complaintData,setComplaintData]=useState({})
    useEffect(() => {
    const findComplaintById = async () => {
      try {
        const complaintRef = doc(db, 'complaints', complaintid);

        const complaintDoc = await getDoc(complaintRef);
        if (complaintDoc.exists()) {
          console.log(complaintDoc.data())
          setComplaintData( { id: complaintDoc.id, ...complaintDoc.data() });
        } else {
          console.log('Complaint not found');
          return null;
        }
      } catch (error) {
        console.error('Error finding complaint:', error.message);
        return null;
      }
    };
    findComplaintById();
  }, [complaintid]);
  return (
    <div>
      <ComplaintAction complaint={complaintData}></ComplaintAction>
    </div>
  )
}

export default TakeAction