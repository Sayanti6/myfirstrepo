import React, { useState } from 'react';
import { Search, Filter, MapPin, Clock, Users } from 'lucide-react';

// Mock data for food listings
const mockFoodListings = [
  {
    id: '1',
    title: 'Fresh Sandwiches & Wraps',
    provider: 'Main Campus Canteen',
    location: 'Building A, Ground Floor',
    quantity: '25 pieces',
    category: 'Prepared Food',
    expiresIn: '2 hours',
    safetyTag: 'Safe to eat for 4 hours',
    description: 'Assorted vegetarian sandwiches and wraps, freshly prepared this morning.',
    image: 'https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'available'
  },
  {
    id: '2',
    title: 'Fruit Salad Bowls',
    provider: 'Hostel Mess',
    location: 'Hostel Block C',
    quantity: '15 bowls',
    category: 'Fresh Produce',
    expiresIn: '1 hour',
    safetyTag: 'Safe to eat for 2 hours',
    description: 'Mixed seasonal fruit salad bowls, perfect for a healthy snack.',
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'available'
  },
  {
    id: '3',
    title: 'Leftover Pizza Slices',
    provider: 'Tech Conference',
    location: 'Auditorium Lobby',
    quantity: '30 slices',
    category: 'Event Food',
    expiresIn: '3 hours',
    safetyTag: 'Safe to eat for 6 hours',
    description: 'Assorted pizza slices from our tech conference lunch.',
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'available'
  }
];

const BrowseFood: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const categories = ['all', 'Prepared Food', 'Fresh Produce', 'Event Food', 'Packaged Items'];
  const locations = ['all', 'Building A', 'Building B', 'Hostel Block C', 'Auditorium'];

  const filteredListings = mockFoodListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || listing.location.includes(selectedLocation);
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleClaim = (listingId: string) => {
    alert(`Claiming food item ${listingId}. In a real app, this would open a pickup coordination dialog.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Browse Available Food</h2>
        <p className="text-gray-600">Find surplus food available for pickup across campus</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search food items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
            >
              {locations.map(location => (
                <option key={location} value={location}>
                  {location === 'all' ? 'All Locations' : location}
                </option>
              ))}
            </select>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-center bg-gray-50 rounded-lg px-4 py-2">
            <span className="text-sm text-gray-600">
              {filteredListings.length} items found
            </span>
          </div>
        </div>
      </div>

      {/* Food Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map(listing => (
          <div key={listing.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Image */}
            <div className="h-48 bg-gray-200 overflow-hidden">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{listing.title}</h3>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                  {listing.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-3">{listing.description}</p>

              {/* Provider and Location */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  {listing.provider}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {listing.location}
                </div>
              </div>

              {/* Quantity and Timing */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-900">
                  Quantity: {listing.quantity}
                </span>
                <div className="flex items-center text-sm text-orange-600">
                  <Clock className="w-4 h-4 mr-1" />
                  {listing.expiresIn} left
                </div>
              </div>

              {/* Safety Tag */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mb-4">
                <p className="text-xs text-blue-800 font-medium">{listing.safetyTag}</p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleClaim(listing.id)}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Claim Food
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredListings.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No food items found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or check back later for new listings.</p>
        </div>
      )}
    </div>
  );
};

export default BrowseFood;