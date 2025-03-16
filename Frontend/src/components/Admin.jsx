import React, { useContext, useState } from "react";
import {
  Store,
  Building2,
  Users,
  LogOut,
  ChevronRight,
  X,
  PieChart,
  Menu,
  Search,
  Bell,
} from "lucide-react";
import {
  Link,
  Outlet,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Avatar, Badge } from "antd";
import { LOGOUT_MODAL_CONTEXT, USER_PROFILE_CONTEXT } from "@/contexts";

const Admin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setLogoutOpen } = useContext(LOGOUT_MODAL_CONTEXT);
  const { userProfile } = useContext(USER_PROFILE_CONTEXT);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block top-0 left-0 fixed bg-white px-4 pt-6 border-gray-200 border-r w-64 h-screen">
        <div className="flex items-center mb-8 px-2">
          <div className="font-bold text-orange text-2xl">
            9ja<span className="text-green-600">Markets</span>
          </div>
        </div>
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
          <aside className="top-0 left-0 fixed bg-white shadow-lg w-64 h-screen transition-transform duration-300 ease-out transform">
            <div className="px-4 py-6">
              <div className="flex justify-between items-center mb-8">
                <div className="font-bold text-orange text-2xl">
                  9ja<span className="text-green-600">Markets</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
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
      <main className="flex-1 lg:ml-64">
        {/* Header bar */}
        <header className="top-0 z-10 sticky bg-white border-gray-200 border-b">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden hover:bg-gray-100 mr-4 p-2 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Search bar */}
              <div className="relative">
                <Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-50 py-2 pr-4 pl-10 border border-gray-300 focus:border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-orange w-64"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Badge count={3} size="small" offset={[-5, 5]}>
                <div className="hover:bg-gray-100 p-2 rounded-full cursor-pointer">
                  <Bell className="w-5 h-5 text-gray-600" />
                </div>
              </Badge>

              {/* Admin info */}
              <div className="hidden md:flex items-center space-x-3">
                <Avatar style={{ backgroundColor: "#F8912D" }} size="default">
                  A
                </Avatar>
                <div>
                  <p className="font-medium text-sm">Admin User</p>
                  <p className="text-gray-500 text-xs">Administrator</p>
                </div>
              </div>

              {/* Logout button */}
              <button
                onClick={() => setLogoutOpen(true)}
                className="flex items-center space-x-1 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content area */}
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
