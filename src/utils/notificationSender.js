import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../config/firebase";

export const notificationSender = async (userId, notification) => {
    try {
        const usersQuerySnapshot = await getDocs(query(collection(db, 'users'), where('id', '==', userId)));
        if(!usersQuerySnapshot.empty) {
            console.log(usersQuerySnapshot.docs[0].data())
            const userData = usersQuerySnapshot.docs[0].data()
            const userDoc = usersQuerySnapshot.docs[0].ref;
            console.log(userDoc)
            const currentNotifications = userData.notifications || [];
            console.log("currrent notification:",currentNotifications)
            const updatedNotifications = [...currentNotifications, notification];
            await updateDoc(userDoc,{
                notifications: updatedNotifications
            });
            console.log('Notification sent and user document updated successfully.');
        }else{
            console.error('Error sending notification: User not found.');
        }
    } catch (error) {
        console.error('Error sending notification:', error.message);
    }
};
