# Blog Platform Backend

## Overview
This is the backend part of the Blog Platform project, built using Node.js, Express, and MongoDB. The backend provides a RESTful API for user authentication, blog post management, and author profiles.

## Features
- User authentication with JWT
- CRUD operations for blog posts
- User profile management
- Secure routes with authentication middleware

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the backend directory:
   ```
   cd blog-platform/backend
   ```
3. Install dependencies:
   ```
   npm install
   ```

### Configuration
- Create a `.env` file in the backend directory and add your MongoDB connection string and JWT secret:
   ```
   MONGODB_URI=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret>
   ```

### Running the Application
To start the server, run:
```
npm start
```
The server will run on `http://localhost:5000` by default.

### API Endpoints
- **Authentication**
  - `POST /api/auth/signup` - Register a new user
  - `POST /api/auth/login` - Login an existing user

- **Blog Posts**
  - `GET /api/posts` - Get all blog posts
  - `POST /api/posts` - Create a new blog post
  - `GET /api/posts/:id` - Get a single blog post
  - `PUT /api/posts/:id` - Update a blog post
  - `DELETE /api/posts/:id` - Delete a blog post

- **User Profiles**
  - `GET /api/profile/:userId` - Get user profile details
  - `GET /api/profile/:userId/posts` - Get all posts by a user

### Middleware
The application uses middleware for authentication to protect certain routes. Ensure that you include the `authMiddleware` in your route definitions where necessary.

## License
This project is licensed under the MIT License.