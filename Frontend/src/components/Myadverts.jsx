import React, { useState } from "react";

const MyAdverts = () => {
  const [adverts, setAdverts] = useState([
    {
      id: 1,
      title: "Brown Laptop Bag",
      price: 5000,
      date: "8/5/2024",
      imageUrl: "/path/to/bag-image.jpg",
      status: "draft",
    },
  ]);

  const deleteAdvert = (id) => {
    setAdverts(adverts.filter((ad) => ad.id !== id));
  };

  const postAdvert = (id) => {
    // Logic to post the advert (API call or state update)
    const updatedAdverts = adverts.map((ad) =>
      ad.id === id ? { ...ad, status: "posted" } : ad
    );
    setAdverts(updatedAdverts);
  };

  return (
    <div className="bg-white shadow-md p-5 rounded-lg">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-semibold text-xl">My Adverts</h2>
        <div className="flex items-center space-x-2 text-green-700">
          <span className="flex items-center">
            <i className="mr-1 ri-draft-line"></i> 1 Draft
          </span>
        </div>
      </div>

      <div className="gap-5 grid grid-cols-1">
        {adverts.map((advert) => (
          <div
            key={advert.id}
            className="flex items-center shadow-sm p-4 border rounded-md"
          >
            <img
              src={advert.imageUrl}
              alt={advert.title}
              className="mr-4 rounded-md w-16 h-16 object-cover"
              lazy="true"
            />
            <div className="flex-1">
              <h3 className="font-medium text-lg">{advert.title}</h3>
              <p className="text-gray-500">₦ {advert.price}</p>
              <p className="text-gray-400 text-sm">📅 {advert.date}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="space-x-2 mb-2">
                <button
                  onClick={() => postAdvert(advert.id)}
                  className="bg-orange px-3 py-1 rounded-md text-white"
                >
                  Post AD
                </button>
                <button
                  onClick={() => deleteAdvert(advert.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
              <a href="#" className="text-green-600">
                Edit
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAdverts;
