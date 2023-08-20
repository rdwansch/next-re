import React from 'react';

export default function Spinner() {
  return (
    <div className="flex justify-center h-screen mt-20">
      <div>
        <div className="relative">
          <div className="w-20 h-20 border-purple-200 border-2 rounded-full"></div>
          <div className="w-20 h-20 border-purple-700 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
        </div>
      </div>
    </div>
  );
}
