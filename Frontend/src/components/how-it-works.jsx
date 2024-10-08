import { useState } from 'react';
import Header2 from './Header2'; // Import Header2 component
import accountImage from '../assets/how-it-works/post.svg';

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('create-account');

  const renderContent = () => {
    switch (activeTab) {
      case 'create-account':
        return (
          <div className='bg-white p-8 rounded-lg'>
            <img src={accountImage} alt="Create Account" className="mb-4 block mx-auto max-w-full h-auto" />
            <h2 className="text-2xl font-bold mb-4">For Buyers</h2>
            <p className="text-gray-600">Click on the Sign Up button at the top right corner to create an account</p>
            <p className="text-gray-600">Fill in your details, verify your email or phone number, and complete your profile for a personalized shopping experience</p>
            <h2 className="text-2xl font-bold mb-4">For Vendors</h2>
            <p className="text-gray-600">If you are a vendor, select the Place an Ad button and follow the instructions to create your account</p>
            <p className="text-gray-600">Upload your business details, verify your identity, and you are ready to list products on 9ja markets</p>
          </div>
        );
      case 'browse-products':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Discover a wide range of products from vendors all over Nigeria</h2>
            <ul>
              <li className="text-black">Use the Search Bar to quickly find specific items by entering keywords, product names, or categories</li>
              <li className="text-black">Filter by market location, category, and price range to refine your search result</li>
              <li className="text-black">Explore our Featured Markets and Top Vendors sections to discover recommended listings.</li>
            </ul>
          </div>
        );
      case 'connect-vendors':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Once you find a product you are interested in, you can contact the vendor directly</h2>
            <ul>
              <li className="text-gray-600">Vendor contact information such as phone numbers and email addresses are made public on the site for easy communication.</li>
              <li>Buyers can reach out to vendors via phone or email to ask questions, negotiate prices, or arrange transactions directly</li>
            </ul>
          </div>
        );
      case 'place-ads':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Free Ads:</h2>
            <p className="text-gray-600">You can place ads for free, but each free ad will expire after a set duration unless renewed or upgraded.</p>
            <h2 className="text-2xl font-bold mb-4">Paid Ads:</h2>
            <p className="text-gray-600">For increased visibility, you can pay to upgrade your free ad to featured ads. Paid ads ensure that your products are displayed prominently on the platform and will remain visible for a longer period.</p>
          </div>
        );
      case 'payments':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">9ja Markets does not handle payments for products between buyers and vendors</h2>
            <ul>
              <li className="text-gray-600">Buyers and vendors are responsible for arranging payments directly through the contact methods provided (such as bank transfers or other means).</li>
              <li className="text-gray-600">Payments made through the platform are only for paid ad services for vendors who wish to promote their listings.</li>
            </ul>
          </div>
        );
      case 'safety-security':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Safety and Security</h2>
            <p className="text-black">Learn about our safety measures and how we protect your data.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      {/* Header */}
      <Header2 />  {/* Include Header2 here */}

      {/* Main content container */}
      <div className="flex flex-1">
        {/* Side Navigation */}
        <div className="w-1/4 bg-white p-6">
          <ul>
            <li
              className={`cursor-pointer p-3 mb-2 ${activeTab === 'create-account' ? 'bg-indigo-500 text-white' : 'text-gray-900'}`}
              onClick={() => setActiveTab('create-account')}
            >
              Create an Account
            </li>
            <li
              className={`cursor-pointer p-3 mb-2 ${activeTab === 'browse-products' ? 'bg-indigo-500 text-white' : 'text-gray-900'}`}
              onClick={() => setActiveTab('browse-products')}
            >
              Browse and Search for Products
            </li>
            <li
              className={`cursor-pointer p-3 mb-2 ${activeTab === 'connect-vendors' ? 'bg-indigo-500 text-white' : 'text-gray-900'}`}
              onClick={() => setActiveTab('connect-vendors')}
            >
              Connect with Vendors
            </li>
            <li
              className={`cursor-pointer p-3 mb-2 ${activeTab === 'place-ads' ? 'bg-indigo-500 text-white' : 'text-gray-900'}`}
              onClick={() => setActiveTab('place-ads')}
            >
              Place Ads
            </li>
            <li
              className={`cursor-pointer p-3 mb-2 ${activeTab === 'payments' ? 'bg-indigo-500 text-white' : 'text-gray-900'}`}
              onClick={() => setActiveTab('payments')}
            >
              Payments
            </li>
            <li
              className={`cursor-pointer p-3 mb-2 ${activeTab === 'safety-security' ? 'bg-indigo-500 text-white' : 'text-gray-900'}`}
              onClick={() => setActiveTab('safety-security')}
            >
              Safety and Security
            </li>
          </ul>
        </div>

        {/* Content Section */}
        <div className="w-3/4 bg-gray-300 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
