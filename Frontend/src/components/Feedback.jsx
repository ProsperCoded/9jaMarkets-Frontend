import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faLink } from '@fortawesome/free-solid-svg-icons';
const Feedback = () => {
  const [feedbackReceived, setFeedbackReceived] = useState([]); // Simulate received feedback
  const [feedbackSent, setFeedbackSent] = useState([]); // Simulate sent feedback

    return (
      <div className="p-6 bg-white shadow-md rounded-md w-full">
        <div className="flex justify-between items-center mb-4">
          {/* Feedback title */}
          <h1 className="text-2xl font-semibold">Feedback</h1>
          
          {/* Feedback status */}
          <div className="flex space-x-2">
            <button className="bg-green bg-opacity-20 text-green font-semibold py-1 px-3 rounded-lg">
              Received (0)
            </button>
            <button className="bg-gray-100 text-gray-600 font-semibold py-1 px-3 rounded-lg">
              Sent (0)
            </button>
          </div>
        </div>
  
        {/* Icon and Message in Center */}
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <FontAwesomeIcon icon={faUserCircle} className="text-gray-400" size="6x" />
          <p className="mt-4 text-gray-500">No feedback yet</p>
          <p className="text-gray-500 mb-4">
            Copy the link and ask your customers to leave feedback about you
          </p>
          
          {/* Copy Link Button */}
          <button className="bg-green text-white py-2 px-4 rounded-full flex items-center">
            <FontAwesomeIcon icon={faLink} className="mr-2" /> Copy link
          </button>
        </div>
      </div>
    );
}

  export default Feedback;
  