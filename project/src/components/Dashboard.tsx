import React from 'react';
import { TrendingUp, Users, Leaf, Droplets, BarChart3, Calendar } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Mock data for dashboard
  const stats = {
    foodSaved: 1250,
    peopleFed: 340,
    carbonSaved: 85,
    waterSaved: 1200
  };

  const recentActivity = [
    { id: 1, action: 'Listed', item: 'Fresh Sandwiches', time: '2 hours ago', type: 'list' },
    { id: 2, action: 'Claimed', item: 'Fruit Salad Bowls', time: '4 hours ago', type: 'claim' },
    { id: 3, action: 'Listed', item: 'Pizza Slices', time: '1 day ago', type: 'list' },
    { id: 4, action: 'Claimed', item: 'Vegetable Curry', time: '2 days ago', type: 'claim' }
  ];

  const monthlyData = [
    { month: 'Jan', saved: 45 },
    { month: 'Feb', saved: 52 },
    { month: 'Mar', saved: 78 },
    { month: 'Apr', saved: 65 },
    { month: 'May', saved: 89 },
    { month: 'Jun', saved: 95 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Track your impact on campus sustainability</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Food Saved</p>
              <p className="text-2xl font-bold text-gray-900">{stats.foodSaved} kg</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+12% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">People Fed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.peopleFed}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+8% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Carbon Saved</p>
              <p className="text-2xl font-bold text-gray-900">{stats.carbonSaved} kg CO₂</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+15% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Water Saved</p>
              <p className="text-2xl font-bold text-gray-900">{stats.waterSaved} L</p>
            </div>
            <div className="bg-cyan-100 p-3 rounded-full">
              <Droplets className="w-6 h-6 text-cyan-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+10% from last month</span>
          </div>
        </div>
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Progress Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Food Saved (kg)</h3>
          <div className="space-y-3">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex items-center">
                <span className="w-8 text-sm text-gray-600">{data.month}</span>
                <div className="flex-1 mx-3">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(data.saved / 100) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="w-8 text-sm font-medium text-gray-900">{data.saved}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'list' ? 'bg-green-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.action}</span> {activity.item}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
        <div className="flex items-center mb-4">
          <Leaf className="w-6 h-6 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold text-green-900">Environmental Impact</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-800">2.3 tons</p>
            <p className="text-green-700">CO₂ emissions prevented</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-800">15,000 L</p>
            <p className="text-green-700">Water footprint saved</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-800">850</p>
            <p className="text-green-700">Meals provided to community</p>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Campus Events</h3>
          <Calendar className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div>
              <p className="font-medium text-gray-900">Tech Conference 2024</p>
              <p className="text-sm text-gray-600">Expected surplus: Lunch for 200 people</p>
            </div>
            <span className="text-sm text-yellow-700 font-medium">Tomorrow</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div>
              <p className="font-medium text-gray-900">Cultural Fest</p>
              <p className="text-sm text-gray-600">Expected surplus: Snacks and beverages</p>
            </div>
            <span className="text-sm text-blue-700 font-medium">This Weekend</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;