import React from 'react';
import { Leaf, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const getRoleDisplayName = (role: string) => {
    const roleMap: { [key: string]: string } = {
      student: 'Student',
      staff: 'Staff',
      ngo: 'NGO',
      canteen: 'Canteen',
      hostel: 'Hostel',
      event_organizer: 'Event Organizer'
    };
    return roleMap[role] || role;
  };

  const getRoleBadgeColor = (role: string) => {
    const colorMap: { [key: string]: string } = {
      student: 'bg-blue-100 text-blue-800',
      staff: 'bg-purple-100 text-purple-800',
      ngo: 'bg-orange-100 text-orange-800',
      canteen: 'bg-green-100 text-green-800',
      hostel: 'bg-indigo-100 text-indigo-800',
      event_organizer: 'bg-pink-100 text-pink-800'
    };
    return colorMap[role] || 'bg-gray-100 text-gray-800';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Smart Surplus Food
              </h1>
              <p className="text-xs text-gray-500">Zero Waste Platform</p>
            </div>
          </div>

          {/* User Info and Actions */}
          {user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                        {getRoleDisplayName(user.role)}
                      </span>
                      {user.organization && (
                        <span className="text-xs text-gray-500">
                          {user.organization}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={logout}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;