import React from "react";
import PropTypes from "prop-types";
import { Loader2 } from "lucide-react";

export const LoadingOverlay = ({ isVisible, message }) => {
  if (!isVisible) return null;

  return (
    <div className="z-50 fixed inset-0 flex flex-col justify-center items-center bg-black/70 backdrop-blur-sm">
      <div className="bg-white shadow-lg mx-4 p-6 rounded-lg w-full max-w-md text-center">
        <Loader2 className="mx-auto mb-4 w-12 h-12 text-Primary animate-spin" />
        <p className="font-medium text-lg">{message}</p>
        <p className="mt-2 text-gray-500 text-sm">
          Please don't close this window
        </p>
      </div>
    </div>
  );
};

LoadingOverlay.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};
