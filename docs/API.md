# API Documentation

## Base URL

```
Development: http://localhost:5000/api
Production: https://api.nexusai-factory.com/api
```

## Authentication

All endpoints (except auth endpoints) require a JWT token in the Authorization header:

```bash
Authorization: Bearer <jwt_token>
```

## Response Format

### Success Response

```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": {}
  }
}
```

## Endpoints

### Authentication

#### Register

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe",
  "factoryId": "507f1f77bcf86cd799439011"
}

Response: 201
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "eyJ...",
    "refreshToken": "eyJ..."
  }
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}

Response: 200
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "eyJ...",
    "refreshToken": "eyJ..."
  }
}
```

#### Refresh Token

```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJ..."
}

Response: 200
{
  "success": true,
  "data": {
    "token": "eyJ..."
  }
}
```

#### Logout

```http
POST /auth/logout
Authorization: Bearer <jwt_token>

Response: 200
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Machines

#### List Machines

```http
GET /machines?page=1&limit=10&status=running
Authorization: Bearer <jwt_token>

Response: 200
{
  "success": true,
  "data": {
    "machines": [ ... ],
    "total": 50,
    "page": 1,
    "limit": 10
  }
}
```

#### Get Machine Details

```http
GET /machines/:id
Authorization: Bearer <jwt_token>

Response: 200
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "CNC Machine 1",
    "status": "running",
    "health": {
      "score": 85,
      "remainingUsefulLife": 1200
    }
  }
}
```

#### Create Machine

```http
POST /machines
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "CNC Machine 1",
  "model": "CNC-2000",
  "manufacturer": "ABC Corp",
  "serialNumber": "SN123456",
  "location": "Floor 1, Section A"
}

Response: 201
{
  "success": true,
  "data": { ... }
}
```

#### Update Machine

```http
PUT /machines/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "status": "maintenance",
  "location": "Floor 2"
}

Response: 200
{
  "success": true,
  "data": { ... }
}
```

#### Delete Machine

```http
DELETE /machines/:id
Authorization: Bearer <jwt_token>

Response: 200
{
  "success": true,
  "message": "Machine deleted"
}
```

### Sensors

#### Get Sensor Data

```http
GET /sensors/:machineId/data?startDate=2024-01-01&endDate=2024-01-31&limit=1000
Authorization: Bearer <jwt_token>

Response: 200
{
  "success": true,
  "data": {
    "readings": [ ... ],
    "total": 1000
  }
}
```

#### Record Sensor Reading

```http
POST /sensors/data
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "machineId": "507f1f77bcf86cd799439011",
  "sensorId": "507f1f77bcf86cd799439012",
  "temperature": 45.5,
  "rpm": 1200,
  "current": 10.5,
  "voltage": 380,
  "power": 3990
}

Response: 201
{
  "success": true,
  "data": { ... }
}
```

#### Get Sensor Analytics

```http
GET /sensors/:machineId/analytics?period=daily&limit=30
Authorization: Bearer <jwt_token>

Response: 200
{
  "success": true,
  "data": {
    "averages": { ... },
    "peaks": { ... },
    "anomalies": [ ... ]
  }
}
```

### Predictions

#### Get Maintenance Predictions

```http
GET /predictions/maintenance
Authorization: Bearer <jwt_token>

Response: 200
{
  "success": true,
  "data": [
    {
      "machineId": "507f1f77bcf86cd799439011",
      "prediction": "Bearing replacement needed",
      "confidence": 0.92,
      "estimatedDate": "2024-02-15",
      "recommendation": "Schedule maintenance before 2024-02-15"
    }
  ]
}
```

#### Get Production Forecast

```http
GET /predictions/production?days=7
Authorization: Bearer <jwt_token>

Response: 200
{
  "success": true,
  "data": {
    "forecast": [ ... ],
    "accuracy": 0.87
  }
}
```

#### Run Analysis

```http
POST /predictions/analyze
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "type": "root-cause",
  "machineId": "507f1f77bcf86cd799439011",
  "issue": "Sudden power spike"
}

Response: 200
{
  "success": true,
  "data": {
    "analysis": "...",
    "rootCauses": [ ... ],
    "recommendations": [ ... ]
  }
}
```

### Reports

#### List Reports

```http
GET /reports?type=maintenance&page=1&limit=10
Authorization: Bearer <jwt_token>

Response: 200
{
  "success": true,
  "data": {
    "reports": [ ... ],
    "total": 25
  }
}
```

#### Generate Report

```http
POST /reports/generate
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "type": "production",
  "startDate": "2024-01-01",
  "endDate": "2024-01-31",
  "machines": ["507f1f77bcf86cd799439011"]
}

Response: 201
{
  "success": true,
  "data": {
    "reportId": "507f1f77bcf86cd799439013",
    "status": "generating"
  }
}
```

#### Download Report

```http
GET /reports/:id/download
Authorization: Bearer <jwt_token>

Response: 200 (PDF file)
```

## Error Codes

| Code | Status | Description |
|------|--------|-------------|
| UNAUTHORIZED | 401 | Authentication failed |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| VALIDATION_ERROR | 400 | Invalid input data |
| CONFLICT | 409 | Resource already exists |
| SERVER_ERROR | 500 | Internal server error |
| RATE_LIMITED | 429 | Too many requests |

## Rate Limiting

- **General API**: 100 requests per 15 minutes
- **Auth Endpoints**: 5 requests per 15 minutes
- **Sensor Data**: 1000 requests per 15 minutes

## Pagination

All list endpoints support pagination:

```
?page=1&limit=10&sort=-createdAt&search=query

page: Page number (default: 1)
limit: Items per page (default: 10, max: 100)
sort: Sort field (prefix with - for descending)
search: Search query
```

---

For more details on specific endpoints, see the OpenAPI/Swagger documentation at `/api/docs`
