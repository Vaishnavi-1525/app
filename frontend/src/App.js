import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import EventCard from './components/EventCard';
import AddEventModal from './components/AddEventModal';
import EditEventModal from './components/EditEventModal';
import BottomNavigation from './components/BottomNavigation';
import LoginModal from './components/LoginModal';
import ProfileModal from './components/ProfileModal';
import AuthProvider, { useAuth } from './components/AuthContext';
import { Button } from './components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { Toaster } from './components/ui/toaster';
import { mockEvents, getEventsByStatus, getEventCounts, sortEventsByDate } from './mock/mockData';
import { Calendar, TrendingUp, User } from 'lucide-react';

const JobTracker = () => {
  const [events, setEvents] = useState(mockEvents);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [eventCounts, setEventCounts] = useState(getEventCounts());
  const [editingEvent, setEditingEvent] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Update event counts when events change
  useEffect(() => {
    const counts = {
      upcoming: events.filter(event => event.status === 'upcoming').length,
      completed: events.filter(event => event.status === 'completed').length,
      expired: events.filter(event => event.status === 'expired').length
    };
    setEventCounts(counts);
  }, [events]);

  // Auto-expire events that have passed their date
  useEffect(() => {
    const checkExpiredEvents = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      setEvents(prevEvents => 
        prevEvents.map(event => {
          const eventDate = new Date(event.date);
          eventDate.setHours(0, 0, 0, 0);
          
          if (event.status === 'upcoming' && eventDate < today) {
            return { ...event, status: 'expired' };
          }
          return event;
        })
      );
    };

    checkExpiredEvents();
    const interval = setInterval(checkExpiredEvents, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const handleAddEvent = (newEvent) => {
    setEvents(prevEvents => [...prevEvents, newEvent]);
  };

  const handleEditEvent = (updatedEvent) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    setEditingEvent(null);
  };

  const handleMarkDone = (eventId) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId
          ? { ...event, status: 'completed' }
          : event
      )
    );
  };

  const getCurrentEvents = () => {
    const filteredEvents = events.filter(event => event.status === activeTab);
    return sortEventsByDate(filteredEvents);
  };

  const getEmptyStateMessage = () => {
    switch (activeTab) {
      case 'upcoming':
        return 'No upcoming events. Add your first event to get started!';
      case 'completed':
        return 'No completed events yet. Mark events as done when you attend them.';
      case 'expired':
        return 'No expired events. This is good - you\'re staying on track!';
      default:
        return 'No events found.';
    }
  };

  const currentEvents = getCurrentEvents();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Job Tracker</h1>
                <p className="text-sm text-gray-500">Stay organized, never miss an opportunity</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 px-3 py-1 bg-green-100 rounded-full">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  {eventCounts.upcoming} Active
                </span>
              </div>
              {isAuthenticated ? (
                <Avatar 
                  className="w-8 h-8 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                  onClick={() => setShowProfileModal(true)}
                >
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="text-xs">
                    {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setShowLoginModal(true)}
                >
                  <User className="w-4 h-4 mr-1" />
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {currentEvents.length > 0 ? (
          <div className="space-y-4">
            {currentEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onMarkDone={handleMarkDone}
                onEdit={setEditingEvent}
                showMarkDone={activeTab === 'upcoming'}
                showEdit={isAuthenticated}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab === 'upcoming' && 'No Upcoming Events'}
              {activeTab === 'completed' && 'No Completed Events'}
              {activeTab === 'expired' && 'No Expired Events'}
            </h3>
            <p className="text-gray-500 max-w-xs leading-relaxed">
              {getEmptyStateMessage()}
            </p>
          </div>
        )}
      </div>

      {/* Add Event Button */}
      <AddEventModal onAddEvent={handleAddEvent} />

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        eventCounts={eventCounts}
      />

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<JobTracker />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;