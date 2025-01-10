# 📚 Course Selling App Backend

## Description
The Course Selling App Backend is a Node.js application that provides a RESTful API for managing users, courses, and purchases. It allows users to sign up, sign in, and purchase courses, while administrators can manage course content.

## ✨ Features
- User authentication (sign up and sign in)
- Admin authentication (sign up and sign in)
- Course management (create, update, and retrieve courses)
- Purchase management (users can purchase courses)
- JWT-based authentication for secure access

## Technologies Used
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT)
- Zod for input validation
- Bcrypt for password hashing
- dotenv for environment variable management

## Configure environment variables
Create a `.env` file in the root directory with the following variables:
```env
JWT_ADMIN_PASSWORD=your_admin_jwt_secret
JWT_USER_PASSWORD=your_user_jwt_secret
connection=your_mongodb_connection_string
```


## 📡 API Endpoints

### User Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/user/signup` | Register a new user |
| POST | `/api/v1/user/signin` | Authenticate existing user |
| GET | `/api/v1/user/purchases` | Get user's purchased courses |

### Admin Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/admin/signup` | Create admin account |
| POST | `/api/v1/admin/signin` | Authenticate admin |
| POST | `/api/v1/admin/course` | Create new course |
| PUT | `/api/v1/admin/course` | Update existing course |
| GET | `/api/v1/admin/course/bulk` | List all admin's courses |

### Course Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/course/purchase` | Purchase a course |
| GET | `/api/v1/course/preview` | List available courses |


## 🤝 Contributing

We welcome contributions!

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

