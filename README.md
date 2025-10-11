# User Product Portal

## Overview
The User Product Portal is a web application designed for user management and product management, featuring a structured approach to handle users and products categorized into specific categories. This project utilizes Angular 16 for the frontend and Node.js for the backend, ensuring a modern and efficient development experience.

## Project Structure
The project is organized into two main directories: `backend` and `frontend`.

### Backend
The backend is built using Node.js and Express. It includes the following components:
- **Controllers**: Handle the business logic for users, products, and categories.
- **Models**: Define the data structure for users, products, and categories.
- **Routes**: Define the API endpoints for user, product, and category management.
- **Middleware**: Implement authentication and authorization checks.
- **Services**: Contain the business logic for interacting with the models.

### Frontend
The frontend is developed using Angular 16 and utilizes the CoreUI Angular Admin Template. It includes:
- **Core Services**: Services for user, product, and category management.
- **Interceptors**: Handle HTTP requests and attach authorization tokens.
- **Shared Components**: Reusable components for displaying lists of users, products, and categories.
- **Features**: Dedicated directories for user management, product management, and category management.

## Features
- User management with functionalities to create, read, update, and delete users.
- Product management with functionalities to create, read, update, and delete products.
- Category management for organizing products into specific categories.
- Secure API with token-based authentication and protected routes.
- Responsive and modern UI using CoreUI Angular Admin Template.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- Angular CLI (version 16 or higher)
- MongoDB (or any other database of your choice)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd user-product-portal
   ```

2. Set up the backend:
   - Navigate to the `backend` directory:
     ```
     cd backend
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Start the backend server:
     ```
     npm start
     ```

3. Set up the frontend:
   - Navigate to the `frontend` directory:
     ```
     cd ../frontend
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Start the Angular application:
     ```
     ng serve
     ```

## API Documentation
Refer to the backend `README.md` for detailed API documentation, including endpoints, request/response formats, and authentication methods.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.