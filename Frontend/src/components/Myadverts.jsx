import React, { useState } from 'react';

const MyAdverts = () => {
  const [adverts, setAdverts] = useState([
    {
      id: 1,
      title: 'Brown Laptop Bag',
      price: 5000,
      date: '8/5/2024',
      imageUrl: '/path/to/bag-image.jpg',
      status: 'draft',
    },
  ]);

  const deleteAdvert = (id) => {
    setAdverts(adverts.filter(ad => ad.id !== id));
  };

  const postAdvert = (id) => {
    // Logic to post the advert (API call or state update)
    const updatedAdverts = adverts.map(ad =>
      ad.id === id ? { ...ad, status: 'posted' } : ad
    );
    setAdverts(updatedAdverts);
  };

  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">My Adverts</h2>
        <div className="flex items-center space-x-2 text-green-700">
          <span className="flex items-center">
            <i className="ri-draft-line mr-1"></i> 1 Draft
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {adverts.map(advert => (
          <div key={advert.id} className="border rounded-md p-4 shadow-sm flex items-center">
            <img src={advert.imageUrl} alt={advert.title} className="w-16 h-16 object-cover rounded-md mr-4" />
            <div className="flex-1">
              <h3 className="font-medium text-lg">{advert.title}</h3>
              <p className="text-gray-500">₦ {advert.price}</p>
              <p className="text-gray-400 text-sm">📅 {advert.date}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="space-x-2 mb-2">
                <button onClick={() => postAdvert(advert.id)} className="bg-orange-500 text-white px-3 py-1 rounded-md">
                  Post AD
                </button>
                <button onClick={() => deleteAdvert(advert.id)} className="text-red-600">
                  Delete
                </button>
              </div>
              <a href="#" className="text-green-600">Edit</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAdverts;
