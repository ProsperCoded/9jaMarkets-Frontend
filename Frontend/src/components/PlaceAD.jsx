import React from "react";
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { ImageUploader } from "./PlaceAD/ImageUploader";
import { ProductForm } from "./PlaceAD/ProductForm";
import { PromotionModal } from "./PlaceAD/PromotionModal";

export default function AddProduct() {
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [formData, setFormData] = React.useState({
    productName: '',
    category: '',
    price: '',
    inStock: '',
    description: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (selectedImages.length === 0) {
      message.error('Please upload at least one product image');
      return false;
    }

    if (!formData.productName.trim()) {
      message.error('Please enter a product name');
      return false;
    }
    if (!formData.category) {
      message.error('Please select a category');
      return false;
    }
    if (!formData.price.trim()) {
      message.error('Please enter a price');
      return false;
    }
    if (!formData.inStock) {
      message.error('Please select stock status');
      return false;
    }
    if (!formData.description.trim()) {
      message.error('Please enter a product description');
      return false;
    }

    return true;
  };

  const handleAddProduct = () => {
    if (validateForm()) {
      setShowModal(true);
    }
  };

  const handleSelectPlan = (planId) => {
    setShowModal(false);
    navigate(`/billing?plan=${planId}`);
  };

  return (
    <div className="flex-grow bg-white rounded-2xl py-10 shadow-md mx-auto mt-8 mb-8 max-w-4xl p-4 sm:p-6 pb-20">
      <div className="gap-6 grid">
        <ImageUploader
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
        />

        <ProductForm
          formData={formData}
          handleInputChange={handleInputChange}
          onCancel={() => {}} // Add cancel handler if needed
          onSubmit={handleAddProduct}
        />
      </div>

      {showModal && (
        <PromotionModal
          onClose={() => setShowModal(false)}
          onSelectPlan={handleSelectPlan}
        />
      )}
    </div>
  );
}
