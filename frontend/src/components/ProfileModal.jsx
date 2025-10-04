import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { useAuth } from './AuthContext';
import { useToast } from '../hooks/use-toast';
import { User, Mail, GraduationCap, Calendar, TrendingUp, CheckCircle, Clock, LogOut, Edit3 } from 'lucide-react';

const ProfileModal = ({ open, onClose }) => {
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    university: user?.university || '',
    course: user?.course || '',
    year: user?.year || ''
  });
  const { toast } = useToast();

  const handleSave = () => {
    updateProfile(editData);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
    });
  };

  const handleLogout = () => {
    logout();
    onClose();
    toast({
      title: "Logged Out",
      description: "You've been logged out successfully",
    });
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Avatar and Basic Info */}
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-lg font-semibold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              {!isEditing ? (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <Mail className="w-4 h-4 mr-1" />
                    {user.email}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    value={editData.name}
                    onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit3 className="w-4 h-4 mr-1" />
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </div>

          <Separator />

          {/* Academic Information */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Academic Information</h4>
            
            {!isEditing ? (
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <GraduationCap className="w-4 h-4 mr-2 text-blue-500" />
                  {user.university}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-2 text-blue-500" />
                  {user.course}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                  {user.year}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="edit-university">University</Label>
                  <Input
                    id="edit-university"
                    value={editData.university}
                    onChange={(e) => setEditData(prev => ({ ...prev, university: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-course">Course</Label>
                  <Input
                    id="edit-course"
                    value={editData.course}
                    onChange={(e) => setEditData(prev => ({ ...prev, course: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-year">Year</Label>
                  <Input
                    id="edit-year"
                    value={editData.year}
                    onChange={(e) => setEditData(prev => ({ ...prev, year: e.target.value }))}
                  />
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Statistics */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Statistics</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <TrendingUp className="w-4 h-4 text-blue-600 mr-1" />
                  <span className="text-lg font-semibold text-blue-600">
                    {user.totalEvents}
                  </span>
                </div>
                <p className="text-xs text-gray-600">Total Events</p>
              </div>
              
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-lg font-semibold text-green-600">
                    {user.completedEvents}
                  </span>
                </div>
                <p className="text-xs text-gray-600">Completed</p>
              </div>
              
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Clock className="w-4 h-4 text-orange-600 mr-1" />
                  <span className="text-lg font-semibold text-orange-600">
                    {user.upcomingEvents}
                  </span>
                </div>
                <p className="text-xs text-gray-600">Upcoming</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Member Since */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Member since {new Date(user.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            <Badge variant="outline" className="text-green-600 border-green-200">
              Active
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            {isEditing ? (
              <>
                <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </Button>
                <Button onClick={onClose} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Close
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;