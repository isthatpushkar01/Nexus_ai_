# NEXUS AI FactoryOS - Architecture Guide

## System Architecture

### High-Level Overview

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                    Client Tier                                              │
│  (Next.js Frontend - React Components - TypeScript)                         │
└──────────────────────────────────────────────────────────────────────────────┘
                       │
         ┌─────────────┴──────────────┐
         │                            │
    REST API                     WebSocket
    (HTTP)                      (Socket.IO)
         │                            │
┌────────┴──────────────────────────┴────────────────────────────────┐
│                 Application Tier                                   │
│    (Express.js - TypeScript - Node.js Runtime)                    │
│                                                                  │
│  ┌───────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │  Controllers  │  │   Services   │  │ Middleware   │           │
│  └───────────────┘  └──────────────┘  └──────────────┘           │
│                                                                  │
│  ┌───────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ Repositories  │  │Authentication│  │   Routes     │           │
│  └───────────────┘  └──────────────┘  └──────────────┘           │
└────────┬──────────────────┬────────────────┬──────────────────────┘
         │                  │                │
    MongoDB           Redis Cache      MQTT Broker
    (Data)            (Cache)         (IoT Devices)
         │                  │                │
┌────────┴──────────────────┴────────────────┴──────────────────────┐
│              Data Persistence Tier                               │
│  MongoDB Atlas | Redis | Message Queue (Bull)                   │
└──────────────────────────────────────────────────────────────────┘
```

## Frontend Architecture (Next.js)

### Folder Structure

```
frontend/
├── src/
│   ├── app/                      # Next.js 14 App Router
│   │   ├── (auth)/               # Auth layout group
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/          # Dashboard layout group
│   │   │   ├── mission-control/  # Module pages
│   │   │   ├── machines/
│   │   │   ├── digital-twin/
│   │   │   ├── maintenance/
│   │   │   ├── qc/
│   │   │   ├── copilot/
│   │   │   └── layout.tsx
│   │   ├── api/                  # Route handlers
│   │   │   └── auth/
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Home page
│   │
│   ├── components/               # Reusable components
│   │   ├── common/               # Shared components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── NavBar.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── charts/               # Chart components
│   │   ├── forms/                # Form components
│   │   ├── modals/               # Modal components
│   │   ├── tables/               # Table components
│   │   ├── cards/                # Card components
│   │   └── loaders/              # Skeleton/loader components
│   │
│   ├── features/                 # Feature modules
│   │   ├── auth/                 # Authentication
│   │   ├── machines/             # Machine Intelligence
│   │   ├── dashboard/            # Mission Control
│   │   ├── twin/                 # Digital Twin
│   │   ├── maintenance/          # Predictive Maintenance
│   │   ├── qc/                   # Vision QC
│   │   ├── copilot/              # Factory Copilot
│   │   └── settings/             # Settings
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useMachines.ts
│   │   ├── useWebSocket.ts
│   │   └── useForm.ts
│   │
│   ├── store/                    # Redux store
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── machinesSlice.ts
│   │   │   ├── uiSlice.ts
│   │   │   └── notificationsSlice.ts
│   │   ├── store.ts
│   │   └── hooks.ts
│   │
│   ├── services/                 # API services
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── machines.ts
│   │   ├── sensors.ts
│   │   ├── predictions.ts
│   │   └── reports.ts
│   │
│   ├── types/                    # TypeScript types
│   │   ├── index.ts
│   │   ├── auth.ts
│   │   ├── machine.ts
│   │   ├── sensor.ts
│   │   └── api.ts
│   │
│   ├── utils/                    # Utilities
│   │   ├── cn.ts                 # classnames helper
│   │   ├── format.ts             # Formatting helpers
│   │   ├── validation.ts         # Validation helpers
│   │   └── constants.ts          # App constants
│   │
│   └── styles/                   # Global styles
│       └── globals.css
│
├── public/                       # Static assets
├── package.json
├── tsconfig.json
├── next.config.js
└── tailwind.config.ts
```

### Component Architecture

**Atomic Design Principles:**

1. **Atoms** - Basic building blocks (Button, Input, Badge)
2. **Molecules** - Simple component combinations (FormGroup, Card)
3. **Organisms** - Complex component groups (DataTable, Dashboard)
4. **Templates** - Page templates (DashboardLayout, AuthLayout)
5. **Pages** - Full pages (Dashboard, Machines)

### State Management (Redux Toolkit)

```typescript
// Redux Store Structure
{
  auth: {
    user: User | null,
    token: string | null,
    isAuthenticated: boolean,
    loading: boolean,
    error: string | null
  },
  machines: {
    items: Machine[],
    selected: Machine | null,
    loading: boolean,
    error: string | null
  },
  ui: {
    theme: 'light' | 'dark',
    sidebarOpen: boolean,
    notifications: Notification[]
  },
  sensors: {
    data: SensorReading[],
    streaming: boolean
  }
}
```

### Real-time Communication (Socket.IO)

```typescript
// Client-side WebSocket events
// Emit:
connection
machine:subscribe
machine:unsubscribe

// Listen:
machine:update
sensor:data
alert:new
notification:new
prediction:ready
```

## Backend Architecture (Express.js)

### Folder Structure

```
backend/
├── src/
│   ├── app.ts                    # Express app setup
│   ├── server.ts                 # Server entry point
│   │
│   ├── controllers/              # Route handlers
│   │   ├── authController.ts
│   │   ├── machineController.ts
│   │   ├── sensorController.ts
│   │   ├── predictionController.ts
│   │   └── reportController.ts
│   │
│   ├── services/                 # Business logic
│   │   ├── AuthService.ts
│   │   ├── MachineService.ts
│   │   ├── SensorService.ts
│   │   ├── PredictionService.ts
│   │   ├── NotificationService.ts
│   │   └── ReportService.ts
│   │
│   ├── repositories/             # Data access layer
│   │   ├── UserRepository.ts
│   │   ├── MachineRepository.ts
│   │   ├── SensorRepository.ts
│   │   ├── PredictionRepository.ts
│   │   └── AlertRepository.ts
│   │
│   ├── models/                   # Mongoose schemas
│   │   ├── User.ts
│   │   ├── Factory.ts
│   │   ├── Machine.ts
│   │   ├── Sensor.ts
│   │   ├── SensorData.ts
│   │   ├── Production.ts
│   │   ├── Maintenance.ts
│   │   ├── Prediction.ts
│   │   ├── Alert.ts
│   │   └── AuditLog.ts
│   │
│   ├── routes/                   # API routes
│   │   ├── auth.ts
│   │   ├── machines.ts
│   │   ├── sensors.ts
│   │   ├── predictions.ts
│   │   ├── reports.ts
│   │   └── index.ts
│   │
│   ├── middleware/               # Express middleware
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   ├── validation.ts
│   │   ├── logging.ts
│   │   └── rateLimit.ts
│   │
│   ├── utils/                    # Utilities
│   │   ├── logger.ts
│   │   ├── errors.ts
│   │   ├── jwt.ts
│   │   ├── validators.ts
│   │   └── constants.ts
│   │
│   ├── config/                   # Configuration
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   ├── mqtt.ts
│   │   ├── email.ts
│   │   └── env.ts
│   │
│   ├── types/                    # TypeScript types
│   │   ├── index.ts
│   │   ├── express.ts            # Express augmentation
│   │   └── models.ts
│   │
│   ├── workers/                  # Background jobs
│   │   ├── predictionWorker.ts
│   │   ├── maintenanceWorker.ts
│   │   └── notificationWorker.ts
│   │
│   └── integrations/             # External integrations
│       ├── mqtt.ts
│       ├── openai.ts
│       └── cloudinary.ts
│
├── scripts/                      # Database scripts
│   ├── seed.ts
│   ├── migrate.ts
│   └── createIndexes.ts
│
├── tests/                        # Tests
├── package.json
└── tsconfig.json
```

### Design Patterns

#### 1. Repository Pattern
```typescript
// Data access abstraction
class UserRepository {
  async findById(id: string): Promise<User | null>
  async findByEmail(email: string): Promise<User | null>
  async create(data: UserCreateInput): Promise<User>
  async update(id: string, data: UserUpdateInput): Promise<User>
  async delete(id: string): Promise<void>
}
```

#### 2. Service Layer
```typescript
// Business logic encapsulation
class AuthService {
  constructor(private userRepository: UserRepository) {}
  
  async login(email: string, password: string): Promise<LoginResponse>
  async register(data: RegisterInput): Promise<User>
  async refreshToken(token: string): Promise<TokenResponse>
}
```

#### 3. Middleware Chain
```typescript
// Express middleware pipeline
app.use(loggerMiddleware)
app.use(corsMiddleware)
app.use(rateLimitMiddleware)
app.use(authMiddleware)
app.use(errorHandlerMiddleware)
```

### API Request/Response Flow

```typescript
Client Request
       ↓
Route Handler (Controller)
       ↓
Middleware (Auth, Validation)
       ↓
Service Layer (Business Logic)
       ↓
Repository Layer (Data Access)
       ↓
Database Query
       ↓
Response (JSON)
       ↓
Client
```

## Database Architecture (MongoDB)

### Schema Design Principles

1. **Denormalization** - Some data duplication for read performance
2. **Embedding** - Nested documents for related data
3. **Referencing** - ObjectIds for relationships
4. **Indexing** - Strategic indexes on frequently queried fields
5. **Time Series** - Separate collection for high-volume data

### Key Collections

#### Users
```typescript
{
  _id: ObjectId,
  email: string,
  password: string (hashed),
  firstName: string,
  lastName: string,
  role: 'admin' | 'manager' | 'operator' | 'engineer',
  factoryId: ObjectId,
  status: 'active' | 'inactive',
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date | null
}
```

#### Machines
```typescript
{
  _id: ObjectId,
  factoryId: ObjectId,
  name: string,
  model: string,
  manufacturer: string,
  serialNumber: string,
  location: string,
  status: 'running' | 'idle' | 'maintenance' | 'error',
  health: {
    score: number (0-100),
    remainingUsefulLife: number (hours),
    lastMaintenance: Date
  },
  sensors: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

#### SensorData (Time Series)
```typescript
{
  _id: ObjectId,
  machineId: ObjectId,
  sensorId: ObjectId,
  timestamp: Date,
  temperature: number,
  rpm: number,
  current: number,
  voltage: number,
  power: number,
  status: 'normal' | 'warning' | 'critical',
  createdAt: Date
}
```

## Security Architecture

### Authentication Flow

```
1. User provides credentials
   ↓
2. Server validates credentials
   ↓
3. Server generates JWT token + refresh token
   ↓
4. Client stores tokens
   ↓
5. Client includes token in subsequent requests
   ↓
6. Server validates token
   ↓
7. Request proceeds if valid
```

### Authorization (RBAC)

```
Roles:
- Super Admin: Full access
- Factory Admin: Factory-level access
- Manager: Department access
- Engineer: Technical access
- Operator: Limited access
- Auditor: Read-only access

Permissions Matrix:
[Role] → [Resource] → [Action]
Example: Manager → Machines → View, Edit
```

## Real-time Communication

### Socket.IO Events

```typescript
// Server emits:
socket.emit('machine:update', machineData)
socket.emit('sensor:reading', sensorData)
socket.emit('alert:triggered', alertData)
socket.emit('notification:new', notificationData)

// Client listens:
socket.on('machine:update', handleMachineUpdate)
socket.on('sensor:reading', handleSensorData)
socket.on('alert:triggered', handleAlert)
```

## Performance Optimization

### Caching Strategy (Redis)

```
Level 1: Client-side (React Query)
Level 2: Server-side (Redis)
Level 3: Database (MongoDB indexes)

Cache Invalidation:
- TTL-based expiration
- Event-based invalidation
- Manual invalidation on updates
```

### Database Optimization

```
- Indexes on frequently queried fields
- Aggregation pipelines for complex queries
- Pagination for large datasets
- Projection to limit returned fields
- Connection pooling
```

## Deployment Architecture

### Development → Staging → Production

```
Local Development
    ↓
GitHub Push
    ↓
CI/CD Pipeline (GitHub Actions)
    ↓
Build & Test
    ↓
Staging Deployment
    ↓
Production Deployment
    ↓
Monitoring & Alerts
```

## Scalability Considerations

1. **Horizontal Scaling**: Multiple backend instances
2. **Load Balancing**: Nginx/HAProxy
3. **Database Sharding**: Shard by factoryId
4. **Message Queue**: Bull for background jobs
5. **CDN**: Cloudinary for assets
6. **Caching**: Redis for frequently accessed data

---

For more details, see other documentation files.
