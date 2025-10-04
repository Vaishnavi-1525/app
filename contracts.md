# Job Application Tracker - Frontend/Backend Integration Contracts

## API Endpoints Required

### Authentication Endpoints
- `POST /api/auth/login` - User login with email/password
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Events Endpoints
- `GET /api/events` - Get all events for authenticated user
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update existing event
- `DELETE /api/events/:id` - Delete event
- `PATCH /api/events/:id/status` - Update event status (mark as completed)

## Data Models

### User Model
```javascript
{
  id: string,
  name: string,
  email: string,
  university: string,
  course: string,
  year: string,
  avatar?: string,
  createdAt: datetime,
  updatedAt: datetime
}
```

### Event Model
```javascript
{
  id: string,
  userId: string,
  title: string,
  date: string, // YYYY-MM-DD
  time: string, // HH:MM
  platform: string,
  description?: string,
  status: 'upcoming' | 'completed' | 'expired',
  createdAt: datetime,
  updatedAt: datetime
}
```

## Frontend Mock Data Integration

### Current Mock Data (to be replaced)
- **File**: `/src/mock/mockData.js`
- **Mock Events**: 7 sample events with different statuses
- **Mock User**: Sample user profile with statistics

### Frontend Components Using Mock Data
1. **EventCard.jsx** - Displays individual events
2. **AddEventModal.jsx** - Creates new events 
3. **EditEventModal.jsx** - Edits existing events
4. **AuthContext.jsx** - Manages authentication state
5. **ProfileModal.jsx** - Shows user profile

### Mock Data Removal Plan
1. Replace `mockEvents` array with API calls to `/api/events`
2. Replace `AuthContext` mock functions with actual API calls
3. Update event CRUD operations to use backend endpoints
4. Implement proper error handling and loading states
5. Add JWT token management for authentication

## Authentication Flow
1. User logs in via `LoginModal` → calls `/api/auth/login`
2. Store JWT token in localStorage
3. Include token in all API requests via axios interceptors
4. Handle token expiry and auto-logout

## Auto-Expiry Logic
- **Frontend**: Currently handles auto-expiry in useEffect
- **Backend**: Should implement scheduled job or check on each request
- Move expiry logic to backend for consistency across sessions

## Integration Steps
1. **Phase 1**: Create MongoDB models for User and Event
2. **Phase 2**: Build authentication endpoints with JWT
3. **Phase 3**: Create event CRUD endpoints
4. **Phase 4**: Replace frontend mock data with API calls
5. **Phase 5**: Add proper error handling and loading states

## Frontend State Management
- **AuthContext**: Manages user authentication state
- **Local State**: Manages events, modals, and form data
- **localStorage**: Persists authentication token

## Error Handling Requirements
- Network errors
- Authentication errors (401/403)
- Validation errors (400)
- Server errors (500)
- Toast notifications for user feedback