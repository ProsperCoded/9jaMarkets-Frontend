import { ContextWrapper } from "./contexts";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useParams,
  Navigate,
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
import Dashboard from "./components/Dashboard"; // Updated import from Profile -> Dashboard
import PlaceAD from "./components/PlaceAD";
import NotFoundPage from "./components/NotFoundPage";
import MainPage from "./components/Mainpage";
import Bookmark from "./components/Bookmarkpage";
import BillingPage from "./components/BillingPage";
import Overview from "./components/Overview";
import ProductPage from "./components/Products/ProductPage";
import EditProfile from "./components/EditProfile";

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
              <Route path="/billing" element={<BillingPage />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/mainpage" element={<MainPage />} />
              <Route path="/bookmark" element={<Bookmark />} />
              <Route path="/auth" element={<GoogleSigninRedirect />} />

              {/* Dashboard routes with Outlet */}
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<Navigate to="overview" replace />} />
                <Route path="overview" element={<Overview />} />
                <Route path="product" element={<ProductPage />} />
                <Route path="edit" element={<EditProfile />} />
                <Route path="customers" element={<div>Customers</div>} />
                <Route path="messages" element={<div>Vendors</div>} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </InitializeApp>
        </ContextWrapper>
      </AntDesignConfig>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
