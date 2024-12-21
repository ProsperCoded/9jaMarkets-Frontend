import React from "react";
import { Trash, ChevronsUpDown, Store } from "lucide-react";
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
  faCartShopping,
  faMessage,
  faWallet,
  faUsers,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import DefaultProfileContent from "./DefaultProfileContent";
import ProductPage from "./Products/ProductPage";
import { useContext } from "react";
import { USER_PROFILE_CONTEXT, LOGOUT_MODAL_CONTEXT } from "@/contexts";
import { useNavigate } from "react-router-dom";
import { Avatar } from "antd";
import { useState } from "react";
const SUB_PAGES = {
  dashboard: <DefaultProfileContent />,
  product: <ProductPage />,
};
function MerchantOptions() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="my-4 pl-1 cursor-pointer select-none">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="space-y-2 w-auto max-w-full"
      >
        <div
          className="flex justify-between items-center space-x-4 hover:bg-Primary p-1 rounded-md hover:text-white"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {/* <div className="flex gap-1">
          </div> */}
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
            onClick={() => {
              navigate("/merchant-signup");
            }}
          >
            Sign up as Merchant
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
const Profile = ({ subpage }) => {
  const { userProfile } = useContext(USER_PROFILE_CONTEXT);
  const { setLogoutOpen } = useContext(LOGOUT_MODAL_CONTEXT);
  const navigate = useNavigate();
  if (!userProfile) {
    navigate("/");
    return;
  }
  const styleSelected = {
    backgroundColor: "#236C13",
    fontWeight: 600,
  };
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <aside className="bg-white shadow-lg p-5 w-[300px] text-black">
        {/* Profile Section */}
        <div className="flex items-center mb-8 pt-8">
          <Avatar
            style={{ backgroundColor: "#236C13", verticalAlign: "middle" }}
            size="large"
          >
            <span className="font-semibold">{userProfile.firstName[0]}</span>
          </Avatar>
          <div className="ml-3">
            <h2 className="font-semibold text-lg">{userProfile.firstName}</h2>
            <p className="text-sm">{userProfile.phoneNumbers[0].number}</p>
          </div>
        </div>

        <MerchantOptions />
        {/* <Link to="/merchant-signup">Merchant Options</Link> */}
        {/* Navigation Links */}
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/profile/dashboard"
                className="flex items-center space-x-3 hover:bg-Primary p-2 rounded-lg hover:text-white"
                style={subpage === "dashboard" ? styleSelected : {}}
              >
                <FontAwesomeIcon icon={faHome} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/profile/product"
                className="flex items-center space-x-3 hover:bg-Primary p-2 rounded-lg hover:text-white"
                style={subpage === "product" ? styleSelected : {}}
              >
                <FontAwesomeIcon icon={faList} />
                <span>Products</span>
              </Link>
            </li>
            <li>
              <Link
                to="/orders"
                className="flex items-center space-x-3 hover:bg-Primary p-2 rounded-lg hover:text-white"
                style={subpage === "orders" ? styleSelected : {}}
              >
                <FontAwesomeIcon icon={faCartShopping} />
                <span>Orders</span>
              </Link>
            </li>
            <li>
              <Link
                to="/customers"
                className="flex items-center space-x-3 hover:bg-Primary p-2 rounded-lg hover:text-white"
                style={subpage === "customers" ? styleSelected : {}}
              >
                <FontAwesomeIcon icon={faUsers} />
                <span>Customers</span>
              </Link>
            </li>
            <li>
              <Link
                to="/messages"
                className="flex items-center space-x-3 hover:bg-Primary p-2 rounded-lg hover:text-white"
                style={subpage === "messages" ? styleSelected : {}}
              >
                <FontAwesomeIcon icon={faMessage} />
                <span>Messages</span>
              </Link>
            </li>
            <li>
              <Link
                to="/wallet"
                className="flex items-center space-x-3 hover:bg-Primary p-2 rounded-lg hover:text-white"
                style={subpage === "wallet" ? styleSelected : {}}
              >
                <FontAwesomeIcon icon={faWallet} />
                <span>Wallet</span>
              </Link>
            </li>
            <li>
              <Link
                to="/premium"
                className="flex items-center space-x-3 hover:bg-Primary p-2 rounded-lg hover:text-white"
                style={subpage === "premium" ? styleSelected : {}}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clipRuale="evenodd"
                  />
                </svg>

                <span>Premium</span>
              </Link>
            </li>
            <li className="pt-10">
              <div
                onClick={() => {
                  setLogoutOpen(true);
                }}
                className="flex items-center space-x-3 hover:bg-red-100 p-2 pt-25 rounded-lg text-red-500 hover:text-red-700 cursor-pointer"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Logout</span>
              </div>
              <div>
                <h3 className="flex items-center space-x-3 hover:bg-red-100 p-2 pt-25 rounded-lg text-red-500 hover:text-red-700 cursor-pointer">
                  <Trash className="mr-1" size={20} />
                  Delete Account
                </h3>
              </div>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Render Subpage */}
        {subpage && SUB_PAGES[subpage] ? (
          SUB_PAGES[subpage]
        ) : (
          <DefaultProfileContent />
        )}
      </main>
    </div>
  );
};

export default Profile;
