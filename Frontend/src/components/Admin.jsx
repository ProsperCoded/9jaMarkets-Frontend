import React, { useContext, useState } from "react";
import {
  Store,
  Building2,
  Users,
  PieChart,
  ChevronRight,
  Wallet,
} from "lucide-react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { USER_PROFILE_CONTEXT, MESSAGE_API_CONTEXT } from "@/contexts";

const Admin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userProfile } = useContext(USER_PROFILE_CONTEXT);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const messageApi = useContext(MESSAGE_API_CONTEXT);

  // Admin navigation items
  const menuItems = [
    {
      path: "/admin/dashboard",
      icon: <PieChart className="w-5 h-5" />,
      label: "Dashboard",
    },
    {
      path: "/admin/markets",
      icon: <Store className="w-5 h-5" />,
      label: "Markets",
    },
    {
      path: "/admin/malls",
      icon: <Building2 className="w-5 h-5" />,
      label: "Malls",
    },
    {
      path: "/admin/marketers",
      icon: <Users className="w-5 h-5" />,
      label: "Marketers",
    },
    {
      path: "/admin/settlements",
      icon: <Wallet className="w-5 h-5" />,
      label: "Settlements",
    },
  ];

  if (!userProfile || userProfile.role !== "ADMIN") {
    messageApi.error("You are not authorized to view this page");
    navigate("/");
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block top-14 left-0 fixed bg-white px-4 pt-6 border-gray-200 border-r w-64 h-[calc(100vh-3.5rem)]">
        <SidebarContent
          location={location}
          menuItems={menuItems}
          navigate={navigate}
        />
      </aside>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden z-50 fixed inset-0">
          <div
            className="fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className="top-14 left-0 fixed bg-white shadow-lg w-64 h-[calc(100vh-3.5rem)] transition-transform duration-300 ease-out transform">
            <div className="px-4 py-6">
              <SidebarContent
                location={location}
                menuItems={menuItems}
                navigate={(path) => {
                  navigate(path);
                  setIsMobileMenuOpen(false);
                }}
              />
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-4">
        <div className="p-6">
          <Outlet />
        </div>
      </main>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden top-1/3 left-0 fixed flex items-center bg-orange shadow-lg p-2 py-5 rounded-r-xl text-white transition-transform hover:translate-x-1 duration-300 ease-in-out transform"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

// Sidebar content component
const SidebarContent = ({ location, menuItems, navigate }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {/* Navigation Menu */}
        <nav>
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => navigate && navigate(item.path)}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors hover:bg-orange/10 ${
                    location.pathname === item.path ||
                    location.pathname.startsWith(item.path + "/")
                      ? "bg-orange text-white"
                      : "text-gray-700"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Footer section with version info */}
      <div className="mt-auto py-4 text-gray-500 text-xs">
        <div className="pt-4 border-t">
          <p>Admin Panel v1.0</p>
          <p>© 2023 9jaMarkets</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
