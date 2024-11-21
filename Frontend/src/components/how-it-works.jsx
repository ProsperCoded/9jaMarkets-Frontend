import CA from '../assets/how-it-works/create-account.svg';
const HowItWorks = () => {
  return (
     <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* Sidebar Menu */}
      <aside className="w-1/4 bg-white shadow-md h-screen p-6">
        <ul className="space-y-6">
          <li>
            <a
              href="#create-account"
              className="text-gray-800 hover:text-green font-medium border-l-4 border-transparent hover:border-green hover:border-opacity-50 pl-4"
            >
              Create an Account
            </a>
          </li>
          <li>
            <a
              href="#browse-products"
              className="text-gray-800 hover:text-green font-medium border-l-4 border-transparent hover:border-green hover:border-opacity-50 pl-4"
            >
              Browse & Search for Products
            </a>
          </li>
          <li>
            <a
              href="#connect-vendors"
              className="text-gray-800 hover:text-green font-medium border-l-4 border-transparent hover:border-green hover:border-opacity-50 pl-4"
            >
              Connect with Vendors
            </a>
          </li>
          <li>
            <a
              href="#place-ads"
              className="text-gray-800 hover:text-green font-medium border-l-4 border-transparent hover:border-green hover:border-opacity-50 pl-4"
            >
              Place Ads
            </a>
          </li>
          <li>
            <a
              href="#payments"
              className="text-gray-800 hover:text-green font-medium border-l-4 border-transparent hover:border-green hover:border-opacity-50 pl-4"
            >
              Payments
            </a>
          </li>
          <li>
            <a
              href="#safety-security"
              className="text-gray-800 hover:text-green font-medium border-l-4 border-transparent hover:border-green hover:border-opacity-50 pl-4"
            >
              Safety and Security
            </a>
          </li>
        </ul>
      </aside> 
      {/* Main Content */}
      <main className="flex-grow p-10">
        {/* Image Section */}
        <div className="flex justify-center mb-12">
          <img
            src={CA} // Replace with actual image path
            alt="Illustration"
            className="w-1/2 max-w-md"
          />
        </div>

        {/* Content Sections */}
        <section id="create-account" className="mb-10 text-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">For Buyers:</h2>
          <p className="text-gray-600 mb-2">
            Click on the Sign Up button at the top right corner to create an account. Fill in your details, verify
            your email or phone number, and complete your profile for a personalized shopping experience.
          </p>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">For Vendors:</h2>
          <p className="text-gray-600">
            Select the Place an Ad button and follow the instructions to create your account. Upload your business
            details, verify your identity, and you’re ready to list products on 9ja Markets.
          </p>
        </section>

        {/* Additional sections (browse, connect, etc.) can be similarly added here */}
        
      </main>
    </div>
  );
};

export default HowItWorks;
