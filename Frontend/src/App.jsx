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
import MarketPage from './components/Markets';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               import MallPage from './components/Malls';
import Profile from './components/Profile';
import Adverts from './components/Adverts';
import Settings from './components/Settings';


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

  // Check if it's the home page to conditionally render Header
  const isHomePage = location.pathname === '/';

  return (
    <div>
      {/* Render Header based on the route */}
      {isHomePage ? (
        <Header 
          openLoginModal={openLoginModal} 
          openSignUpModal={openSignUpModal} 
        />
      ) : (
        <Header2 />
      )}
      
      <Routes>
        <Route path="/" element={<><Hero /><ExploreSection /></>} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/markets" element={<MarketPage />} />
        <Route path="/profile/:subpage?" element={<ProfilePageWrapper />} />
        <Route path='/ad' element={<Adverts />} />
        <Route path='/settings/:subpage?' element={<SettingsPageWrapper />} />
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
    <Profile subpage={subpage} />
  );
}

function SettingsPageWrapper() {
    const { subpage } = useParams();

  return (
    <Settings subpage={subpage} />
  )
}

// Wrap the App component with Router
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
