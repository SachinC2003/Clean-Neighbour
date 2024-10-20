import React, { useState } from 'react';
import { doc, updateDoc, query, where, getDocs, collection } from 'firebase/firestore';
import { db, storage } from '../config/firebase'; 
import { notificationSender } from '../utils/notificationSender';

const ComplaintAction = ({ complaint }) => {
  const { id: complaintId, description, location, type, status, complainerEmail,verifyImages, complaintime, phoneno, images, complainerid } = complaint;
  const [teamNumber, setTeamNumber] = useState('1'); 
  const verifyCompletion = async () =>{
    try{
      const complaintRef = doc(db, 'complaints', complaintId);
      await updateDoc(complaintRef, {
        status: 'vcompleted',
      });
      notificationSender(complainerid,{
        message:"Your complaint has been succesfully completed."
      })
    }catch(err)
  {
    console.log("Error verifying completed complaint.")
  }
  }
  const assignToClean = async () => {
    try {
        const complaintRef = doc(db, 'complaints', complaintId);
        const teamNumberInt = parseInt(teamNumber); 
        await updateDoc(complaintRef, {
            status: 'assigned',
            assigned: teamNumberInt,
        });
        const usersQuerySnapshot = await getDocs(query(collection(db, 'users'), where('role', '==', 'garbage-collector'), where('team', '==', teamNumberInt)));
        let garbageCollectorId = "";
        usersQuerySnapshot.forEach(doc => {
            garbageCollectorId = doc.data().id; 
        });  
        const notification = {
            message: 'A complaint has been assigned to your team.',
            read: false,
        };
        await notificationSender(garbageCollectorId, notification);
        console.log('Complaint assigned successfully!');
    } catch (error) {
        console.error('Error assigning complaint:', error.message);
    }
};


const rewardUser = async () => {
    try {
        console.log(complainerid);
        const userQuery = query(collection(db, 'users'), where('id', '==', complainerid));
        const querySnapshot = await getDocs(userQuery);
        
        console.log(querySnapshot);
        querySnapshot.forEach(async (doc) => {
            console.log(doc.data());
            const userRef = doc.ref; // Use doc.ref to get the reference to the document
            console.log(doc.id);
            await updateDoc(userRef, {
                reward: (doc.data().reward || 0) + 5,
            });
            notificationSender(complainerid, {
                message: 'You have been rewarded , collect reward from nearby office.',
                read: false,
            });
            console.log('User rewarded successfully!');
        });
    } catch (error) {
        console.error('Error rewarding user:', error.message);
    }
  };
  return (
    <div>
      <div className="mx-2 bg-white rounded-xl shadow-md overflow-hidden mb-4">
        <div className="p-4">
          <p className="text-sm mb-2">Complainer Email: {complainerEmail}</p>
          <h2 className="text-sm font-semibold mb-2">Description: {description}</h2>
          <p className="text-sm mb-2" style={{ wordWrap: 'break-word' }}>Location: {location}</p>
          <p className="text-sm mb-2" style={{ wordWrap: 'break-word' }}>Type: {type}</p>
          <p className="text-sm mb-2" style={{ wordWrap: 'break-word' }}>Status: {status}</p>
          <p className="text-sm mb-2" style={{ wordWrap: 'break-word' }}>Phone Number: {phoneno || 'N/A'}</p>
          <div className='grid grid-cols-2 gap-2'>
            {images?.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Image ${index}`}
                className="w-66 h-auto"
              />
            ))}
          </div>
          <h6>Verify images:</h6>
          <div className='grid grid-cols-2 gap-2'>
            {verifyImages?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index}`}
                className="w-66 h-auto"
              />
            ))}
          </div>
          <div>
            <label htmlFor="teamNumber">Team Number:</label>
            <select className='p-3 ml-2' id="teamNumber" value={teamNumber} onChange={(e) => setTeamNumber(e.target.value)}>
              <option value="1">Team 1</option>
              <option value="2">Team 2</option>
              <option value="3">Team 3</option>
            </select>
            {status==='pending' && <button  className='bg-green-500 p-2 rounded-md ml-2' onClick={assignToClean}>
              Assign to Clean
            </button>}

            {status === 'completed' || status === 'vcompleted' && (
              <button className='bg-green-500 p-2 rounded-md ml-2' onClick={rewardUser}>
                Reward user
              </button>
            )}

            {status === 'completed' && (
              <button className='bg-green-500 p-2 rounded-md ml-2' onClick={verifyCompletion}>
                verify completion
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintAction;
