import React, { useState } from 'react';
import { Bell, Clock, MapPin, Check, X, Settings } from 'lucide-react';

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'food_available',
      title: 'New Food Available: Fresh Sandwiches',
      message: 'Main Campus Canteen has listed 25 fresh sandwiches. Available for pickup until 3:00 PM.',
      location: 'Building A, Ground Floor',
      time: '10 minutes ago',
      isRead: false,
      urgent: true
    },
    {
      id: '2',
      type: 'pickup_reminder',
      title: 'Pickup Reminder',
      message: 'Your claimed fruit salad bowls are ready for pickup. Please collect within 1 hour.',
      location: 'Hostel Block C',
      time: '30 minutes ago',
      isRead: false,
      urgent: true
    },
    {
      id: '3',
      type: 'event_reminder',
      title: 'Event Food Logging Reminder',
      message: 'Tech Conference ended 2 hours ago. Don\'t forget to log any surplus food.',
      location: 'Auditorium',
      time: '2 hours ago',
      isRead: true,
      urgent: false
    },
    {
      id: '4',
      type: 'food_claimed',
      title: 'Your Food Item Was Claimed',
      message: 'Someone claimed your listed pizza slices. Pickup scheduled for 2:30 PM.',
      location: 'Your Location',
      time: '3 hours ago',
      isRead: true,
      urgent: false
    },
    {
      id: '5',
      type: 'safety_alert',
      title: 'Food Safety Alert',
      message: 'Listed vegetable curry will expire in 30 minutes. Consider removing if not claimed.',
      location: 'Your Listing',
      time: '5 hours ago',
      isRead: true,
      urgent: false
    }
  ]);

  const [filter, setFilter] = useState('all');

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.isRead;
    if (filter === 'urgent') return notif.urgent;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'food_available':
        return '🍽️';
      case 'pickup_reminder':
        return '⏰';
      case 'event_reminder':
        return '📅';
      case 'food_claimed':
        return '✅';
      case 'safety_alert':
        return '⚠️';
      default:
        return '📢';
    }
  };

  const getNotificationColor = (type: string, urgent: boolean) => {
    if (urgent) return 'border-l-red-500 bg-red-50';
    switch (type) {
      case 'food_available':
        return 'border-l-green-500 bg-green-50';
      case 'pickup_reminder':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'event_reminder':
        return 'border-l-blue-500 bg-blue-50';
      case 'food_claimed':
        return 'border-l-purple-500 bg-purple-50';
      case 'safety_alert':
        return 'border-l-orange-500 bg-orange-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Notifications</h2>
          <p className="text-gray-600">
            Stay updated on food availability and pickup reminders
            {unreadCount > 0 && (
              <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={markAllAsRead}
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
          >
            <Check className="w-4 h-4" />
            Mark all read
          </button>
          <button className="text-gray-400 hover:text-gray-600">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-green-100 text-green-800'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === 'unread'
                ? 'bg-green-100 text-green-800'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('urgent')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === 'urgent'
                ? 'bg-green-100 text-green-800'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Urgent ({notifications.filter(n => n.urgent).length})
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-lg shadow-sm border-l-4 p-4 ${getNotificationColor(
              notification.type,
              notification.urgent
            )} ${!notification.isRead ? 'ring-2 ring-blue-100' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className={`font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                      {notification.title}
                    </h3>
                    {notification.urgent && (
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        Urgent
                      </span>
                    )}
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {notification.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {notification.location}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                {!notification.isRead && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="text-gray-400 hover:text-green-600 p-1"
                    title="Mark as read"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="text-gray-400 hover:text-red-600 p-1"
                  title="Delete notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
          <p className="text-gray-600">
            {filter === 'all'
              ? "You're all caught up! New notifications will appear here."
              : `No ${filter} notifications at the moment.`}
          </p>
        </div>
      )}

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">New Food Available</p>
              <p className="text-sm text-gray-600">Get notified when new food items are listed</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Pickup Reminders</p>
              <p className="text-sm text-gray-600">Reminders for claimed food items</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Event Reminders</p>
              <p className="text-sm text-gray-600">Reminders to log food after events</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;