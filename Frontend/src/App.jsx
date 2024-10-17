import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useParams } from 'react-router-dom';
import Header from './components/Header';
import Header2 from './components/Header2';
import Hero from './components/Hero'; 
import ExploreSection from './components/Explore';
import Footer from './components/Footer';
import LoginModal from './components/Login'; 
import SignUpModal from './components/Signup'; 
import HowItWorks from './components/how-it-works';
import MarketPage from './components/Markets';
import Advert from './components/Advert'; 


function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  // Functions to open/close modals
  const openLoginModal = () => {
    setShowSignUpModal(false); // Close sign-up modal when opening login
    setShowLoginModal(true);
  };

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
          openSignUpModal={openSignUpModal} 
        />
      )}
      
      <Routes>
        <Route path="/" element={<><Hero /><ExploreSection /></>} />
        <Route path="/how-it-works" element={<><Header2 /><HowItWorks /></>} />
        <Route path="/markets" element={<><Header2 /><MarketPage /></>} />
        <Route path="/profile/:subpage?" element={<><Header2 /><ProfilePageWrapper /></>}  />
      </Routes>
      <Footer />
      
      {/* Modals */}
      <LoginModal 
        showModal={showLoginModal}
        closeModal={closeLoginModal} 
        openSignUpModal={openSignUpModal} 
      />
      <SignUpModal
        showModal={showSignUpModal}
        closeModal={closeSignUpModal}
        openLoginModal={openLoginModal}
      />
    </div>
  );
}

// Profile page wrapper to handle subpages
function ProfilePageWrapper() {
  const { subpage } = useParams();

  // Load different components based on the subpage parameter
  return (
    <Advert subpage={subpage} />
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
