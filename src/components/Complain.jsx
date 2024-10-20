import React, { useState, useRef } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db ,storage} from '../config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Toast from './Toast';
import { v4 } from 'uuid';

const Complain = ({ currentUser }) => {
  const [imageFiles, setImageFiles] = useState([]);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastOpen, setToastOpen] = useState(false);
  const [toastColor, setToastColor] = useState('');

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
      const files = Array.from(e.target.files);
      setImageFiles((prevFiles) => [...prevFiles, ...files.slice(0,5)]); 
  };
  const uploadImagesAndGetURLs = async (imageFiles) => {
    const imageLinks = [];
    try {
      const promises = imageFiles.map(async (file) => {
        const imgRef = ref(storage, `images/${file.name + v4()}`);
        await uploadBytes(imgRef, file);
        const url = await getDownloadURL(imgRef);
        imageLinks.push({path:imgRef.fullPath , url:url });
      });
      await Promise.all(promises); 
      return imageLinks;
    } catch (error) {
      console.error('Error uploading images:', error.message);
      throw error("Error uploading images , try again.");
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const dbCollection = collection(db, 'complaints');
      const imageLinks = await uploadImagesAndGetURLs(imageFiles); 
      await addDoc(dbCollection, {
        complainerid: auth.currentUser.uid,
        complainerEmail: auth.currentUser.email,
        complaintime: serverTimestamp(),
        description,
        images: imageLinks,
        location,
        phoneno: isAnonymous ? '' : phoneNumber,
        type: isAnonymous ? 'anonymous' : 'blame',
        status:'Pending'
      });

      
      fileInputRef.current.value = '';
      setImageFiles([]);
      setLocation('');
      setDescription('');
      setIsAnonymous(true);
      setPhoneNumber('');

      // Show success toast
      setToastMessage('Complaint added successfully');
      setToastColor('green');
      setToastOpen(true);
    } catch (error) {
      console.error('Error adding document: ', error.message);
      setToastMessage('Insufficient information for complaint');
      setToastColor('red');
      setToastOpen(true);
    }
  };

  return (
    <div className='mx-auto my-auto mt-0 bg-gray-100'>
      <Toast open={toastOpen} setOpen={setToastOpen} message={toastMessage} color={toastColor}></Toast>

      <form className="mx-10 my-10 mt-8 p-4 bg-white rounded-lg shadow-md" onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Images (Max 5)</label>
          <input
            type="file"
            id="image"
            name="image"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef} 
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="anonymous"
              name="identity"
              value="anonymous"
              checked={isAnonymous}
              onChange={() => setIsAnonymous(true)}
              className="mr-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label htmlFor="anonymous" className="text-sm text-gray-700">Anonymous</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="blame"
              name="identity"
              value="blame"
              checked={!isAnonymous}
              onChange={() => setIsAnonymous(false)}
              className="mr-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label htmlFor="blame" className="text-sm text-gray-700">Blame</label>
          </div>
        </div>
        {!isAnonymous && (
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Complain;
