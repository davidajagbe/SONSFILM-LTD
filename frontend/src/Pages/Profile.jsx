import React from 'react';
import UpdateProfile from '../Components/UpdateProfile';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Your Profile
            </h1>
            <UpdateProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;