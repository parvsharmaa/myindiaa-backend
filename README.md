# MyIndiaa Backend

This project is a backend service for MyIndiaa, an e-commerce platform. It is built using Node.js and Express, and includes various features such as authentication, product management, cart management, order processing, and payment handling. It also includes integrations for logistics providers and domain registration.

## Features

### Data Validation and Error Handling

    Middleware to validate incoming data and handle errors gracefully.

### Mock APIs for Logistics Providers and Domain Registration

    Routes for mock logistics and domain registration services.

### Security

    Implement SSL/TLS for secure communication.
    Use helmet for setting various HTTP headers for app security.
    Apply security best practices such as input validation and rate limiting.

### Scalability and Performance Optimization

    Designed to handle a high volume of requests.
    Optimized database queries and API performance.

### Installation

    Clone the repository:

        ``` git clone https://github.com/your-repo/myindiaa-backend.git ```

    Navigate to the project directory:

        ```cd myindiaa-backend```

    Install dependencies:

        ```npm install```

    Set up environment variables:

        Create a .env file in the root directory and add the following environment variables:

        ```
        PORT=5001
        MONGO_URI=your_mongo_uri
        JWT_SECRET=your_jwt_secret
        ```

    SSL Certificates:
        Place your SSL certificates in the cert directory:

        key.pem
        cert.pem

    Running the Application
        Start the server:

        ```npm run start```
        The server will start on https://localhost:5001.

### Project Structure

    myindiaa-backend/
    │
    ├── cert/                       # SSL certificates
    │   ├── cert.pem
    │   ├── csr.pem
    │   └── key.pem
    │
    ├── config/                     # Configuration files
    │   └── db.js                   # Database connection
    │
    ├── controllers/                # Controllers for handling requests
    │   ├── adminOrder.controller.js
    │   ├── auth.controller.js
    │   ├── cart.controller.js
    │   ├── cartItem.controller.js
    │   ├── order.controller.js
    │   ├── payment.controller.js
    │   ├── product.controller.js
    │   ├── rating.controller.js
    │   ├── review.controller.js
    │   └── user.controller.js
    │
    ├── middlewares/                # Custom middleware
    │   ├── auth.middleware.js
    │   └── validation.js           # Data validation
    │
    ├── models/                     # Mongoose models
    │   ├── address.model.js
    │   ├── cartItem.model.js
    │   ├── category.model.js
    │   ├── order.model.js
    │   ├── payment.model.js
    │   ├── product.model.js
    │   ├── rating.model.js
    │   ├── review.model.js
    │   └── user.model.js
    │
    ├── routes/                     # Routes for different endpoints
    │   ├── adminOrder.route.js
    │   ├── adminProduct.route.js
    │   ├── auth.route.js
    │   ├── cart.route.js
    │   ├── cartItem.route.js
    │   ├── domain.route.js         # Mock domain registration
    │   ├── logistics.route.js      # Mock logistics
    │   ├── order.route.js
    │   ├── payment.route.js
    │   ├── product.route.js
    │   ├── rating.route.js
    │   ├── review.route.js
    │   └── user.route.js
    │
    ├── services/                   # Service layer for business logic
    │   ├── cart.service.js
    │   ├── cartItem.service.js
    │   ├── order.service.js
    │   ├── payment.service.js
    │   ├── product.service.js
    │   ├── rating.service.js
    │   ├── review.service.js
    │   └── user.service.js
    │
    ├── .env                        # Environment variables
    ├── .gitignore                  # Git ignore file
    ├── package-lock.json           # Package lock file
    ├── package.json                # Package file
    └── src/
        └── server.js               # Entry point of the application

### Routes

    Auth

    POST /api/auth/register - Register a new user
    POST /api/auth/login - Login a user

    User

    GET /api/users - Get all users
    GET /api/users/:id - Get a user by ID
    PUT /api/users/:id - Update a user
    DELETE /api/users/:id - Delete a user

    Products

    GET /api/products - Get all products
    GET /api/products/:id - Get a product by ID
    POST /api/products - Create a new product
    PUT /api/products/:id - Update a product
    DELETE /api/products/:id - Delete a product

    Cart

    GET /api/cart - Get the cart for the authenticated user
    POST /api/cart - Add an item to the cart
    PUT /api/cart/:id - Update a cart item
    DELETE /api/cart/:id - Remove a cart item

    Orders

    GET /api/orders - Get all orders for the authenticated user
    POST /api/orders - Create a new order
    GET /api/orders/:id - Get an order by ID
    PUT /api/orders/:id - Update an order
    DELETE /api/orders/:id - Cancel an order

    Payments

    POST /api/payments - Process a payment

    Reviews
    
    GET /api/reviews - Get all reviews
    POST /api/reviews - Add a new review

    Ratings

    GET /api/ratings - Get all ratings
    POST /api/ratings - Add a new rating

    Admin

    GET /api/admin/orders - Get all orders (admin)
    GET /api/admin/products - Get all products (admin)

    Mock APIs

    POST /api/logistics - Mock logistics provider
    POST /api/domains - Mock domain registration

    Middleware

    Validation Middleware: Validates incoming data for various routes.
    Authentication Middleware: Ensures routes are accessed by authenticated users.

    Security

    SSL/TLS: Secured communication using SSL/TLS.
    Helmet: Helps secure Express apps by setting various HTTP headers.
    Rate Limiting: Limits the number of requests from a single IP address.
    Scalability
    Optimized database queries and API performance to handle a high volume of requests.
    Development
    To run the application in development mode:

    ```npm run dev```
    This will start the server with nodemon, which watches for file changes and restarts the server automatically.