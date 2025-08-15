import React from 'react';
import { MdError } from 'react-icons/md';

const ErrorMessage = ({ message, onRetry, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <MdError className="text-6xl text-red-500 mb-4" />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h3>
      <p className="text-gray-600 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-secondary rounded-lg px-6 py-2"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;