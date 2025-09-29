# Sportify Admin Dashboard

A comprehensive React-based admin dashboard for managing athlete talent assessments, built with TypeScript and modern web technologies.

## Features

### 🏆 Core Functionality
- **Secure Authentication** - Admin login with role-based access
- **Dashboard Overview** - Real-time metrics, charts, and performance analytics
- **Athlete Management** - Complete athlete profiles with performance tracking
- **Event Management** - Create and manage sporting events with eligibility rules
- **Test Data Management** - Review, verify, and flag athlete test submissions
- **Gamification System** - Badge management and leaderboards
- **Settings & Reports** - Comprehensive admin configuration and data export

### 📊 Dashboard Analytics
- Performance distribution charts
- Activity trend analysis
- Top performers leaderboard
- Real-time statistics and metrics
- Recent activity feed

### 🎯 Athlete Management
- Search and filter athletes by multiple criteria
- Detailed athlete profiles with performance history
- Eligibility verification system
- Badge and achievement tracking
- Performance metrics visualization

### 🏅 Event Management
- Create events with custom eligibility rules
- Online and offline venue support
- Athlete registration tracking
- Required test configuration
- Event status management

### 📋 Test Data Management
- Review submitted test results
- Flag suspicious activities
- Verify test authenticity
- Download PDF reports
- Media attachment support

### 🏆 Gamification
- Custom badge creation and management
- Global leaderboard system
- Achievement criteria configuration
- Engagement tracking

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Icons**: Lucide React
- **Styling**: Tailwind CSS
- **Notifications**: React Hot Toast
- **State Management**: React Context API

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sportify-admin-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

### Demo Credentials
- **Email**: admin@sportify.com
- **Password**: admin123

### Build for Production
```bash
npm run build
```

### Key Features Now Working
- ✅ **Modern UI/UX** with Tailwind CSS and custom components
- ✅ **Glass-morphism Design** with backdrop blur effects
- ✅ **Responsive Layout** that works on all devices
- ✅ **Smooth Animations** and micro-interactions
- ✅ **Professional Components** (Button, Card, Input, etc.)
- ✅ **Gradient Backgrounds** and modern color schemes
- ✅ **Interactive Elements** with hover effects and transitions

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Sidebar.tsx     # Navigation sidebar
│   └── Header.tsx      # Top header bar
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── pages/              # Page components
│   ├── Login.tsx       # Login page
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Athletes.tsx    # Athlete management
│   ├── Events.tsx      # Event management
│   ├── TestData.tsx    # Test data management
│   ├── Gamification.tsx # Gamification features
│   └── Settings.tsx    # Settings page
├── services/           # Data services
│   └── mockData.ts     # Mock data and API simulation
├── types/              # TypeScript type definitions
│   └── index.ts        # Main type definitions
├── App.tsx             # Main app component
└── index.tsx           # App entry point
```

## Key Features

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Professional sports-themed UI

### Security
- Secure authentication system
- Role-based access control
- Session management

### Performance
- Optimized React components
- Efficient data management
- Lazy loading and code splitting ready

### Accessibility
- Keyboard navigation support
- Screen reader friendly
- High contrast support

## Customization

### Theming
The application uses a professional sports color palette with gradient accents. Colors can be customized in the CSS files and component styles.

### Data Integration
The current implementation uses mock data. To integrate with a real backend:

1. Replace mock data in `src/services/mockData.ts`
2. Implement API calls in each page component
3. Update the authentication context for real login
4. Add error handling and loading states

### Adding New Features
The modular structure makes it easy to add new features:

1. Create new page components in `src/pages/`
2. Add new routes in `src/App.tsx`
3. Update the sidebar navigation in `src/components/Sidebar.tsx`
4. Add new types in `src/types/index.ts`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please contact the development team or create an issue in the repository.

---

Built with ❤️ for the Sportify platform
