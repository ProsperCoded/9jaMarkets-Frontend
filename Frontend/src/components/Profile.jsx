import React from 'react';
import { NavLink } from 'react-router-dom';
import MyAdverts from './Myadverts';
import Feedback from './Feedback';
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
    default:
      content = <div>Please select a section from the sidebar.</div>;
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 h-screen p-4 shadow-lg">
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
            <i className="fas fa-ad mr-3"></i> My Adverts
          </NavLink>
          <NavLink
            to="/profile/feedback"
            className={({ isActive }) =>
              isActive ? "flex items-center text-green font-semibold" : "flex items-center text-gray-700"
            }
          >
            <i className="fas fa-comment-alt mr-3"></i> Feedback
          </NavLink>
          <NavLink
            to="/profile/insights"
            className={({ isActive }) =>
              isActive ? "flex items-center text-green font-semibold" : "flex items-center text-gray-700"
            }
          >
            <i className="fas fa-chart-line mr-3"></i> Insights
          </NavLink>
          <NavLink
            to="/profile/pro-sales"
            className={({ isActive }) =>
              isActive ? "flex items-center text-green font-semibold" : "flex items-center text-gray-700"
            }
          >
            <i className="fas fa-briefcase mr-3"></i> Pro Sales
          </NavLink>
          <NavLink
            to="/profile/premium"
            className={({ isActive }) =>
              isActive ? "flex items-center text-green font-semibold" : "flex items-center text-gray-700"
            }
          >
            <i className="fas fa-gem mr-3"></i> Premium
          </NavLink>
          <NavLink
            to="/profile/wallet"
            className={({ isActive }) =>
              isActive ? "flex items-center text-green font-semibold" : "flex items-center text-gray-700"
            }
          >
            <i className="fas fa-wallet mr-3"></i> Wallet
          </NavLink>
          <NavLink
            to="/profile/followers"
            className={({ isActive }) =>
              isActive ? "flex items-center text-green font-semibold" : "flex items-center text-gray-700"
            }
          >
            <i className="fas fa-users mr-3"></i> Followers
          </NavLink>
          <NavLink
            to="/profile/customer-care"
            className={({ isActive }) =>
              isActive ? "flex items-center text-green font-semibold" : "flex items-center text-gray-700"
            }
          >
            <i className="fas fa-headset mr-3"></i> Customer Care
          </NavLink>
          <NavLink
            to="/profile/faq"
            className={({ isActive }) =>
              isActive ? "flex items-center text-green font-semibold" : "flex items-center text-gray-700"
            }
          >
            <i className="fas fa-question-circle mr-3"></i> FAQ
          </NavLink>
          <NavLink
            to="/profile/settings"
            className={({ isActive }) =>
              isActive ? "flex items-center text-green font-semibold" : "flex items-center text-gray-700"
            }
          >
            <i className="fas fa-cog mr-3"></i> Settings
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
