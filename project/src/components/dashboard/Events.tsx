import React, { useState } from 'react';
import { 
  Plus, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Filter,
  Search,
  Star,
  Share2,
  Bookmark
} from 'lucide-react';

const Events: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewEventModal, setShowNewEventModal] = useState(false);

  const categories = [
    { id: 'all', name: 'All Events', count: 24 },
    { id: 'academic', name: 'Academic', count: 8 },
    { id: 'social', name: 'Social', count: 6 },
    { id: 'sports', name: 'Sports', count: 4 },
    { id: 'cultural', name: 'Cultural', count: 4 },
    { id: 'workshop', name: 'Workshops', count: 2 }
  ];

  const timeframes = [
    { id: 'upcoming', name: 'Upcoming' },
    { id: 'this-week', name: 'This Week' },
    { id: 'this-month', name: 'This Month' },
    { id: 'past', name: 'Past Events' }
  ];

  const events = [
    {
      id: 1,
      title: "Tech Fest 2025 - Innovation Summit",
      description: "Join us for the biggest tech event of the year featuring keynote speakers, workshops, and networking opportunities.",
      date: "2025-01-15",
      time: "10:00 AM",
      endTime: "6:00 PM",
      location: "Main Auditorium",
      organizer: "Computer Science Club",
      category: "Academic",
      attendees: 245,
      maxAttendees: 500,
      image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=400",
      isBookmarked: true,
      isFeatured: true,
      tags: ["technology", "innovation", "networking"]
    },
    {
      id: 2,
      title: "Career Fair 2025",
      description: "Meet with top employers and explore internship and job opportunities across various industries.",
      date: "2025-01-20",
      time: "9:00 AM",
      endTime: "4:00 PM",
      location: "Sports Complex",
      organizer: "Career Services",
      category: "Academic",
      attendees: 180,
      maxAttendees: 300,
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
      isBookmarked: false,
      isFeatured: true,
      tags: ["career", "jobs", "internships"]
    },
    {
      id: 3,
      title: "AI & Machine Learning Workshop",
      description: "Hands-on workshop covering the fundamentals of AI and ML with practical coding exercises.",
      date: "2025-01-25",
      time: "2:00 PM",
      endTime: "5:00 PM",
      location: "CS Lab Building",
      organizer: "AI Research Group",
      category: "Workshop",
      attendees: 45,
      maxAttendees: 50,
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400",
      isBookmarked: true,
      isFeatured: false,
      tags: ["AI", "machine-learning", "workshop"]
    },
    {
      id: 4,
      title: "Annual Cultural Night",
      description: "Celebrate diversity with performances, food, and cultural exhibitions from around the world.",
      date: "2025-02-01",
      time: "7:00 PM",
      endTime: "10:00 PM",
      location: "Student Center",
      organizer: "International Student Association",
      category: "Cultural",
      attendees: 320,
      maxAttendees: 400,
      image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400",
      isBookmarked: false,
      isFeatured: false,
      tags: ["culture", "diversity", "performance"]
    },
    {
      id: 5,
      title: "Basketball Championship Finals",
      description: "Cheer for your favorite teams in the exciting championship finals of the inter-college basketball tournament.",
      date: "2025-02-05",
      time: "6:00 PM",
      endTime: "9:00 PM",
      location: "Basketball Court",
      organizer: "Sports Committee",
      category: "Sports",
      attendees: 150,
      maxAttendees: 200,
      image: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=400",
      isBookmarked: false,
      isFeatured: false,
      tags: ["basketball", "championship", "sports"]
    },
    {
      id: 6,
      title: "Startup Pitch Competition",
      description: "Watch innovative student startups pitch their ideas to a panel of industry experts and investors.",
      date: "2025-02-10",
      time: "1:00 PM",
      endTime: "5:00 PM",
      location: "Business School Auditorium",
      organizer: "Entrepreneurship Club",
      category: "Academic",
      attendees: 85,
      maxAttendees: 150,
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
      isBookmarked: true,
      isFeatured: false,
      tags: ["startup", "entrepreneurship", "competition"]
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || 
      event.category.toLowerCase() === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'social': return 'bg-purple-100 text-purple-800';
      case 'sports': return 'bg-green-100 text-green-800';
      case 'cultural': return 'bg-orange-100 text-orange-800';
      case 'workshop': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campus Events</h1>
          <p className="text-gray-600 mt-1">Discover and join exciting events happening on campus</p>
        </div>
        <button 
          onClick={() => setShowNewEventModal(true)}
          className="mt-4 sm:mt-0 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Event
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
            
            <select 
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {timeframes.map(timeframe => (
                <option key={timeframe.id} value={timeframe.id}>
                  {timeframe.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Featured Events */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <Star className="h-5 w-5 text-yellow-500 mr-2" />
            Featured Events
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEvents.filter(event => event.isFeatured).map((event) => (
              <div key={event.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                    <button className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${event.isBookmarked ? 'text-orange-500' : 'text-gray-400'}`}>
                      <Bookmark className={`h-5 w-5 ${event.isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {event.time} - {event.endTime}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      {event.attendees}/{event.maxAttendees} attending
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">by {event.organizer}</span>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                      <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium">
                        Join Event
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Events */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">All Events</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div key={event.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                    <button className={`p-1 rounded-full hover:bg-gray-100 transition-colors ${event.isBookmarked ? 'text-orange-500' : 'text-gray-400'}`}>
                      <Bookmark className={`h-4 w-4 ${event.isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
                  
                  <div className="space-y-1 mb-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-2" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-2" />
                      {event.location}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{event.attendees} attending</span>
                    <button className="bg-orange-600 text-white px-3 py-1 rounded-md hover:bg-orange-700 transition-colors text-sm font-medium">
                      Join
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Event Modal */}
      {showNewEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Event</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="What's your event called?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Describe your event..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option value="">Select a category</option>
                    <option value="academic">Academic</option>
                    <option value="social">Social</option>
                    <option value="sports">Sports</option>
                    <option value="cultural">Cultural</option>
                    <option value="workshop">Workshop</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Attendees</label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="100"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                  <input 
                    type="time" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                  <input 
                    type="time" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Where will your event take place?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <p className="text-gray-500">Click to upload an image or drag and drop</p>
                  <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button 
                  type="button"
                  onClick={() => setShowNewEventModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;