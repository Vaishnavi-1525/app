// Mock data for Job Application Tracker
export const mockEvents = [
  {
    id: '1',
    title: 'Google Placement Drive - Round 1',
    date: '2025-01-15',
    time: '10:00',
    platform: 'Google',
    description: 'Technical aptitude test and coding round. Bring laptop and valid ID.',
    status: 'upcoming',
    createdAt: '2025-01-01T10:00:00Z'
  },
  {
    id: '2',
    title: 'Microsoft Interview',
    date: '2025-01-18',
    time: '14:30',
    platform: 'Microsoft',
    description: 'Final technical interview with team lead. Focus on system design.',
    status: 'upcoming',
    createdAt: '2025-01-02T10:00:00Z'
  },
  {
    id: '3',
    title: 'Infosys Aptitude Test',
    date: '2025-01-12',
    time: '09:00',
    platform: 'Infosys Campus Portal',
    description: 'Online aptitude and logical reasoning test.',
    status: 'upcoming',
    createdAt: '2025-01-03T10:00:00Z'
  },
  {
    id: '4',
    title: 'TCS CodeVita Registration',
    date: '2024-12-28',
    time: '16:00',
    platform: 'TCS',
    description: 'Completed registration for coding competition.',
    status: 'completed',
    createdAt: '2024-12-20T10:00:00Z'
  },
  {
    id: '5',
    title: 'Amazon Online Assessment',
    date: '2024-12-30',
    time: '11:00',
    platform: 'Amazon',
    description: 'Successfully completed the online coding assessment.',
    status: 'completed',
    createdAt: '2024-12-25T10:00:00Z'
  },
  {
    id: '6',
    title: 'Wipro Walk-in Interview',
    date: '2024-12-25',
    time: '13:00',
    platform: 'Wipro',
    description: 'Missed the walk-in interview due to scheduling conflict.',
    status: 'expired',
    createdAt: '2024-12-20T10:00:00Z'
  },
  {
    id: '7',
    title: 'HCL Campus Drive',
    date: '2024-12-22',
    time: '10:30',
    platform: 'HCL Technologies',
    description: 'Campus placement drive - did not attend.',
    status: 'expired',
    createdAt: '2024-12-15T10:00:00Z'
  }
];

// Helper function to get events by status
export const getEventsByStatus = (status) => {
  return mockEvents.filter(event => event.status === status);
};

// Helper function to get event counts
export const getEventCounts = () => {
  return {
    upcoming: mockEvents.filter(event => event.status === 'upcoming').length,
    completed: mockEvents.filter(event => event.status === 'completed').length,
    expired: mockEvents.filter(event => event.status === 'expired').length
  };
};

// Helper function to sort events by date
export const sortEventsByDate = (events) => {
  return events.sort((a, b) => new Date(a.date) - new Date(b.date));
};