import { createContext, useState } from "react";
import {
  LOGOUT_MODAL_CONTEXT,
  MESSAGE_API_CONTEXT,
  USER_PROFILE_CONTEXT,
} from "./contexts";
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
import Adverts from "./components/Adverts";
import Settings from "./components/Settings";
import { useEffect } from "react";
import { ConfigProvider } from "antd";
import InitializeApp from "./InitializeApp";
import { message } from "antd";
import Products from "./components/Product";
import "./App.css";
import Logout from "./componets-utils/LogoutModal";
// userProfile Type
// {
//   "addresses": [],
//   "dateOfBirth": null,
//   "displayImage": null,
//   "email": "john.doe@example.com",
//   "emailVerifiedAt": null,
//   "firstName": "John",
//   "googleId": null,
//   "id": "076447dc-2e03-4515-b585-effc03b41fa8",
//   "lastName": "Doe",
//   "phoneNumbers": [
//     {
//       // Add phone number details here
//     },
//     {
//       // Add phone number details here
//     }
//   ]
// }

function ContextWrapper({ children }) {
  const [userProfile, setUserProfile] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [logoutOpen, setLogoutOpen] = useState(false);
  useEffect(() => {
    console.log(userProfile);
  }, [userProfile]);
  return (
    <>
      <USER_PROFILE_CONTEXT.Provider value={{ userProfile, setUserProfile }}>
        <MESSAGE_API_CONTEXT.Provider value={messageApi}>
          <LOGOUT_MODAL_CONTEXT.Provider value={{ logoutOpen, setLogoutOpen }}>
            <Logout logoutOpen={logoutOpen} setLogoutOpen={setLogoutOpen} />
            {contextHolder}
            {children}
          </LOGOUT_MODAL_CONTEXT.Provider>
        </MESSAGE_API_CONTEXT.Provider>
      </USER_PROFILE_CONTEXT.Provider>
    </>
  );
}
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
