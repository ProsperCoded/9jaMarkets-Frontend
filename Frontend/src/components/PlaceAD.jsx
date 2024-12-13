import { useState } from "react";

const PlaceAd = () => {
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    condition: "",
    description: "",
    price: "",
    bulkPrice: "",
    negotiable: "Not sure",
    phoneNumber: "",
    name: "",
    deliveryOptions: [],
    promotion: "No promo",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDeliveryOption = (option) => {
    setFormData((prevState) => ({
      ...prevState,
      deliveryOptions: prevState.deliveryOptions.includes(option)
        ? prevState.deliveryOptions.filter((o) => o !== option)
        : [...prevState.deliveryOptions, option],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/ads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Ad submitted successfully!");
      } else {
        alert("Error submitting ad.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button className="text-Primary-600 hover:underline">← Back</button>
        <h1 className="font-semibold text-xl">Place an Advert</h1>
        <button className="text-Primary-600 hover:underline">Clear</button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white shadow-md p-6 rounded-md"
      >
        {/* Input Fields */}
        <div className="gap-4 grid grid-cols-2">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
            className="border-gray-300 p-2 border rounded-md w-full"
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleInputChange}
            className="border-gray-300 p-2 border rounded-md w-full"
          />
          <select
            name="condition"
            value={formData.condition}
            onChange={handleInputChange}
            className="border-gray-300 p-2 border rounded-md w-full"
          >
            <option value="">Condition</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="border-gray-300 col-span-2 p-2 border rounded-md w-full"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            className="border-gray-300 p-2 border rounded-md w-full"
          />
          <input
            type="number"
            name="bulkPrice"
            placeholder="Add Bulk Price"
            value={formData.bulkPrice}
            onChange={handleInputChange}
            className="border-gray-300 p-2 border rounded-md w-full"
          />
        </div>

        {/* Negotiation Options */}
        <div className="space-y-4">
          <p>Open to negotiation?</p>
          <div className="flex space-x-6">
            <label>
              <input
                type="radio"
                name="negotiable"
                value="Yes"
                checked={formData.negotiable === "Yes"}
                onChange={handleInputChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="negotiable"
                value="No"
                checked={formData.negotiable === "No"}
                onChange={handleInputChange}
              />
              No
            </label>
            <label>
              <input
                type="radio"
                name="negotiable"
                value="Not sure"
                checked={formData.negotiable === "Not sure"}
                onChange={handleInputChange}
              />
              Not sure
            </label>
          </div>
        </div>

        {/* Contact Info */}
        <div className="gap-4 grid grid-cols-2">
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="border-gray-300 p-2 border rounded-md w-full"
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="border-gray-300 p-2 border rounded-md w-full"
          />
        </div>

        {/* Delivery Options */}
        <div>
          <p className="mb-2">Delivery Options</p>
          <div className="flex space-x-4">
            {["Pickup", "Courier"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleDeliveryOption(option)}
                className={`px-4 py-2 border rounded-md ${
                  formData.deliveryOptions.includes(option)
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Promotion Options */}
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="mb-4 font-semibold">Promote your advert</h3>
          <div className="space-y-4">
            <label>
              <input
                type="radio"
                name="promotion"
                value="No promo"
                checked={formData.promotion === "No promo"}
                onChange={handleInputChange}
              />
              No promo (Free)
            </label>
            <label>
              <input
                type="radio"
                name="promotion"
                value="Top - 7 days"
                checked={formData.promotion === "Top - 7 days"}
                onChange={handleInputChange}
              />
              Top (₦3,500 for 7 days)
            </label>
            <label>
              <input
                type="radio"
                name="promotion"
                value="Boost Premium Pro - 1 Month"
                checked={formData.promotion === "Boost Premium Pro - 1 Month"}
                onChange={handleInputChange}
              />
              Boost Premium Pro (₦27,500 for 1 Month)
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-600 px-4 py-2 rounded-md w-full font-semibold text-white"
        >
          Post Advert
        </button>
      </form>
    </div>
  );
};

export default PlaceAd;
