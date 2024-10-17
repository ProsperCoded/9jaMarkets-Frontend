import { useState } from 'react';
import placeAds from '../assets/how-it-works/post.svg';
import create from '../assets/how-it-works/create-account.svg'; 
import browseProductImage from '../assets/how-it-works/Browse.svg';
import connectVendorsImage from '../assets/how-it-works/connect-with-vendors.svg';
import paymentsImage from '../assets/how-it-works/credit-card.svg';
import safetySecurityImage from '../assets/how-it-works/post.svg';

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('create-account');

  const renderContent = () => {
    switch (activeTab) {
      case 'create-account':
        return (
          <div className='bg-white p-4 rounded-lg'>
            <img src={create} alt="Create Account" className="mb-4 block mx-auto pt-10 px-4 sm:px-20" />
            <div className='px-4 sm:px-40 pb-10 sm:pb-40'>
              <h2 className="text-2xl font-bold">For Buyers</h2>
              <p className="text-black font-semibold">Click on the Sign Up button at the top right corner to create an account</p>
              <p className="text-black font-semibold">Fill in your details, verify your email or phone number, and complete your profile for a personalized shopping experience</p>

              <h2 className="text-2xl font-bold mt-5">For Vendors</h2>
              <p className="text-black font-semibold">If you are a vendor, select the Place an Ad button and follow the instructions to create your account</p>
              <p className="text-black font-semibold">Upload your business details, verify your identity, and you are ready to list products on 9ja markets</p>
            </div>
          </div>
        );
      case 'browse-products':
        return (
          <div className='bg-white p-4 rounded-lg'>
            <img src={browseProductImage} alt="Browse Products" className="mb-4 block mx-auto max-w-full h-auto pt-10 px-4 sm:px-20" />
            <div className='px-4 sm:px-40 pb-10 sm:pb-40'>
              <h2 className="text-2xl font-bold mb-4">Discover a wide range of products from vendors all over Nigeria</h2>
              <ul className="list-disc pl-5">
                <li className="text-black font-semibold">Use the Search Bar to quickly find specific items by entering keywords, product names, or categories</li>
                <li className="text-black font-semibold">Filter by market location, category, and price range to refine your search result</li>
                <li className="text-black font-semibold">Explore our Featured Markets and Top Vendors sections to discover recommended listings.</li>
              </ul>
            </div>
          </div>
        );
      case 'connect-vendors':
        return (
          <div className='bg-white p-4 rounded-lg'>
            <img src={connectVendorsImage} alt="Connect with Vendors" className="mb-4 block mx-auto max-w-full h-auto pt-10 px-4 sm:px-20" />
            <div className='px-4 sm:px-40 pb-10 sm:pb-40'>
              <h2 className="text-2xl font-bold mb-4">Once you find a product you are interested in, you can contact the vendor directly</h2>
              <ul className="list-disc pl-5">
                <li className="text-black font-semibold">Vendor contact information such as phone numbers and email addresses are made public on the site for easy communication.</li>
                <li className="text-black font-semibold">Buyers can reach out to vendors via phone or email to ask questions, negotiate prices, or arrange transactions directly</li>
              </ul>
            </div>
          </div>
        );
      case 'place-ads':
        return (
          <div className='bg-white p-4 rounded-lg'>
            <img src={placeAds} alt="Place Ads" className="mb-4 block mx-auto max-w-full h-auto pt-10 px-4 sm:px-20" />
            <div className='px-4 sm:px-40 pb-10 sm:pb-40'>
              <h2 className="text-2xl font-bold">Free Ads:</h2>
              <p className="text-black font-semibold">You can place ads for free, but each free ad will expire after a set duration unless renewed or upgraded.</p>
              <h2 className="text-2xl font-bold mb mt-5">Paid Ads:</h2>
              <p className="text-black font-semibold ">For increased visibility, you can pay to upgrade your free ad to featured ads. Paid ads ensure that your products are displayed prominently on the platform and will remain visible for a longer period.</p>
            </div>
          </div>
        );
      case 'payments':
        return (
          <div className='bg-white p-4 rounded-lg'>
            <img src={paymentsImage} alt="Payments" className="mb-4 block mx-auto max-w-full h-auto pt-10 px-4 sm:px-20" />
            <div className='px-4 sm:px-40 pb-10 sm:pb-40'>
              <h2 className="text-2xl font-bold mb-4">9ja Markets does not handle payments for products between buyers and vendors</h2>
              <ul className="list-disc pl-5">
                <li className="text-black font-semibold">Buyers and vendors are responsible for arranging payments directly through the contact methods provided (such as bank transfers or other means).</li>
                <li className="text-black font-semibold">Payments made through the platform are only for paid ad services for vendors who wish to promote their listings.</li>
              </ul>
            </div>
          </div>
        );
      case 'safety-security':
        return (
          <div className='bg-white p-4 rounded-lg'>
            <img src={safetySecurityImage} alt="Safety and Security" className="mb-4 block mx-auto max-w-full h-auto pt-10 px-4 sm:px-20" />
            <div className='px-4 sm:px-40 pb-10 sm:pb-40'>
              <h2 className="text-2xl font-bold mb-4">Safety and Security</h2>
              <p className="text-black font-semibold">Learn about our safety measures and how we protect your data.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    
    <div className="flex flex-col bg-gray-100 min-h-screen">  
    <div className="bg-white text-green py-2 drop-shadow-sm">
        <div className="container mx-auto flex justify-center items-center px-4">
         <h2 className='items-center text-green font-semibold text-xl'>How It Works</h2>
        </div>
      </div>   
      <div className="flex-1 flex flex-col sm:flex-row">
        {/* Side Navigation */}
        <div className="w-full sm:w-1/4 bg-white p-6">
          <ul>
            <li
              className={`cursor-pointer p-3 mb-2 ${activeTab === 'create-account' ? 'bg-green text-white rounded-lg font-semibold' : 'bg-white text-gray-900 hover:bg-green hover:text-white rounded-lg'}`}
              onClick={() => setActiveTab('create-account')}
            >
              Create an Account
            </li>
            <li
              className={`cursor-pointer p-3 mb-2 ${activeTab === 'browse-products' ? 'bg-green text-white rounded-lg font-semibold' : 'bg-white text-gray-900 hover:bg-green hover:text-white rounded-lg'}`}
              onClick={() => setActiveTab('browse-products')}
            >
              Browse and Search for Products
            </li>
            <li
              className={`cursor-pointer p-3 mb-2 ${activeTab === 'connect-vendors' ? 'bg-green text-white rounded-lg font-semibold' : 'bg-white text-gray-900 hover:bg-green hover:text-white rounded-lg'}`}
              onClick={() => setActiveTab('connect-vendors')}
            >
              Connect with Vendors
            </li>
            <li
              className={`cursor-pointer p-3 mb-2 ${activeTab === 'place-ads' ? 'bg-green text-white rounded-lg font-semibold' : 'bg-white text-gray-900 hover:bg-green hover:text-white rounded-lg'}`}
              onClick={() => setActiveTab('place-ads')}
            >
              Place Ads
            </li>
            <li
              className={`cursor-pointer p-3 mb-2 ${activeTab === 'payments' ? 'bg-green text-white rounded-lg font-semibold' : 'bg-white text-gray-900 hover:bg-green hover:text-white rounded-lg'}`}
              onClick={() => setActiveTab('payments')}
            >
              Payments
            </li>
            <li
              className={`cursor-pointer p-3 mb-2 ${activeTab === 'safety-security' ? 'bg-green text-white rounded-lg font-semibold' : 'bg-white text-gray-900 hover:bg-green hover:text-white rounded-lg'}`}
              onClick={() => setActiveTab('safety-security')}
            >
              Safety and Security
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="flex-1 bg-gray-100 p-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
