# Fitness App - Exercise Browser

A modern React fitness application for browsing and discovering exercises with advanced filtering and search capabilities.

🌐 **Live Demo**: https://indiagym.netlify.app/

## ✨ Recent Improvements to Exercises Page

### 🚀 Performance & User Experience
- **Smart Loading States**: Added skeleton loading animations and proper loading indicators
- **Error Handling**: Comprehensive error states with retry functionality
- **Optimized Scrolling**: Intelligent scroll-to-section behavior instead of fixed pixel positions
- **Efficient Filtering**: Client-side filtering reduces API calls and improves responsiveness

### 🎨 Enhanced UI/UX
- **Flexible Pagination**: Configurable items per page (6, 12, 24, 48)
- **Dual View Modes**: Grid and List view options with toggle buttons
- **Advanced Filtering**: Sort by name, body part, target muscle, or equipment
- **Equipment Filter**: Dynamic equipment filter based on available data
- **Active Filter Chips**: Visual indicators showing current filters
- **Improved Cards**: Better visual hierarchy with Material-UI Cards and Chips

### 🔍 Better Search & Navigation
- **Integrated Search**: Search works seamlessly with other filters
- **Real-time Filtering**: Instant results without page reloads
- **Keyboard Support**: Enter key support for search
- **Smart Pagination**: Auto-reset to page 1 when filters change
- **Results Counter**: Clear indication of filtered results count

### 📱 Responsive Design
- **Mobile-First**: Optimized layouts for all screen sizes
- **Flexible Grid**: Responsive grid system that adapts to content
- **Touch-Friendly**: Improved touch targets and interactions

### ♿ Accessibility
- **Keyboard Navigation**: Full keyboard support for pagination and controls
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators and logical tab order
- **Loading Announcements**: Screen reader announcements for loading states

## 🛠 Technical Stack

- **React 18** with Hooks and modern patterns
- **Material-UI (MUI)** for consistent design system
- **React Router v6** for navigation
- **RapidAPI** for exercise data
- **Responsive CSS** with mobile-first approach

## 📦 Key Features

- Browse 1000+ exercises with high-quality GIF demonstrations
- Filter by body part, equipment, and target muscles
- Search across exercise names, targets, and equipment
- Detailed exercise pages with related videos and similar exercises
- Responsive design for desktop, tablet, and mobile
- Fast loading with optimized API calls and caching

## 🚀 Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start

# Build for production
npm run build
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_RAPID_API_KEY=your_rapidapi_key_here
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Exercises.js    # Main exercises grid with filtering
│   ├── ExerciseCard.js # Individual exercise card
│   ├── SearchExercises.js # Search and body part filters
│   └── ...
├── pages/              # Page components
│   ├── Home.js         # Main landing page
│   └── ExerciseDetail.js # Individual exercise details
├── utils/              # Utility functions
│   └── fetchData.js    # API helper functions
└── assets/             # Static assets
```

## 🎯 Future Enhancements

- [ ] Favorites/Bookmarks system
- [ ] Workout plan creation
- [ ] Exercise difficulty ratings
- [ ] Progress tracking
- [ ] Social features and sharing
- [ ] Offline support with PWA
- [ ] Advanced analytics and insights