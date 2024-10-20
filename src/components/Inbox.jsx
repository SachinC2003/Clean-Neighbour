import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../config/firebase'; 
import { Link } from 'react-router-dom';

const Inbox = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user.uid);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const fetchNotifications = async () => {
        try {
          // Query to get all notifications for the current user
          console.log(currentUser)
          const q = query(collection(db, 'users'), where('id', '==', currentUser));
          const querySnapshot = await getDocs(q);

          // Extract notifications data from the query snapshot
          const notificationsData = [];
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            console.log(userData)
            notificationsData.push(...userData.notifications);
          });
          console.log("notifications:",notificationsData)
          // Update state with notifications data
          setNotifications(notificationsData);
        } catch (error) {
          console.error('Error fetching notifications:', error.message);
        }
      };

      fetchNotifications();
    }
  }, [currentUser]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Inbox</h2>
      <ul className="space-y-4">
        {notifications.map((notification, index) => (
          <li key={index} className="bg-white p-4 rounded shadow">
            <div className="text-lg font-semibold">{notification.message}</div>
            {
              notification.complaintId && (
                <Link className='underline text-blue-500' to={`/takeaction/${notification.complaintId}`} >
                  complain </Link>
              )
            }
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inbox;
