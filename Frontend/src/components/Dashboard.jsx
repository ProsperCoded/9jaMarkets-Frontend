import React, { useContext, useState } from "react";
import {
  Store,
  UserRound,
  Settings,
  Home,
  Package,
  Users,
  MessageSquare,
  LogOut,
  ChevronRight,
  X,
  UserCheck,
  DollarSign,
} from "lucide-react";
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
  LOGIN_MODAL_CONTEXT,
  SIGNUP_MODAL_CONTEXT,
} from "@/contexts";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ChevronsUpDown, Bookmark } from "lucide-react";

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

  // Check if user is a marketer (role === "MARKETER")
  const isMarketer = userProfile.role === "MARKETER";

  const menuItems =
    userProfile.userType === "merchant"
      ? [
          {
            path: "/dashboard/overview",
            icon: <Home className="w-5 h-5" />,
            label: "Overview",
          },
          {
            path: "/dashboard/products",
            icon: <Package className="w-5 h-5" />,
            label: "Products",
          },
          {
            path: "/dashboard/customers",
            icon: <Users className="w-5 h-5" />,
            label: "Customers",
          },
        ]
      : [
          {
            path: "/dashboard/bookmark",
            icon: <Bookmark className="w-5 h-5" />,
            label: "Bookmarks",
          },
          {
            path: "/dashboard/messages",
            icon: <MessageSquare className="w-5 h-5" />,
            label: "Vendors",
          },
          // Add marketer menu items if user is a marketer
          ...(isMarketer
            ? [
                {
                  path: "/dashboard/marketer-profile",
                  icon: <UserCheck className="w-5 h-5" />,
                  label: "Marketer Profile",
                },
                {
                  path: "/dashboard/marketer-referrals",
                  icon: <DollarSign className="w-5 h-5" />,
                  label: "Referrals & Earnings",
                },
              ]
            : []),
        ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block top-0 left-0 fixed bg-white px-4 pt-10 border-gray-200 border-r w-64 h-screen">
        <SidebarContent
          name={name}
          userProfile={userProfile}
          location={location}
          menuItems={menuItems}
          navigate={navigate}
          setLogoutOpen={setLogoutOpen}
        />
      </aside>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden z-50 fixed inset-0">
          {/* Backdrop with fade animation */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sidebar with slide animation */}
          <aside
            className={`fixed top-0 left-0 w-64 h-screen bg-white shadow-lg transform transition-transform duration-300 ease-out ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="px-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="top-2 right-2 absolute hover:bg-gray-100 p-2 rounded-lg transition-colors"
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
                setLogoutOpen={setLogoutOpen}
              />
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        <div className="p-4">
          <Outlet />
        </div>
      </main>

      {/* Mobile Menu Button with slide animation */}
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
const SidebarContent = ({
  name,
  userProfile,
  location,
  menuItems,
  navigate,
  setLogoutOpen,
}) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center mb-8 pt-8 rounded-lg transition-colors">
          <Avatar
            style={{ backgroundColor: "#F8912D", verticalAlign: "middle" }}
            size="large"
          >
            <span className="font-semibold">{name[0]}</span>
          </Avatar>
          <div className="relative ml-3">
            <h2 className="font-semibold text-lg">{name}</h2>
            <button
              className="top-8 left-32 absolute bg-Primary p-2 rounded-full hover:scale-105 transition-transform"
              onClick={() => navigate("/dashboard/edit")}
            >
              <Settings className="w-4 h-4" color="white" />
            </button>
            {userProfile.phoneNumbers.length > 0 && (
              <p className="text-sm">{userProfile.phoneNumbers[0].number}</p>
            )}
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
                  className={`flex items-center space-x-3 p-2 rounded-lg transition-colors hover:bg-Primary/20 ${
                    location.pathname === item.path
                      ? "bg-Primary text-white"
                      : ""
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Logout Button */}
      <div className="py-4 border-t">
        <button
          onClick={() => setLogoutOpen(true)}
          className="flex items-center space-x-3 hover:bg-red-50 p-2 pb-10 rounded-lg w-full text-red-500 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
function UserOptions() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { userProfile } = useContext(USER_PROFILE_CONTEXT);
  const { setLoginOpen } = useContext(LOGIN_MODAL_CONTEXT);
  const { setSignupOpen } = useContext(SIGNUP_MODAL_CONTEXT);

  return (
    <div className="my-4 pl-1 cursor-pointer select-none">
      {userProfile && userProfile.userType === "customer" ? (
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="space-y-2 w-auto max-w-full"
        >
          <div
            className="flex justify-between items-center space-x-4 hover:bg-Primary p-1 rounded-md hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center gap-2">
              <Store />
              <h4 className="font-semibold text-nowrap">Merchant Options</h4>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 w-9">
                <ChevronsUpDown className="w-4 h-4" />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2 pl-2">
            <div
              className="hover:bg-Primary px-3 py-2 border rounded-md font-mono hover:text-white text-sm transition-colors"
              onClick={() => setLoginOpen("merchant")}
            >
              Sign in as Merchant
            </div>
            <div
              className="hover:bg-Primary px-3 py-2 border rounded-md font-mono hover:text-white text-sm transition-colors"
              onClick={() => navigate("/merchant-signup")}
            >
              Sign up as Merchant
            </div>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="space-y-2 w-auto max-w-full"
        >
          <div
            className="flex justify-between items-center space-x-4 hover:bg-Primary p-1 rounded-md hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center gap-2">
              <UserRound />
              <h4 className="font-semibold text-nowrap">Customer Options</h4>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 w-9">
                <ChevronsUpDown className="w-4 h-4" />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2 pl-2">
            <div
              className="hover:bg-Primary px-3 py-2 border rounded-md font-mono hover:text-white text-sm transition-colors"
              onClick={() => setLoginOpen(true)}
            >
              Sign in as Customer
            </div>
            <div
              className="hover:bg-Primary px-3 py-2 border rounded-md font-mono hover:text-white text-sm transition-colors"
              onClick={() => setSignupOpen(true)}
            >
              Sign up as Customer
            </div>
            {/* <h4 className="font-semibold">Merchant Options</h4> */}
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}

export default Dashboard;
