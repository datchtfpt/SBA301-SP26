# Hotel Booking Frontend

Frontend application for Hotel Booking System built with React, Vite, and React-Bootstrap.

## 🚀 Features

### Authentication
- ✅ Login with role-based access (Staff/Customer)
- ✅ Customer registration with validation
- ✅ JWT token management
- ✅ Protected routes

### User Roles

#### Staff Functions
- 📊 Dashboard with statistics
- 👥 Customer management (placeholder)
- 🏠 Room management (placeholder)
- 📋 Booking management (placeholder)

#### Customer Functions
- 📊 Personal dashboard
- 🏠 Room booking (placeholder)
- 📅 Booking history (placeholder)
- 👤 Profile management (placeholder)

## 🎨 Design

- **Theme:** Classical blue and light gray color scheme
- **Framework:** React-Bootstrap with custom styling
- **Responsive:** Mobile-friendly design
- **Animations:** Smooth transitions and hover effects

## 🛠️ Technology Stack

- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite
- **UI Framework:** React-Bootstrap
- **Routing:** React Router DOM
- **State Management:** React Context API
- **Styling:** Custom CSS with CSS variables

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx      # Navigation bar
│   └── PlaceholderPage.jsx
├── contexts/           # Authentication context
│   └── AuthContext.jsx
├── pages/              # Page components
│   ├── Login.jsx       # Login page
│   ├── Register.jsx    # Registration page
│   ├── staff/         # Staff pages
│   └── customer/      # Customer pages
├── services/           # API integration
│   └── api.js         # API service layer
├── App.jsx            # Main app with routing
├── App.css            # Custom theme
└── main.jsx           # Entry point
```

## 🔧 Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## 🔗 API Integration

The frontend is configured to connect to a Spring Boot backend at `http://localhost:8080/api`.

### API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Customer registration

#### Customers
- `GET /api/customers` - Get all customers (Staff only)
- `GET /api/customers/{id}` - Get customer by ID
- `PUT /api/customers/{id}` - Update customer
- `DELETE /api/customers/{id}` - Delete customer

#### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/{id}` - Get room by ID
- `POST /api/rooms` - Create room (Staff only)
- `PUT /api/rooms/{id}` - Update room (Staff only)
- `DELETE /api/rooms/{id}` - Delete room (Staff only)

#### Bookings
- `GET /api/bookings` - Get bookings (filtered by role)
- `GET /api/bookings/{id}` - Get booking by ID
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/{id}` - Update booking
- `PATCH /api/bookings/{id}/cancel` - Cancel booking

## 🎯 Role-Based Access

### Staff Access
- Email containing "admin" or "staff" automatically gets Staff role
- Full access to customer, room, and booking management
- Dashboard with system statistics

### Customer Access
- Standard customer registration and login
- Personal dashboard and booking management
- Profile management

## 🎨 Theme Customization

The application uses CSS variables for easy theme customization:

```css
:root {
  --primary-blue: #2c5282;
  --light-blue: #3182ce;
  --medium-blue: #2b6cb0;
  --dark-blue: #1a365d;
  --light-gray: #f7fafc;
  --medium-gray: #e2e8f0;
  --dark-gray: #4a5568;
  --accent-blue: #4299e1;
  --white: #ffffff;
  --shadow: rgba(0, 0, 0, 0.1);
}
```

## 🔐 Authentication Flow

1. User enters credentials on login page
2. Frontend sends request to `/api/auth/login`
3. Backend validates and returns JWT token
4. Token stored in localStorage
5. User role determined and redirected accordingly
6. Token included in subsequent API requests

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 576px, 768px, 992px, 1200px
- Touch-friendly interface
- Optimized for all screen sizes

## 🚀 Deployment

The application is ready for deployment to any static hosting service:

- **Vercel**
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors:** Ensure backend allows requests from frontend URL
2. **Authentication Issues:** Check JWT token configuration
3. **Routing Issues:** Verify React Router setup
4. **Styling Issues:** Ensure Bootstrap CSS is properly imported

### Development Tips

- Use browser dev tools to inspect API requests
- Check localStorage for authentication tokens
- Monitor console for JavaScript errors
- Use React DevTools for component debugging

## 📝 Notes

- Placeholder pages indicate features ready for implementation
- API service layer provides complete backend integration
- Authentication system is fully functional
- Design system is consistent and scalable
