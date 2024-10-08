import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ExploreSection from './components/Explore';
import Footer from './components/Footer';
import LoginModal from './components/Login'; // Ensure LoginModal is correctly implemented
import SignUpModal from './components/Signup'; // Ensure SignUpModal is correctly implemented
import HowItWorks from './components/how-it-works';
import MarketPage from './components/Markets';


function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  // Functions to open/close modals
  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);
  
  const openSignUpModal = () => {

    setShowLoginModal(false); // Close login modal when opening sign-up
    setShowSignUpModal(true);
  };
  
  const closeSignUpModal = () => setShowSignUpModal(false);

  // Custom hook to get the current location
  const location = useLocation();

  return (
    <div>
      {/* Conditionally render the Header based on the route */}
      {location.pathname === '/' && (
        <Header 
          openLoginModal={openLoginModal} 
          openSignUpModal={openSignUpModal} // Pass this prop to Header
        />
      )}
      <Routes>
        <Route path="/" element={<><Hero /><ExploreSection /></>} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/markets" element={<MarketPage />} />
      </Routes>
      <Footer />
      
      {/* Modals */}
      <LoginModal 
        showModal={showLoginModal}
        closeModal={closeLoginModal} 
        openSignUpModal={openSignUpModal} // Function to open sign-up modal
      />
      {showSignUpModal && <SignUpModal showModal={showSignUpModal} closeModal={closeSignUpModal} />}
    </div>
  );
}

// Wrap the App component with Router
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
