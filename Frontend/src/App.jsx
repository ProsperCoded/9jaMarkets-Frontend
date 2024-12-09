import { useState } from "react";
import { ContextWrapper } from "./contexts";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useParams,
} from "react-router-dom";
import Header from "./components/Header";
import Header2 from "./components/Header2";
import Hero from "./components/Hero";
import ExploreSection from "./components/Explore";
import Footer from "./components/Footer";
import LoginModal from "./components/Login";
import SignUpModal from "./components/Signup";
import HowItWorks from "./components/how-it-works";
import MarketPage from "./components/Markets";
import MallPage from "./components/Malls";
import Profile from "./components/Profile";

import { ConfigProvider } from "antd";
import InitializeApp from "./InitializeApp";

import "./App.css";
import GoogleSigninRedirect from "./componets-utils/GoogleSigninRedirect";

function AntDesignConfig({ children }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#21CA1B",

          // Alias Token
          colorBgContainer: "#EBEBEB",
        },
        components: {},
      }}
    >
      {children}
    </ConfigProvider>
  );
}
// set up and routes
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
  const isHomePage = location.pathname === "/";

  return (
    <div className="app">
      <AntDesignConfig>
        <ContextWrapper>
          <InitializeApp>
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
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <ExploreSection />
                  </>
                }
              />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/markets" element={<MarketPage />} />
              <Route path="/malls" element={<MallPage />} />
              <Route
                path="/profile/:subpage?"
                element={<ProfilePageWrapper />}
              />
              {/* Google signup */}
              <Route
                path="/api/v1/auth/google/callback"
                element={<GoogleSigninRedirect />}
              />
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
          </InitializeApp>
        </ContextWrapper>
      </AntDesignConfig>
    </div>
  );
}

// Profile page wrapper to handle subpages
function ProfilePageWrapper() {
  const { subpage } = useParams();
  return <Profile subpage={subpage} />;
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
