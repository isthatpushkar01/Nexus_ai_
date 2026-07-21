# Deployment Guide

## Prerequisites

- Docker & Docker Compose
- Node.js 18+
- MongoDB Atlas account
- Render account (for backend)
- Vercel account (for frontend)
- GitHub account

## Environment Setup

### 1. MongoDB Atlas

1. Create cluster at [mongodb.com/cloud](https://mongodb.com/cloud)
2. Create database user
3. Whitelist your IP
4. Get connection string
5. Add to `.env.local`:

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/nexus-factory
```

### 2. Redis

```bash
# Using Docker
docker run -d -p 6379:6379 redis:latest

# Or use Redis Cloud
# Get connection string and add to .env.local
REDIS_URL=redis://:password@host:port
```

### 3. Environment Variables

Copy `.env.example` to `.env.local` and fill in all values:

```bash
cp .env.example .env.local
```

## Local Development with Docker

### Start Full Stack

```bash
# Build images
docker-compose build

# Start services
docker-compose up

# In another terminal, seed database
docker-compose exec backend npm run db:seed
```

### Access Services

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017
- Redis: localhost:6379

### Stop Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

## Production Deployment

### Backend Deployment (Render)

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Deploy Backend Service**
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Configure:
     - Name: `nexus-ai-backend`
     - Environment: `Node`
     - Build command: `npm run build`
     - Start command: `npm run start`
     - Add environment variables from `.env.example`

3. **Add Environment Variables in Render Dashboard**
   ```
   MONGODB_URI=mongodb+srv://...
   REDIS_URL=redis://...
   JWT_SECRET=your-secret-key
   ... (all from .env.example)
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note the service URL

### Frontend Deployment (Vercel)

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Deploy Frontend**
   - Click "New Project"
   - Import GitHub repository
   - Configure:
     - Framework: Next.js
     - Root Directory: `frontend`

3. **Add Environment Variables**
   - Go to Settings → Environment Variables
   - Add:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-url/api
     NEXT_PUBLIC_WS_URL=wss://your-backend-url
     ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build and deployment
   - Visit your Vercel URL

## Docker Compose Production Setup

### Create docker-compose.prod.yml

```yaml
version: '3.8'

services:
  backend:
    image: nexus-ai-backend:latest
    container_name: nexus-backend-prod
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=${MONGODB_URI}
      - REDIS_URL=${REDIS_URL}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - mongodb
      - redis
    networks:
      - nexus-network
    restart: always

  frontend:
    image: nexus-ai-frontend:latest
    container_name: nexus-frontend-prod
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
      - NEXT_PUBLIC_WS_URL=wss://api.yourdomain.com
    depends_on:
      - backend
    networks:
      - nexus-network
    restart: always

  mongodb:
    image: mongo:6.0
    container_name: nexus-mongodb-prod
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_ROOT_USER}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_ROOT_PASSWORD}
    volumes:
      - mongo_data:/data/db
    networks:
      - nexus-network
    restart: always

  redis:
    image: redis:7-alpine
    container_name: nexus-redis-prod
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    networks:
      - nexus-network
    restart: always

  nginx:
    image: nginx:latest
    container_name: nexus-nginx-prod
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - backend
      - frontend
    networks:
      - nexus-network
    restart: always

volumes:
  mongo_data:
  redis_data:

networks:
  nexus-network:
    driver: bridge
```

### Deploy with Docker Compose

```bash
# Build images
docker-compose -f docker-compose.prod.yml build

# Start services
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose logs -f backend

# Scale services
docker-compose -f docker-compose.prod.yml up -d --scale backend=3

# Stop services
docker-compose -f docker-compose.prod.yml down
```

## CI/CD with GitHub Actions

### Test Workflow

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      mongodb:
        image: mongo:6.0
        options: >
          --health-cmd mongosh
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 27017:27017
      redis:
        image: redis
        options: >
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install backend
        run: cd backend && npm ci
      
      - name: Run backend tests
        run: cd backend && npm run test
      
      - name: Install frontend
        run: cd frontend && npm ci
      
      - name: Run frontend tests
        run: cd frontend && npm run test
      
      - name: Build
        run: npm run build
```

### Deploy Workflow

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Render
        uses: johnbeynon/render-deploy-action@v0.0.6
        with:
          service-id: ${{ secrets.RENDER_SERVICE_ID }}
          api-token: ${{ secrets.RENDER_API_TOKEN }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
          vercel-args: '--prod'
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Database Migrations

```bash
# Create migration
cd backend
npm run db:migration:create -- create_sensors_table

# Run migrations
npm run db:migration:run

# Rollback last migration
npm run db:migration:rollback

# Seed database
npm run db:seed
```

## Monitoring & Logs

### View Logs

```bash
# Docker logs
docker logs -f nexus-backend-prod

# Render logs
render logs -s nexus-ai-backend

# Vercel logs
vercel logs
```

### Setup Monitoring

1. **Sentry** (Error tracking)
   ```bash
   npm install @sentry/node @sentry/tracing
   ```

2. **Datadog** (Performance monitoring)
   ```bash
   npm install dd-trace
   ```

3. **New Relic** (Application monitoring)
   ```bash
   npm install newrelic
   ```

## Scaling Considerations

### Horizontal Scaling

```bash
# Scale backend to 3 instances
docker-compose -f docker-compose.prod.yml up -d --scale backend=3

# Use load balancer (Nginx, HAProxy)
```

### Database Optimization

```bash
# Create indexes
cd backend
npm run db:create-indexes

# Monitor database performance
# MongoDB Atlas → Monitoring
```

## Security Checklist

- [ ] Change all default passwords
- [ ] Enable MongoDB encryption
- [ ] Setup SSL/TLS certificates
- [ ] Configure CORS properly
- [ ] Enable rate limiting
- [ ] Setup firewall rules
- [ ] Regular backups enabled
- [ ] Secrets in environment variables only
- [ ] HTTPS enforced
- [ ] Audit logging enabled

## Troubleshooting

### Backend won't start

```bash
# Check logs
docker logs nexus-backend-prod

# Verify MongoDB connection
mongosh "mongodb+srv://..."

# Clear build cache
docker-compose build --no-cache
```

### Frontend build fails

```bash
# Clear cache
cd frontend
rm -rf .next node_modules
npm install
npm run build
```

### Database connection issues

```bash
# Test connection string
mongosh "your-connection-string"

# Check whitelist IP in MongoDB Atlas
```

---

For more help, see [Contributing Guide](./CONTRIBUTING.md)
