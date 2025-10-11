# User Product Portal Backend

This is the backend for the User Product Portal project, which provides a RESTful API for managing users, products, and categories. The backend is built using Node.js and Express.

## Features

- User Management
  - Create, read, update, and delete users
  - User authentication with token-based authorization

- Product Management
  - Create, read, update, and delete products
  - Products associated with categories

- Category Management
  - Create, read, update, and delete categories

## Project Structure

```
backend
├── src
│   ├── controllers          # Contains controller files for handling requests
│   │   ├── user.controller.ts
│   │   ├── product.controller.ts
│   │   └── category.controller.ts
│   ├── models               # Contains model files defining data schemas
│   │   ├── user.model.ts
│   │   ├── product.model.ts
│   │   └── category.model.ts
│   ├── routes               # Contains route files for API endpoints
│   │   ├── user.routes.ts
│   │   ├── product.routes.ts
│   │   └── category.routes.ts
│   ├── middleware           # Contains middleware for request handling
│   │   └── auth.middleware.ts
│   ├── services             # Contains service files for business logic
│   │   ├── user.service.ts
│   │   ├── product.service.ts
│   │   └── category.service.ts
│   └── app.ts               # Entry point of the application
├── package.json             # NPM configuration file
└── README.md                # Documentation for the backend
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the backend directory:
   ```
   cd user-product-portal/backend
   ```

3. Install dependencies:
   ```
   npm install
   ```

## Running the Application

To start the backend server, run:
```
npm start
```

The server will run on `http://localhost:3000` by default.

## API Documentation

The API endpoints are protected and require a valid authorization token for access. Please refer to the individual controller files for detailed information on available endpoints and their usage.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.