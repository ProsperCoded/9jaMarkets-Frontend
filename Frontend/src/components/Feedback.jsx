import React, { useState } from 'react';
import feedbackIcon from '../assets/Profile.svg'; // Use the correct path to your feedback icon

const Feedback = () => {
  const [feedbackReceived, setFeedbackReceived] = useState([]); // Simulate received feedback
  const [feedbackSent, setFeedbackSent] = useState([]); // Simulate sent feedback
  const [activeTab, setActiveTab] = useState('received'); // State to manage active tab

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="feedback-page bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Feedback</h2>
      
      {/* Tabs for Received and Sent Feedback */}
      <div className="tabs mb-4">
        <button
          onClick={() => handleTabClick('received')}
          className={`mr-2 px-4 py-2 rounded-full ${activeTab === 'received' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        >
          Received ({feedbackReceived.length})
        </button>
        <button
          onClick={() => handleTabClick('sent')}
          className={`px-4 py-2 rounded-full ${activeTab === 'sent' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        >
          Sent ({feedbackSent.length})
        </button>
      </div>

      {/* Content based on selected tab */}
      <div className="feedback-content">
        {activeTab === 'received' && (
          <div className="received-feedback">
            {feedbackReceived.length === 0 ? (
              <div className="text-center">
                <img src={feedbackIcon} alt="No feedback" className="mx-auto mb-4" />
                <p>No feedback yet</p>
                <p>Copy the link and ask your customers to leave feedback about you</p>
                <button className="bg-green-500 text-white px-4 py-2 rounded-full mt-4">
                  Copy link
                </button>
              </div>
            ) : (
              // Display received feedback list
              <ul>
                {feedbackReceived.map((feedback, index) => (
                  <li key={index} className="border-b py-2">{feedback.message}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === 'sent' && (
          <div className="sent-feedback">
            {feedbackSent.length === 0 ? (
              <div className="text-center">
                <img src={feedbackIcon} alt="No feedback" className="mx-auto mb-4" />
                <p>No feedback sent yet</p>
              </div>
            ) : (
              // Display sent feedback list
              <ul>
                {feedbackSent.map((feedback, index) => (
                  <li key={index} className="border-b py-2">{feedback.message}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;
