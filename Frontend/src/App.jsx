import { ContextWrapper } from "./contexts";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Header2 from "./components/Header2";
import Footer from "./components/Footer";
import HowItWorks from "./components/how-it-works";
import MarketPage from "./components/Markets";
import MallPage from "./components/Malls";
import Dashboard from "./components/Dashboard";
import AdPayment from "./components/Products/AdPayment";
import NotFoundPage from "./components/NotFoundPage";
import Bookmark from "./components/Bookmarkpage";
import BillingPage from "./components/BillingPage";
import Overview from "./components/Overview";
import ProductPage from "./components/Products/ProductPage";
import EditProfile from "./components/EditProfile";
import SelectPlan from "./components/Products/SelectPlan";
import InvestPage from "./pages/Invest";
import MarketerPage from "./pages/Marketer";
import IncludeMarket from "./pages/IncludeMarket";
import MerchantEmailVerification from "./pages/MerchantEmailVerification";
import Admin from "./components/Admin";
import AdminDashboard from "./components/AdminDashboard";
import AdminMarkets from "./components/AdminMarkets";
import AdminMalls from "./components/AdminMalls";
import AdminMarketers from "./components/AdminMarketers";
import AdminSettlements from "./components/AdminSettlements";
import MarketerProfile from "./components/MarketerProfile";
import MarketerReferrals from "./components/MarketerReferrals";
import Customers from "./components/Customers";
import Messages from "./components/Messages";

import { ConfigProvider } from "antd";
import InitializeApp from "./InitializeApp";

import "./App.css";
import GoogleSigninRedirect from "./componets-utils/GoogleSigninRedirect";
import Marketplace from "./components/Marketplace";
import MerchantSignup from "./components/MerchantSignup";
import ForgetPassword from "./components/ForgetPassword";
import AboutPage from "./components/AboutPage";
import TermsPage from "./components/TermsPage";
import PrivacyPage from "./components/PrivacyPage";
import BillingPolicyPage from "./components/BillingPolicyPage";
import CookiePolicyPage from "./components/CookiePolicyPage";
import CopyrightPage from "./components/CopyrightPage";
import SafetyTips from "./pages/SafetyTips";
import FAQ from "./pages/FAQ";
import ContactUs from "./pages/ContactUs";
import ScrollToTop from "./components/ScrollToTop";
import IntercomMessenger from "./components/IntercomMessenger";
import PropTypes from "prop-types";
import ProductDetails from "./components/ProductDetails";
import LandingPage from "./pages/landingPages/LandingPage";
import MerchantProfile from "./pages/MerchantProfile";
import LoadingPage from "./componets-utils/LoadingPage";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import logo from "./assets/Logo.svg";
import CustomerPage from "./pages/landingPages/CustomerPage";
import CreateMall from "./components/CreateMall";
import CreateMarket from "./components/CreateMarket";

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

AntDesignConfig.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const hideFooterPaths = [
    "/markets",
    "/malls",
    "/dashboard",
    "/dashboard/overview",
    "/dashboard/products",
    "/dashboard/customers",
    "/dashboard/messages",
    "/dashboard/edit",
    "/admin",
    "/admin/dashboard",
    "/admin/markets",
    "/admin/malls",
    "/admin/marketers",
    "/admin/settlements",
  ];

  const shouldShowFooter = !hideFooterPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="app">
      <AntDesignConfig>
        <ContextWrapper>
          <InitializeApp>
            <ScrollToTop />
            {/* Render Header based on the route */}
            {isHomePage ? <Header /> : <Header2 />}

            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/products" element={<CustomerPage />} />
              <Route path="/products/:productId" element={<ProductDetails />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/markets" element={<MarketPage />} />
              <Route path="/markets/:id" element={<Marketplace />} />
              <Route path="/malls" element={<MallPage />} />
              <Route path="/malls/:id" element={<Marketplace />} />
              <Route path="/merchant-signup" element={<MerchantSignup />} />
              <Route path="/billing" element={<BillingPage />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/bookmark" element={<Bookmark />} />
              <Route path="/auth" element={<GoogleSigninRedirect />} />
              <Route path="/invest" element={<InvestPage />} />
              <Route path="/marketer" element={<MarketerPage />} />
              <Route path="/include-market" element={<IncludeMarket />} />
              <Route
                path="/verify-email"
                element={<MerchantEmailVerification />}
              />

              {/* Dashboard routes with Outlet */}
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<Navigate to="overview" replace />} />
                <Route path="bookmark" element={<Bookmark />} />
                <Route path="overview" element={<Overview />} />
                <Route path="products" element={<ProductPage />}>
                  <Route path="select-plan" element={<SelectPlan />} />
                  <Route path="ad-payment" element={<AdPayment />} />
                </Route>
                <Route path="edit" element={<EditProfile />} />
                <Route path="customers" element={<Customers />} />
                <Route path="messages" element={<Messages />} />

                {/* New marketer routes */}
                <Route path="marketer-profile" element={<MarketerProfile />} />
                <Route
                  path="marketer-referrals"
                  element={<MarketerReferrals />}
                />
              </Route>

              {/* Admin routes with Outlet */}
              <Route path="/admin" element={<Admin />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="markets" element={<AdminMarkets />} />
                <Route path="create-mall" element={<CreateMall />} />
                <Route path="create-market" element={<CreateMarket />} />
                <Route path="malls" element={<AdminMalls />} />
                <Route path="marketers" element={<AdminMarketers />} />
                <Route path="settlements" element={<AdminSettlements />} />
              </Route>

              {/* Policy Pages */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/billing-policy" element={<BillingPolicyPage />} />
              <Route path="/cookie" element={<CookiePolicyPage />} />
              <Route path="/copyright" element={<CopyrightPage />} />
              <Route path="/safety" element={<SafetyTips />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<ContactUs />} />

              <Route path="/markets/:marketId" element={<Marketplace />} />

              <Route
                path="/merchant/:merchantId"
                element={<MerchantProfile />}
              />

              {/* Test route for LoadingPage */}
              <Route
                path="/test-loading"
                element={<LoadingPage message="Testing Loading Page" />}
              />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>

            {/* Conditionally render footer */}
            {shouldShowFooter && <Footer />}
            <IntercomMessenger />
            <FloatingWhatsApp
              phoneNumber="07014541564"
              accountName="9jaMarkets"
              allowClickAway={true}
              allowEsc={true}
              chatMessage="Hello! 👋 How can we help you today?"
              statusMessage="Usually replies within an hour"
              notification={true}
              notificationSound={true}
              darkMode={true}
              avatar={logo}
              buttonStyle={{
                backgroundColor: "#21CA1B",
              }}
              buttonClassName="whatsapp-button"
            />
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
