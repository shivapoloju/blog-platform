# Blog Publishing Platform

This project is a blog publishing platform built with a React frontend, a Node.js (Express) backend, and MongoDB as the database. It includes features for user authentication, blog post CRUD operations, and author profiles.

## Features

- **User Authentication**: Users can register and log in to their accounts using JWT for secure authentication.
- **Blog Post Management**: Users can create, read, update, and delete blog posts.
- **Author Profiles**: Each user has a profile that displays their information and a list of their blog posts.

## Technologies Used

- **Frontend**: React, Axios for API calls
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd blog-platform
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. Start the frontend application:
   ```
   cd frontend
   npm start
   ```

### API Endpoints

- **Authentication**
  - `POST /api/auth/register`: Register a new user
  - `POST /api/auth/login`: Log in an existing user

- **Blog Posts**
  - `GET /api/posts`: Get all blog posts
  - `POST /api/posts`: Create a new blog post
  - `GET /api/posts/:id`: Get a single blog post
  - `PUT /api/posts/:id`: Update a blog post
  - `DELETE /api/posts/:id`: Delete a blog post

- **User Profiles**
  - `GET /api/profile/:id`: Get user profile details

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License.