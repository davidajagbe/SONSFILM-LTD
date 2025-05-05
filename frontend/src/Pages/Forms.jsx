
import React from 'react';

const Forms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Available Forms
        </h1>
        <div className="grid gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Form Categories
            </h2>
            <div className="space-y-4">
              {/* Add your form links/components here */}
              <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-all">
                Membership Application
              </button>
              <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-all">
                Event Registration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forms;
