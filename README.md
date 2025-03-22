
# Adaptify - Smart User Adoption Analytics Platform

Adaptify is a smart analytics platform designed to help organizations monitor and improve technology adoption among employees while maintaining privacy and providing targeted training recommendations.

## Features

- User Activity Dashboard
- Proficiency Assessment
- Struggle Point Identification
- Adoption Analytics
- Training Recommendations
- Privacy-Focused Monitoring
- Buddy System for Peer Learning
- Real-time User Feedback Analysis

## Tech Stack

- Frontend: React with TypeScript
- Backend: Express.js
- Database: PostgreSQL with Drizzle ORM
- Styling: Tailwind CSS
- Charts: Chart.js with react-chartjs-2

## Getting Started

1. Fork the project on Replit
2. Install dependencies:
```bash
npm install
```

3. Click the "Run" button or run manually:
```bash
npm run dev
```

The application will start and be available at the URL shown in your Replit workspace.

## Project Structure

```
├── client/           # Frontend React application
├── server/           # Backend Express.js server
├── shared/           # Shared types and schemas
└── attached_assets/  # Project assets and resources
```

## Development

The development server will automatically reload when you make changes to the code.

- Frontend runs on the default Vite port
- Backend API runs on port 5000
- Database is automatically provisioned by Replit

## Environment Variables

The following environment variables are required:
- `DATABASE_URL`: PostgreSQL connection string (automatically set by Replit)

## Contributing

Feel free to fork this project and submit pull requests with improvements.
