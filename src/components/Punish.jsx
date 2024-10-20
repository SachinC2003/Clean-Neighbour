import React, { useState } from 'react';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore'; // Assuming you're using Firestore
import { db } from '../config/firebase';
import { notificationSender } from '../utils/notificationSender';
const Punish= () => {
  const [userEmail, setUserEmail] = useState('');

  const punishUser = async () => {
    try {
        // Query the user by email
        const userQuery = query(collection(db, 'users'), where('email', '==', userEmail));
        const querySnapshot = await getDocs(userQuery);

        querySnapshot.forEach(async (doc) => {
            const userRef = doc.ref;
            const currentReward = doc.data().reward || 0;
            // Update the user's reward by subtracting 500
            await updateDoc(userRef, {
                reward: currentReward - 500,
            });

            // Send notification to the user using the id field from the document data
            const userId = doc.data().id;
            notificationSender(userId, {
                message: 'You have been assigned fine of 500 RS by admin.',
                read: false,
            });

            console.log('User punished successfully!');
        });
    } catch (error) {
        console.error('Error punishing user:', error.message);
    }
};


  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <div className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-md">
        <input
          type="email"
          placeholder="Enter user email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full mb-3"
        />
        <button onClick={punishUser} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md w-full">
          Punish
        </button>
      </div>
    </div>
  );
};

export default Punish;
