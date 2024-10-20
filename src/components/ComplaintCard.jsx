import React from 'react';

const ComplaintCard = ({ complaint }) => {
  const { description, location, type, status, complainerEmail, complaintime, phoneno ,images } = complaint;

  return (
    <div className=" mx-2 bg-white rounded-xl shadow-md overflow-hidden mb-4">
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
      </div>
    </div>
  );
};

export default ComplaintCard;
