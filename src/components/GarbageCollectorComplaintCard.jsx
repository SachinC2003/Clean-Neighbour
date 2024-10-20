import React, { useState, useRef } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../config/firebase';
import { notificationSender } from '../utils/notificationSender';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const GarbageCollectorComplaintCard = ({ complaint }) => {
  const { description, location, type, complainerEmail, complaintime, phoneno, images, id, status } = complaint;
  const [imageFiles, setImageFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleReportBluff = async () => {
    try {
      const complaintRef = doc(db, 'complaints', id);
      await updateDoc(complaintRef, { status: 'reported' });

      // Hardcoded admin ID
      const adminId = 'TX0hxIHlRBW2M6leHroBKR7OV4U2';

      // Create the notification object
      const notification = {
        message: 'A complaint has been reported.',
        complaintId: id,
        read: false,
        // Add any other fields you want in the notification
      };

      // Send notification to the admin
      await notificationSender(adminId, notification);
      console.log('Complaint reported successfully!');
    } catch (error) {
      console.error('Error reporting complaint:', error.message);
    }
  };

  const handleMarkCompleted = async () => {
    try {
      // Upload images to Firebase Storage and obtain their URLs
      const imageUrls = await uploadImagesAndGetURLs(imageFiles);

      // Update the complaint document with the URLs of the uploaded images
      const complaintRef = doc(db, 'complaints', id);
      await updateDoc(complaintRef, {
        status: 'completed',
        verifyImages: imageUrls, // Assuming verifyImages is an array field in the document
      });

      // Hardcoded admin ID
      const adminId = 'TX0hxIHlRBW2M6leHroBKR7OV4U2';

      // Create the notification object
      const notification = {
        message: 'A complaint has been marked as completed.',
        complaintId: id,
        read: false,
        // Add any other fields you want in the notification
      };

      // Send notification to the admin
      await notificationSender(adminId, notification);
      console.log('Complaint marked as completed successfully!');
    } catch (error) {
      console.error('Error marking complaint as completed:', error.message);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

  const uploadImagesAndGetURLs = async (imageFiles) => {
    const imageLinks = [];
    try {
      const promises = imageFiles.map(async (file) => {
        const imgRef = ref(storage, `images/${file.name}`);
        await uploadBytes(imgRef, file);
        const url = await getDownloadURL(imgRef);
        imageLinks.push(url);
      });
      await Promise.all(promises);
      return imageLinks;
    } catch (error) {
      console.error('Error uploading images:', error.message);
      throw new Error("Error uploading images, try again.");
    }
  };

  return (
    <div className="mx-2 bg-white rounded-xl shadow-md overflow-hidden mb-4">
      <div className="p-4">
        <p className="text-sm mb-2">Complainer Email: {complainerEmail}</p>
        <h2 className="text-sm font-semibold mb-2">Description: {description}</h2>
        <p className="text-sm mb-2" style={{ wordWrap: 'break-word' }}>Location: {location}</p>
        <p className="text-sm mb-2" style={{ wordWrap: 'break-word' }}>Type: {type}</p>
        <p className="text-sm mb-2" style={{ wordWrap: 'break-word' }}>Status: {status}</p>
        <p className="text-sm mb-2" style={{ wordWrap: 'break-word' }}>Phone Number: {phoneno || 'N/A'}</p>
        <div className='grid grid-cols-2 gap-2'>
          {images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`Image ${index}`}
              className="w-66 h-auto"
            />
          ))}
        </div>
        <div className='flex gap-5 pt-5'>
          <button className='bg-red-500 p-2 rounded-md' onClick={handleReportBluff}>
            Report bluff
          </button>
          <button className='bg-green-500 p-2 rounded-md' onClick={handleMarkCompleted}>
            Mark as completed
          </button>
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
        </div>

      </div>
    </div>
  );
};

export default GarbageCollectorComplaintCard;
