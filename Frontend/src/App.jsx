import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ExploreSection from './components/Explore';
import Footer from './components/Footer';
import LoginModal from './components/Login'; // Import the LoginModal component

function App() {
  const [showModal, setShowModal] = useState(false);

  // Open modal function
  const openModal = () => {
    setShowModal(true);
  };

  // Close modal function
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Router>
      <div>
        {/* Pass the openModal function to the Header so it can trigger the modal */}
        <Header openModal={openModal} />
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Hero />
                <ExploreSection />
              </>
            } 
          />
        </Routes>
        <Footer />
        
        {/* Include the login modal */}
        <LoginModal showModal={showModal} closeModal={closeModal} />
      </div>
    </Router>
  );
}

export default App;

