### Pastebin Project
A pastebin platform where users can create, delete, and manage pastes with features for user authentication, profile management, and paste expiration. This project is built with a microservices architecture using TypeScript, Express, TypeORM, Redis, and Google Cloud Storage.

## The pastebin system is designed with a microservices architecture, comprising the following independent services:
- User Service: Manages user registration, login, and profile data.
- Paste Service: Handles paste creation, deletion, expiration, and retrieval.
- Hash Service: Generates and manages unique hash IDs for pastes stored in Redis for rapid retrieval.

Each service operates independently, with APIs hosted on different ports (e.g., localhost:3000 for user service, localhost:3001 for paste service, etc.). The architecture ensures scalability, flexibility, and ease of maintenance, with Redis and PostgreSQL as the primary data storage solutions for different types of data.

## Design Patterns
The project incorporates several design patterns to improve modularity, maintainability, and functionality.
- Command Pattern: Used for handling paste deletion and undo functionality. Commands are stored in a command queue, allowing easy reversion (undo) of delete operations if needed.
- Observer Pattern: Integrated with Redis to observe real-time changes in paste data, such as deletion and expiration. This enables real-time updates on the frontend.
- Factory Pattern: Applied in creating instances of different paste types, allowing flexibility for extending the paste model if needed (e.g., private vs. public pastes).
- Builder Pattern: Facilitates constructing complex paste objects step-by-step, ensuring all required properties are set during creation.
- Facade Pattern: Provides a simplified interface to interact with the Redis service, handling paste data and expiration management.
- Adapter Pattern: Adapts Google Cloud Storage operations for consistent storage functionality, allowing the pastebin system to interact with cloud storage seamlessly.

## Usage Instructions
Clone the Repository:

```
git clone https://github.com/yourusername/pastebin-project.git
cd pastebin-project
```

Install Dependencies:

Run npm install in each service directory (user-service, paste-service, hash-service, and in backend folder).
```
npm install
```

Set Up Environment Variables:

Configure environment variables for each service, including database credentials, Redis connection details, and Google Cloud Storage credentials.

Start Services:

Use npm start in backend folder.

Access the Frontend:

Run npm start in the frontend directory to start the React application and visit http://localhost:8000 in your browser.

## Assumptions and Limitations
# Assumptions:

Only unexpired pastes are displayed by default on the public pastes page.
Users can undo a paste deletion within 5 minutes. After that, the paste is permanently removed.

#  Limitations:

Syntax highlighting is not implemented on the PastesPage component.
The system relies on Redis for managing temporary deletion states; if Redis goes down, this functionality may be affected.

## Overall Clarity and Completeness
This project is designed with a modular, scalable approach to handle paste creation and management effectively. By employing various design patterns and microservices, the project is built for long-term maintainability and extensibility.

