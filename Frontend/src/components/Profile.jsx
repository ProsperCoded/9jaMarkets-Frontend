import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAd, faCommentAlt, faChartLine, faBriefcase, faGem, faWallet, faUsers, faHeadset, faQuestionCircle, faCog } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import MyAdverts from './Myadverts';
import Feedback from './Feedback';
import ProSales from './Prosales';
import Followers from './Followers';
import Wallet from './Wallet';
// import Insights from './Insights';
// import ProSales from './ProSales'; // Assuming you have this
// import Premium from './Premium';   // Assuming you have this

const Profile = ({ subpage }) => {
  let content;

  // Dynamically load subpage content based on URL param
  switch (subpage) {
    case 'my-adverts':
      content = <MyAdverts />;
      break;
    case 'feedback':
      content = <Feedback />;
      break;
    case 'insights':
      content = <Insights />;
      break;
    case 'pro-sales':
      content = <ProSales />;
      break;
    case 'premium':
      content = <Premium />;
      break;
    case 'followers':
      content = <Followers />;
      break;
    case 'wallet':
      content = <Wallet />;
      break;
    default:
      content = <div>Please select a section from the sidebar.</div>;
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white h-screen p-4 shadow-lg">
        <div className="flex items-center mb-6">
          {/* Placeholder for profile icon */}
          <div className="bg-green rounded-full h-12 w-12 flex items-center justify-center text-white text-2xl font-semibold">
            U
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold">Your Full Name</h2>
            <p className="text-gray-500">+123-456-7890</p>
          </div>
        </div>
        <nav className="space-y-6">
        <NavLink
          to="/profile/my-adverts"
          className={({ isActive }) =>
            isActive ? "flex items-center text-green font-semibold" : "flex items-center text-gray-700"
          }
          >
            <FontAwesomeIcon icon={faAd} className="mr-3" /> My Adverts
          </NavLink>
          <NavLink
            to="/profile/feedback"
            className={({ isActive }) =>
              isActive ? "flex items-center text-green font-semibold" : "flex items-center text-gray-700"
            }
          >
            <FontAwesomeIcon icon={faCommentAlt} className="mr-3" /> Feedback
          </NavLink>
          <NavLink
            to="/profile/insights"
            className={({ isActive }) =>
              isActive ? "flex items-center text-green font-semibold" : "flex items-center text-gray-700"
            }
          >
            <FontAwesomeIcon icon={faChartLine} className="mr-3" /> Insights
          </NavLink>
          <NavLink
            to="/profile/pro-sales"
            className={({ isActive }) =>
              isActive ? "flex items-center text-green font-semibold" : "flex items-center text-gray-700"
            }
          >
            <FontAwesomeIcon icon={faBriefcase} className="mr-3" /> Pro Sales
          </NavLink>
          <NavLink
            to="/profile/premium"
            className={({ isActive }) =>
              isActive ? "flex items-center text-green font-semibold" : "flex items-center text-gray-700"
            }
          >
            <FontAwesomeIcon icon={faGem} className="mr-3" /> Premium
          </NavLink>
          <NavLink
            to="/profile/wallet"
            className={({ isActive }) =>
              isActive ? "flex items-center text-green font-semibold" : "flex items-center text-gray-700"
            }
          >
            <FontAwesomeIcon icon={faWallet} className="mr-3" /> Wallet
          </NavLink>
          <NavLink
            to="/profile/followers"
            className={({ isActive }) =>
              isActive ? "flex items-center text-green font-semibold" : "flex items-center text-gray-700"
            }
          >
            <FontAwesomeIcon icon={faUsers} className="mr-3" /> Followers
          </NavLink>
          <NavLink
            to="/profile/customer-care"
            className={({ isActive }) =>
              isActive ? "flex items-center text-green font-semibold" : "flex items-center text-gray-700"
            }
          >
            <FontAwesomeIcon icon={faHeadset} className="mr-3" /> Customer Care
          </NavLink>
          <NavLink
            to="/profile/faq"
            className={({ isActive }) =>
              isActive ? "flex items-center text-green font-semibold" : "flex items-center text-gray-700"
            }
          >
            <FontAwesomeIcon icon={faQuestionCircle} className="mr-3" /> FAQ
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "flex items-center text-green font-semibold" : "flex items-center text-gray-700"
            }
          >
            <FontAwesomeIcon icon={faCog} className="mr-3" /> Settings
          </NavLink>

        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50">
        {content}
      </main>
    </div>
  );
};

export default Profile;
