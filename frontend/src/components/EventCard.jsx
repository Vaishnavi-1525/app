import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, Clock, Building, CheckCircle, Edit3 } from 'lucide-react';

const EventCard = ({ event, onMarkDone, onEdit, showMarkDone = true, showEdit = true }) => {
  const getDaysRemaining = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate);
    const diffTime = event - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return null;
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days left`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const daysRemaining = getDaysRemaining(event.date);

  return (
    <Card className="mb-4 hover:shadow-md transition-all duration-200 border-l-4 border-l-blue-500">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">{event.title}</h3>
            <Badge variant="outline" className={`text-xs ${getStatusColor(event.status)}`}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </Badge>
          </div>
          <div className="flex space-x-2 ml-2">
            {showEdit && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(event)}
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <Edit3 className="w-4 h-4 mr-1" />
                Edit
              </Button>
            )}
            {showMarkDone && event.status === 'upcoming' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onMarkDone(event.id)}
                className="text-green-600 border-green-200 hover:bg-green-50"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Mark Done
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
            {formatDate(event.date)}
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-blue-500" />
            {formatTime(event.time)}
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Building className="w-4 h-4 mr-2 text-blue-500" />
            {event.platform}
          </div>
        </div>

        {event.description && (
          <p className="text-sm text-gray-600 mb-3">{event.description}</p>
        )}

        {daysRemaining && event.status === 'upcoming' && (
          <div className="flex items-center">
            <Badge className="bg-orange-100 text-orange-800 border-orange-200">
              {daysRemaining}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventCard;