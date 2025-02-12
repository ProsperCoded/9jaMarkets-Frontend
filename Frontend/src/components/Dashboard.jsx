import React, { useContext, useState } from "react";
import { 
  Trash, 
  Store, 
  UserRound, 
  Pencil,
  Home,
  Package,
  Users,
  MessageSquare,
  LogOut,
  ChevronRight,
  X
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Link,
  Outlet,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Avatar } from "antd";
import {
  USER_PROFILE_CONTEXT,
  LOGOUT_MODAL_CONTEXT,
} from "@/contexts";

const Dashboard = () => {
  const { subpage } = useParams();
  const location = useLocation();
  const currentSubPage = subpage || "overview";
  const { userProfile } = useContext(USER_PROFILE_CONTEXT);
  const { setLogoutOpen } = useContext(LOGOUT_MODAL_CONTEXT);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!userProfile) {
    navigate("/");
    return null;
  }

  const name = userProfile.firstName || userProfile.brandName;

  const menuItems = [
    {
      path: "/dashboard/overview",
      icon: <Home className="w-5 h-5" />,
      label: "Overview"
    },
    {
      path: "/dashboard/products",
      icon: <Package className="w-5 h-5" />,
      label: "Products"
    },
    ...(userProfile.userType === "merchant" ? [{
      path: "/dashboard/customers",
      icon: <Users className="w-5 h-5" />,
      label: "Customers"
    }] : []),
    {
      path: "/dashboard/messages",
      icon: <MessageSquare className="w-5 h-5" />,
      label: "Vendors"
    }
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-[300px] bg-white shadow-lg p-5 text-black">
        <SidebarContent 
          name={name}
          userProfile={userProfile}
          location={location}
          menuItems={menuItems}
          navigate={navigate}
          setLogoutOpen={setLogoutOpen}
        />
      </aside>

      {/* Mobile Sidebar Toggle */}
      <div
        className={`
          lg:hidden fixed left-0 top-1/3 z-30
          transition-opacity duration-300
          ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}
        `}
      >
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="bg-orange text-white p-2 py-5 rounded-r-xl shadow-lg flex items-center"
          aria-label="Open menu"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <aside
        className={`
          lg:hidden fixed inset-y-0 left-0 z-40 w-[300px] bg-white shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="relative h-full p-5 overflow-y-auto">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
          <SidebarContent 
            name={name}
            userProfile={userProfile}
            location={location}
            menuItems={menuItems}
            navigate={(path) => {
              navigate(path);
              setIsMobileMenuOpen(false);
            }}
            setLogoutOpen={() => {
              setLogoutOpen(true);
              setIsMobileMenuOpen(false);
            }}
          />
        </div>
      </aside>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

// Sidebar content component
const SidebarContent = ({ 
  name, 
  userProfile, 
  location, 
  menuItems, 
  navigate, 
  setLogoutOpen 
}) => {
  return (
    <>
      <div className="flex items-center mb-8 pt-8 rounded-lg transition-colors">
        <Avatar
          style={{ backgroundColor: "#236C13", verticalAlign: "middle" }}
          size="large"
        >
          <span className="font-semibold">{name[0]}</span>
        </Avatar>
        <div className="ml-3 relative">
          <h2 className="font-semibold text-lg">{name}</h2>
          <button
            className="absolute -right-10 top-0 bg-Primary p-2 rounded-full transition-transform hover:scale-105"
            onClick={() => navigate("/dashboard/edit")}
          >
            <Pencil className="w-4 h-4" color="white" />
          </button>
          <p className="text-sm">{userProfile.phoneNumbers[0].number}</p>
        </div>
      </div>

      <UserOptions />
      
      {/* Navigation Menu */}
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center space-x-3 p-2 rounded-lg transition-colors hover:bg-Primary hover:text-white ${
                  location.pathname === item.path ? 'bg-Primary text-white' : ''
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout and Delete Section */}
      <div className="mt-8 space-y-2">
        <button
          onClick={() => setLogoutOpen(true)}
          className="flex w-full items-center space-x-3 p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
        <button className="flex w-full items-center space-x-3 p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors">
          <Trash className="w-5 h-5" />
          <span>Delete Account</span>
        </button>
      </div>
    </>
  );
};

function UserOptions() {
  return (
    <div className="mb-6">
      <div className="space-y-2">
        <div className="flex flex-col space-y-2">
          <Link
            to="/dashboard/products"
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-Primary hover:text-white"
          >
            <Store className="w-5 h-5" />
            <span>Sign in as Merchant</span>
          </Link>
          <Link
            to="/merchant-signup"
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-Primary hover:text-white"
          >
            <UserRound className="w-5 h-5" />
            <span>Sign up as Merchant</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
