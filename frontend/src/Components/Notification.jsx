import '../styles/Notification.css';

const NotificationPage = () => {
  // Replace these placeholders with actual user payment data
  const paymentNotifications = [
    { id: 1, status: 'Successful', details: 'Paid $50 for Event A' },
    { id: 2, status: 'Pending', details: 'Pending $30 for Event B' },
    { id: 3, status: 'Failed', details: 'Failed payment for Event C' },
  ];

  return (
    <div className="notification-page">
      <h2>Notifications</h2>
      <ul>
        {paymentNotifications.map((notification) => (
          <li key={notification.id} className={`notification-item ${notification.status.toLowerCase()}`}>
            <p>{notification.details}</p>
            <span>Status: {notification.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPage;