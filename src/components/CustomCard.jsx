import React from 'react';

const CustomCard = ({ title, image, text }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4 my-2">
        <h2 className="text-xl font-bold mb-2 text-black">{title}</h2>
      </div>
      <img className="w-1/3 object-cover mb-4 mx-auto" src={image} alt="Image" />
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base">
          {text}
        </p>
      </div>
    </div>
  );
};

export default CustomCard;
