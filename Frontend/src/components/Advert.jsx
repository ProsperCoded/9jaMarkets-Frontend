import React from 'react';

const Advert = ({ subpage }) => {
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
    default:
      content = <div>Select an option from the sidebar</div>;
  }

  return (
    <div>
      {/* Sidebar and main profile content */}
      <div className="min-h-screen flex">
        <aside className="w-1/5 bg-white p-4">
          <nav>
            <ul>
              <li className="py-2 hover:bg-gray-200 rounded-lg">
                <a href="/profile/my-adverts" className="block text-gray-700">My Adverts</a>
              </li>
              <li className="py-2 hover:bg-gray-200 rounded-lg">
                <a href="/profile/feedback" className="block text-gray-700">Feedback</a>
              </li>
              <li className="py-2 hover:bg-gray-200 rounded-lg">
                <a href="/profile/insights" className="block text-gray-700">Insights</a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main profile content */}
        <main className="w-full p-6 bg-gray-100">
          {content}
        </main>
      </div>
    </div>
  );
};

const MyAdverts = () => <div>My Adverts Content</div>;
const Feedback = () => <div>Feedback Content</div>;
const Insights = () => <div>Insights Content</div>;

export default Advert;
