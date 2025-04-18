import '../styles/Notification.css';

const NotificationPage = () => {
  // Replace these placeholders with actual user payment data
  // const paymentNotifications = [
  //   { id: 1, status: 'Successful', details: 'Paid $50 for Event A' },
  //   { id: 2, status: 'Pending', details: 'Pending $30 for Event B' },
  //   { id: 3, status: 'Failed', details: 'Failed payment for Event C' },
  // ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Notifications</h2>
        <p className="text-gray-600">No notifications right now.</p>
      </div>
    </div>
  );
};

export default NotificationPage;
