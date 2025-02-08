import React, { useContext, useState } from "react";
import { Trash, ChevronsUpDown, Store, UserRound, Pencil } from "lucide-react";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./ui/collapsible";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faList,
  faMessage,
  faSignOutAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
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
  SIGNUP_MODAL_CONTEXT,
  LOGIN_MODAL_CONTEXT,
} from "@/contexts";
import { faUser } from "@fortawesome/free-solid-svg-icons";

// Remove SUB_PAGES mapping as we now use nested routes with <Outlet>
const Dashboard = () => {
  const { subpage } = useParams();
  const location = useLocation();
  const currentSubPage = subpage || "overview";
  const { userProfile } = useContext(USER_PROFILE_CONTEXT);
  const { setLogoutOpen } = useContext(LOGOUT_MODAL_CONTEXT);
  const navigate = useNavigate();

  if (!userProfile) {
    navigate("/");
    return null;
  }
  const styleSelected = {
    backgroundColor: "#236C13",
    fontWeight: 600,
  };
  const name = userProfile.firstName || userProfile.brandName;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <aside className="relative bg-white shadow-lg p-5 w-[300px] text-black">
        {/* Profile Section */}
        <div className="flex items-center mb-8 pt-8 rounded-lg transition-colors">
          <Avatar
            style={{ backgroundColor: "#236C13", verticalAlign: "middle" }}
            size="large"
          >
            <span className="font-semibold">{name[0]}</span>
          </Avatar>
          <div className="ml-3">
            <h2 className="font-semibold text-lg">{name}</h2>
            <div
              className="top-10 left-[80%] absolute bg-Primary p-2 rounded-full transition-transform cursor-pointer hover:scale-105"
              onClick={() => navigate("/dashboard/edit")}
            >
              <Pencil className="size-5" color="white" />
            </div>
            <p className="text-sm">{userProfile.phoneNumbers[0].number}</p>
          </div>
        </div>

        <UserOptions />
        <div>
          <ul className="space-y-4">
            <li>
              <Link
                to="/dashboard/overview"
                className="flex items-center space-x-3 hover:bg-Primary p-2 rounded-lg hover:text-white"
                style={
                  location.pathname === "/dashboard/overview"
                    ? styleSelected
                    : {}
                }
              >
                <FontAwesomeIcon icon={faHome} />
                <span>Overview</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/product"
                className="flex items-center space-x-3 hover:bg-Primary p-2 rounded-lg hover:text-white"
                style={
                  location.pathname === "/dashboard/product"
                    ? styleSelected
                    : {}
                }
              >
                <FontAwesomeIcon icon={faList} />
                <span>Products</span>
              </Link>
            </li>
            {userProfile.userType === "merchant" && (
              <li>
                <Link
                  to="/dashboard/customers"
                  className="flex items-center space-x-3 hover:bg-Primary p-2 rounded-lg hover:text-white"
                  style={
                    location.pathname === "/dashboard/customers"
                      ? styleSelected
                      : {}
                  }
                >
                  <FontAwesomeIcon icon={faUsers} />
                  <span>Customers</span>
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/dashboard/messages"
                className="flex items-center space-x-3 hover:bg-Primary p-2 rounded-lg hover:text-white"
                style={
                  location.pathname === "/dashboard/messages"
                    ? styleSelected
                    : {}
                }
              >
                <FontAwesomeIcon icon={faMessage} />
                <span>Vendors</span>
              </Link>
            </li>
          </ul>
        </div>
        <ul className="mt-auto">
          <li className="pt-10">
            <div
              onClick={() => setLogoutOpen(true)}
              className="flex items-center space-x-3 hover:bg-red-100 p-2 rounded-lg text-red-500 hover:text-red-700 cursor-pointer"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Logout</span>
            </div>
            <div>
              <h3 className="flex items-center space-x-3 hover:bg-red-100 p-2 rounded-lg text-red-500 hover:text-red-700 cursor-pointer">
                <Trash className="mr-1" size={20} />
                Delete Account
              </h3>
            </div>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Subpage injected via Outlet */}
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;

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
              <h4 className="font-semibold">Merchant Options</h4>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 w-9">
                <ChevronsUpDown className="w-4 h-4" />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2 pl-2">
            <div
              className="hover:bg-Primary px-3 py-2 border rounded-md font-mono text-sm hover:text-white transition-colors"
              onClick={() => setLoginOpen("merchant")}
            >
              Sign in as Merchant
            </div>
            <div
              className="hover:bg-Primary px-3 py-2 border rounded-md font-mono text-sm hover:text-white transition-colors"
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
              <h4 className="font-semibold">Customer Options</h4>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 w-9">
                <ChevronsUpDown className="w-4 h-4" />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2 pl-2">
            <div
              className="hover:bg-Primary px-3 py-2 border rounded-md font-mono text-sm hover:text-white transition-colors"
              onClick={() => setLoginOpen(true)}
            >
              Sign in as Customer
            </div>
            <div
              className="hover:bg-Primary px-3 py-2 border rounded-md font-mono text-sm hover:text-white transition-colors"
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
