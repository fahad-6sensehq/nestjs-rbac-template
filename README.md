# 🎬 RBAC Template With NestJS

A comprehensive Role-Based Access Control (RBAC) template built with NestJS, featuring multi-tenant architecture, JWT authentication, and Redis caching.

## 🏗️ Architecture

- **Framework**: NestJS with TypeScript
- **Database**: MongoDB with Mongoose
- **Caching**: Redis
- **Authentication**: JWT with refresh tokens
- **Authorization**: Role-based permissions system
- **Multi-tenancy**: Tenant isolation support

## 🚀 Getting Started

### Prerequisites

- Node.js (v22 or higher)
- MongoDB
- Redis
- npm or yarn

### 📦 Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/fahad-6sensehq/nestjs-rbac-template
   cd nestjs-rbac-template
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.sample .env
   # Edit .env with your configuration
   ```

4. **Start Dependencies with Docker**
   ```bash
   docker-compose up -d redis
   ```

## 🔧 Configuration

### Required Environment Variables

```env
# Application
ENVIRONMENT=

# Database
MONGODB_URL=
DB_NAME=

# JWT
JWT_SECRET=

# Redis
REDIS_HOST=
REDIS_PORT=
REDIS_USERNAME=
REDIS_PASSWORD=
```

## 🏃‍♂️ Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod

# Debug mode
npm run start:debug
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Test in watch mode
npm run test:watch
```

## 📚 API Documentation

Once the application is running, visit:
- Swagger UI: `http://localhost:9000/xyz`

## 🔐 RBAC System

### Roles & Permissions

- **Super Admin**: Full system access
- **User**: Limited access to own resources

### Usage Example

```typescript
@Controller('users')
export class UserController {
  @Get()
  @RequirePermissions('user.view')
  findAll() {
    // Only users with 'user.view' permission can access
  }
}
```

## 🚀 Deployment

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build
```

### Production Checklist

- [ ] Set strong JWT_SECRET
- [ ] Configure proper MongoDB connection
- [ ] Set up Redis with authentication
- [ ] Enable HTTPS
- [ ] Configure proper CORS settings
- [ ] Set up monitoring and logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
