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
import Adverts from "./components/Adverts";
import HowItWorks from "./components/how-it-works";
import MarketPage from "./components/Markets";
import MallPage from "./components/Malls";
import Profile from "./components/Profile";
import PlaceAD from "./components/PlaceAD";
import Error404 from "./components/404";
import MainPage from "./components/Mainpage";
import Bookmark from "./components/Bookmarkpage"

import { ConfigProvider } from "antd";
import InitializeApp from "./InitializeApp";

import "./App.css";
import GoogleSigninRedirect from "./componets-utils/GoogleSigninRedirect";
import Marketplace from "./components/Marketplace";
import MerchantSignup from "./components/MerchantSignup";
import ForgetPassword from "./components/ForgetPassword";

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
            {isHomePage ? <Header /> : <Header2 />}

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
              <Route path="/markets/:id" element={<Marketplace />} />
              <Route path="/malls" element={<MallPage />} />
              {/* <Route path="/marketplace" element={<Marketplace />} /> */}
              <Route path="/merchant-signup" element={<MerchantSignup />} />
              <Route path="/ad" element={<Adverts />} />
              <Route path="/place-ad" element={<PlaceAD />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/mainpage" element={<MainPage />} />
              <Route path="/bookmark" element={<Bookmark />} />

              <Route
                path="/profile/:subpage?"
                element={<ProfilePageWrapper />}
              />
              {/* Google signup */}
              <Route path="/auth" element={<GoogleSigninRedirect />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
            <Footer />
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
