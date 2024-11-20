# 9ja Market API

The **9ja Market API** is a comprehensive backend solution designed to facilitate the operations of an online marketplace. This project aims to provide a robust, scalable, and secure platform for managing various aspects of an e-commerce system, including customer authentication, market management, product listings, order processing, and transaction handling.

## Project Idea

The primary goal of the 9ja Market API is to create a seamless and efficient online marketplace experience for both customers and market administrators. The API is designed to handle high traffic, ensure data security, and provide a user-friendly interface for managing marketplace operations.

### Key Objectives
- **Secure Authentication**: Implementing secure authentication mechanisms to protect user data.
- **Scalability**: Ensuring the system can handle a growing number of users and transactions.
- **Modularity**: Designing the system in a modular way for easy maintenance and feature expansion.
- **Efficiency**: Optimizing performance to provide a fast and responsive user experience.

## Technologies Used
- **Node.js**: Primary runtime environment for executing JavaScript server-side.
- **Express.js**: Web application framework for building RESTful APIs.
- **TypeScript**: Statically typed superset of JavaScript that enhances code quality.
- **Prisma**: ORM (Object-Relational Mapping) tool for database management.
- **JWT (JSON Web Tokens)**: Secure token-based authentication.
- **Bcrypt**: For secure password hashing.
- **EventEmitter**: For handling asynchronous events.
- **Winston**: A logging library for managing logs.
- **Postman**: For API testing and documentation.

## Features

- **Customer Authentication**
  - Secure login with JWT token generation.
  - New customer registration with email verification.
  - Password reset functionality via email.
  
- **Market Management**
  - Registering new markets with necessary details.
  - Secure login and token management for market administrators.
  
- **Product Management**
  - Adding, updating, and deleting products.
  - Searching for products based on various criteria.
  
- **Order Processing**
  - Creating and managing new orders.
  
- **Transaction Handling**
  - Secure payment processing and transaction history management.

## How We Achieved These Features

- **Secure Authentication**
  - Utilized Bcrypt for password hashing and JWT for secure token management.
  - Integrated an email service for sending verification and password reset emails.

- **Market Management**
  - Managed database operations with Prisma ORM and validated requests using Express middleware.
  
- **Product Management**
  - Handled product-related API endpoints with Express routes and ensured data validation.
  
- **Order Processing**
  - Managed order-related database operations and ensured secure transaction handling.
  
- **Transaction Handling**
  - Integrated with external payment gateways and ensured secure storage of transaction data.

## Documentation

For detailed API documentation, including endpoints and request/response formats, please refer to the links below 
  -[Customer Authentication Collection](https://documenter.getpostman.com/view/27498181/2sAXjT1pjy).
  -[Market Authentication Collection](https://documenter.getpostman.com/view/27498181/2sAXjT1pjz).
  -[User Service Collection](https://documenter.getpostman.com/view/27498181/2sAXqm9jKu).

## Conclusion

The 9ja Market API showcases a solid understanding of backend development principles, robust security measures, and efficient data handling practices. This project not only enhances my technical skills but also demonstrates my ability to communicate effectively through well-structured documentation.

---

Feel free to explore the code, and if you have any questions, don’t hesitate to reach out!
