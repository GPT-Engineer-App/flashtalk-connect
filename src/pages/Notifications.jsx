import { Bell } from 'lucide-react';

const Notifications = () => {
  const notifications = [
    { id: 1, message: "New message from Alice", time: "2 minutes ago" },
    { id: 2, message: "Missed call from Bob", time: "1 hour ago" },
    { id: 3, message: "Charlie wants to add you as a contact", time: "Yesterday" },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-start space-x-4 bg-gray-100 p-4 rounded-lg">
            <Bell className="h-6 w-6 text-blue-500" />
            <div>
              <p className="font-semibold">{notification.message}</p>
              <p className="text-sm text-gray-500">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
