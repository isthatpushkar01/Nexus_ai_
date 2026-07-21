# NEXUS AI FactoryOS

> One Platform. Every Machine. Complete Factory Intelligence.

A production-ready Industrial Operating System (IOS) built for Indian MSMEs to optimize manufacturing operations through real-time monitoring, predictive maintenance, AI analytics, and digital twin technology.

## 🎯 Project Vision

NEXUS AI FactoryOS is designed to become the **Windows of Manufacturing Industries** — consolidating all factory operations into one intelligent platform that:

- 🔍 **Observes** - Real-time machine monitoring via IoT
- 🧠 **Learns** - AI models for pattern recognition
- 🔎 **Predicts** - Predictive maintenance & production forecasting
- 💡 **Recommends** - Actionable insights & optimizations
- ⚡ **Optimizes** - Factory-wide performance enhancement

## 🏗️ Architecture Overview

```
┌────────────────────────────────────────────────────────────────────────────┐
│                   NEXUS AI FACTORYOS                                       │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  Frontend (Next.js + React + TypeScript)                                  │
│  ├── Mission Control Dashboard                                            │
│  ├── Machine Intelligence                                                 │
│  ├── Factory Twin 360 (Digital Twin)                                      │
│  ├── Predictive Maintenance                                               │
│  ├── Vision QC AI                                                         │
│  ├── Production Intelligence                                              │
│  └── Factory Copilot (AI Chat)                                            │
│                                                                            │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  Backend (Node.js + Express + TypeScript)                                 │
│  ├── REST APIs                                                            │
│  ├── WebSocket (Real-time Updates)                                        │
│  ├── MQTT (IoT Integration)                                               │
│  ├── Authentication & RBAC                                                │
│  ├── Service Layer                                                        │
│  └── Background Workers                                                   │
│                                                                            │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  Database (MongoDB Atlas + Mongoose)                                      │
│  ├── Users & Factories                                                    │
│  ├── Machines & Sensors                                                   │
│  ├── Sensor Data (Time Series)                                            │
│  ├── Production & Maintenance                                             │
│  └── AI Predictions & Reports                                             │
│                                                                            │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  Infrastructure                                                           │
│  ├── Redis (Caching)                                                      │
│  ├── Socket.IO (WebSocket)                                                │
│  ├── Docker & Docker Compose                                              │
│  ├── GitHub Actions (CI/CD)                                               │
│  └── Deployment (Vercel + Render)                                         │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
nexus-ai-factoryos/
├── frontend/                    # Next.js React application
│   ├── src/
│   │   ├── app/                # App directory (Next.js 14)
│   │   ├── components/         # Reusable components
│   │   ├── features/           # Feature-based modules
│   │   ├── hooks/              # Custom React hooks
│   │   ├── store/              # Redux store
│   │   ├── services/           # API services
│   │   ├── types/              # TypeScript types
│   │   ├── utils/              # Utilities
│   │   └── styles/             # Global styles
│   ├── public/                 # Static assets
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                     # Express.js API server
│   ├── src/
│   │   ├── controllers/        # Route handlers
│   │   ├── services/           # Business logic
│   │   ├── models/             # Mongoose schemas
│   │   ├── middleware/         # Express middleware
│   │   ├── routes/             # API routes
│   │   ├── utils/              # Helper functions
│   │   ├── config/             # Configuration
│   │   ├── types/              # TypeScript types
│   │   └── app.ts              # Express app setup
│   ├── scripts/                # Database scripts
│   ├── package.json
│   └── tsconfig.json
│
├── shared/                      # Shared types & utilities
│   ├── types/                  # Shared TypeScript types
│   ├── constants/              # Constants
│   └── utils/                  # Shared utilities
│
├── database/                    # Database documentation
│   ├── schemas/                # Schema documentation
│   └── migrations/             # Migration scripts
│
├── docker/                      # Docker configurations
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── docker-compose.yml
│
├── .github/                     # GitHub workflows
│   └── workflows/
│       ├── test.yml
│       ├── build.yml
│       └── deploy.yml
│
├── docs/                        # Documentation
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── DATABASE.md
│   └── DEPLOYMENT.md
│
├── .env.example                 # Environment variables template
├── package.json                 # Root package.json
└── README.md
```

## ⚙️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Language**: TypeScript
- **Styling**: TailwindCSS + Shadcn UI
- **Animation**: Framer Motion
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios + React Query
- **Real-time**: Socket.IO Client
- **Charts**: Recharts
- **Icons**: Lucide React
- **3D**: Three.js (Digital Twin)
- **i18n**: i18next

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB + Mongoose
- **Cache**: Redis
- **Real-time**: Socket.IO
- **IoT Protocol**: MQTT
- **Authentication**: JWT
- **Validation**: Zod
- **Logging**: Winston
- **Task Queue**: Bull (Redis)

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Render
- **Database**: MongoDB Atlas
- **Storage**: Cloudinary
- **CI/CD**: GitHub Actions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- MongoDB Atlas account
- Redis (Docker or local)

### Installation

```bash
# Clone repository
git clone https://github.com/isthatpushkar01/Nexus_ai_.git
cd Nexus_ai_

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Start with Docker Compose
docker-compose up

# Or start individually

# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

### Access
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api/docs

## 🎛️ Core Modules

### 1. Mission Control
Central dashboard showing:
- Real-time KPIs (production rate, machine health, energy consumption)
- Factory overview
- Alert summary
- Quick actions

### 2. Machine Intelligence
Real-time monitoring:
- Temperature, RPM, Current, Voltage, Power
- Health scores & RUL (Remaining Useful Life)
- Sensor anomalies
- Machine status

### 3. Factory Twin 360
3D Digital Twin visualization:
- Interactive factory layout
- Clickable machines
- Real-time sensor data overlay
- Maintenance history

### 4. Predictive Maintenance
AI-powered predictions:
- Failure predictions
- Maintenance scheduling
- Parts replacement recommendations
- Historical analysis

### 5. Vision QC AI
Quality control:
- Defect detection
- Quality metrics
- Inspection logs
- Reports

### 6. Factory Copilot
ChatGPT-like AI assistant:
- Voice & image support
- CSV/Excel/PDF uploads
- Natural language queries
- Multi-language support (11 Indian languages)

## 🔐 Security

- JWT authentication with refresh tokens
- Role-Based Access Control (RBAC)
- Password hashing (bcrypt)
- Rate limiting
- CORS protection
- Input validation & sanitization
- Audit logging
- Helmet.js headers

## 📊 Database Collections

- **users** - User accounts & profiles
- **factories** - Factory information
- **machines** - Machine configuration
- **sensors** - Sensor metadata
- **sensorData** - Time-series sensor readings
- **production** - Production records
- **maintenance** - Maintenance logs
- **energy** - Energy consumption data
- **inventory** - Spare parts & inventory
- **quality** - Quality inspection records
- **predictions** - AI model predictions
- **alerts** - System alerts
- **auditLogs** - User action logs
- **reports** - Generated reports
- **settings** - Factory settings

## 🌐 Multilingual Support

Supported languages:
- English
- Hindi
- Marathi
- Gujarati
- Punjabi
- Tamil
- Telugu
- Kannada
- Malayalam
- Bengali
- Odia

## 📈 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - Logout

### Machines
- `GET /api/machines` - List machines
- `POST /api/machines` - Create machine
- `GET /api/machines/:id` - Get machine details
- `PUT /api/machines/:id` - Update machine
- `DELETE /api/machines/:id` - Delete machine

### Sensor Data
- `GET /api/sensors/:machineId/data` - Get sensor readings
- `POST /api/sensors/data` - Record sensor reading
- `GET /api/sensors/:machineId/analytics` - Get analytics

### Predictions
- `GET /api/predictions/maintenance` - Get maintenance predictions
- `GET /api/predictions/production` - Get production forecast
- `POST /api/predictions/analyze` - Run analysis

### Reports
- `GET /api/reports` - List reports
- `POST /api/reports/generate` - Generate report
- `GET /api/reports/:id/download` - Download report

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd frontend
npm run test
```

## 🐳 Docker Deployment

```bash
# Build and run
docker-compose up --build

# Run in production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

## 📖 Documentation

- [Architecture Guide](./docs/ARCHITECTURE.md)
- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Contributing Guide](./docs/CONTRIBUTING.md)

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - See LICENSE file for details

## 👥 Team

Built by enterprise software engineers from:
- Google
- Microsoft
- Tesla Manufacturing
- Siemens
- Bosch
- Schneider Electric
- ABB
- SAP

## 📧 Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/isthatpushkar01/Nexus_ai_/issues)
- Email: support@nexusai-factory.com

---

**NEXUS AI FactoryOS** - Transforming Indian Manufacturing 🏭✨
