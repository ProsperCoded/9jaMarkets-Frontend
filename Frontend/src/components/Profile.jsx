import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAd,
  faCommentAlt,
  faChartLine,
  faBriefcase,
  faGem,
  faWallet,
  faUsers,
  faHeadset,
  faQuestionCircle,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import MyAdverts from './Myadverts';
import Feedback from './Feedback';
import ProSales from './Prosales';
import Followers from './Followers';
import Wallet from './Wallet';
import DefaultProfileContent from './DefaultProfileContent';
import Insights from './Insights';

const Profile = ({ subpage }) => {
  const navItems = [
    { label: 'My Adverts', icon: faAd, to: '/profile/my-adverts' },
    { label: 'Feedback', icon: faCommentAlt, to: '/profile/feedback' },
    { label: 'Insights', icon: faChartLine, to: '/profile/insights' },
    { label: 'Pro Sales', icon: faBriefcase, to: '/profile/pro-sales' },
    { label: 'Premium', icon: faGem, to: '/profile/premium' },
    { label: 'Wallet', icon: faWallet, to: '/profile/wallet' },
    { label: 'Followers', icon: faUsers, to: '/profile/followers' },
    { label: 'Customer Care', icon: faHeadset, to: '/profile/customer-care' },
    { label: 'FAQ', icon: faQuestionCircle, to: '/profile/faq' },
    { label: 'Settings', icon: faCog, to: '/settings' },
  ];

  let content;

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
      content = <div>Premium Content</div>; // Placeholder
      break;
    case 'followers':
      content = <Followers />;
      break;
    case 'wallet':
      content = <Wallet />;
      break;
    default:
      content = <DefaultProfileContent />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden lg:block w-64 bg-white shadow-md">
        <div className="p-6 border-b">
          <div className="flex items-center">
            <div className="bg-green-500 rounded-full h-12 w-12 flex items-center justify-center text-white text-2xl font-semibold">
              U
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold">Your Full Name</h2>
              <p className="text-gray-500">+123-456-7890</p>
            </div>
          </div>
        </div>
        <nav className="p-4 space-y-4">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-2 rounded-md ${
                  isActive ? 'bg-green-100 text-green-600' : 'text-gray-700'
                }`
              }
            >
              <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto bg-white shadow rounded-md p-6">
          {content}
        </div>
      </main>
    </div>
  );
};

export default Profile;
