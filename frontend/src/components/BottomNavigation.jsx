import React from 'react';
import { Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const BottomNavigation = ({ activeTab, onTabChange, eventCounts }) => {
  const tabs = [
    {
      id: 'upcoming',
      label: 'Upcoming',
      icon: Clock,
      color: 'text-blue-600',
      activeColor: 'bg-blue-600 text-white',
      count: eventCounts.upcoming || 0
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: CheckCircle,
      color: 'text-green-600',
      activeColor: 'bg-green-600 text-white',
      count: eventCounts.completed || 0
    },
    {
      id: 'expired',
      label: 'Expired',
      icon: AlertTriangle,
      color: 'text-red-600',
      activeColor: 'bg-red-600 text-white',
      count: eventCounts.expired || 0
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 min-w-[80px] ${
                isActive 
                  ? tab.activeColor + ' shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="relative">
                <IconComponent className="w-6 h-6 mb-1" />
                {tab.count > 0 && (
                  <span className={`absolute -top-2 -right-2 w-5 h-5 text-xs rounded-full flex items-center justify-center font-semibold ${
                    isActive 
                      ? 'bg-white text-gray-700' 
                      : 'bg-gray-600 text-white'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;