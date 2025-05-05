import React from 'react';

const Fees = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Fee Structure
        </h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-8">
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Membership Fees
                </h2>
                <p className="text-gray-600">
                  Details about membership fees...
                </p>
              </div>
              <div className="border-b pb-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Event Registration
                </h2>
                <p className="text-gray-600">
                  Event registration fee structure...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fees;