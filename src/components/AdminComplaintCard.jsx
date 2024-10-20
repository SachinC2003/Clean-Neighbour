import React from 'react';
import { db, storage } from '../config/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { Link } from 'react-router-dom';

const AdminComplaintCard = ({ complaint }) => {
  
  const { description, location, type, status, complainerEmail, complaintime, phoneno ,images } = complaint;
  const deleteFile = async (filePath) => {
    try {
        console.log(filePath)
      const storageRef = ref(storage, filePath);
      await deleteObject(storageRef);
      console.log('File deleted successfully:', filePath);
    } catch (error) {
      console.error('Error deleting file:', error.message);
    }
  };
  const deleteComplain = async (complaintid,images) =>{
    console.log(complaintid)
    try{
        console.log(images)
        const complaintRef = doc(db,'complaints',complaintid);
        console.log(complaintRef)
        await deleteDoc(complaintRef);
        images.forEach(async (file) => {
            await deleteFile(file.path);
        });
        console.log('Document successfully deleted!');
    } catch (error) {
      console.error('Error deleting document:', error.message);
    }
    
  }
  return (
    <Link to={`/takeaction/${complaint.complaintid}`}>
        <div className=" mx-2 bg-white rounded-xl shadow-md overflow-hidden mb-4">
        
        <div className="p-4">
          <div className='flex justify-between'>
              <div>
  
              </div>
              <div className='cursor-pointer' onClick={(e)=>{
                e.preventDefault();
                deleteComplain(complaint.complaintid,complaint.images)}}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
              </div>
          </div>
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
        </div>
      </div>   
    </Link>
    
  );
};

export default AdminComplaintCard;
