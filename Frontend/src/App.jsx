import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ExploreSection from './components/Explore';
import Footer from './components/Footer';
import LoginModal from './components/Login';
import SignUpModal from './components/Signup'; // Import the SignUpModal component

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  // Open modal functions
  const openLoginModal = () => setShowLoginModal(true);
  const openSignUpModal = () => setShowSignUpModal(true);

  // Close modal functions
  const closeLoginModal = () => setShowLoginModal(false);
  const closeSignUpModal = () => setShowSignUpModal(false);

  return (
    <Router>
      <div>
       <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Header openLoginModal={openLoginModal} openSignUpModal={openSignUpModal} />
                <Hero />
                <ExploreSection />
              </>
            } 
          />
        </Routes>
        <Footer />

        {/* Login Modal */}
        <LoginModal showModal={showLoginModal} closeModal={closeLoginModal} />

        {/* Sign Up Modal */}
        <SignUpModal showModal={showSignUpModal} closeModal={closeSignUpModal} />
      </div>
    </Router>
  );
}

export default App;
