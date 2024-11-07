# Pastebin Project
A pastebin platform where users can create, delete, and manage pastes with features for user authentication, password request-reset functionality, and paste expiration. This project is built with a microservices architecture using NodeJS, Express, TypeScript, TypeORM, Redis, and Google Cloud Storage, React.

## Tree of the project

Hash-service, src directory tree.
```bash
├── config
│   └── data-source.ts
├── controller
│   ├── delete-hash.ts
│   ├── generate-hash.ts
│   ├── getHash.ts
│   └── getPasteid.ts
├── entity
│   └── hash-entity.ts
├── index.ts
├── migrations
│   ├── 1725200003903-inital-hashdb.ts
│   └── 1725209386811-update-hashdb.ts
├── routes
│   └── hash-route.ts
├── server.ts
└── services
    ├── hashCommandFactory.ts
    └── hashFacade.ts
```

Paste-crud-service, src directory tree.
```bash
├── config
│   ├── data-source.ts
│   ├── service-gaccount.json
│   └── types.d.ts
├── controller
│   ├── cloud-management
│   │   ├── cloudDelete.ts
│   │   ├── cloudDownload.ts
│   │   └── cloudUpload.ts
│   └── paste-management
│       ├── getAllPastes.ts
│       ├── getDeleted.ts
│       ├── getPaste.ts
│       ├── getPasteByUser.ts
│       ├── pasteCreateController.ts
│       ├── pasteDeleteController.ts
│       └── undoDeleteController.ts
├── entity
│   ├── pastedata.ts
│   └── user.ts
├── index.ts
├── middleware
│   └── authMiddleware.ts
├── migrations
│   ├── 1724937716133-initial_metadb.ts
│   ├── 1725212048773-update-pastedata.ts
│   └── 1730033685695-updatePastedata.ts
├── routes
│   └── paste-manager.ts
├── server.ts
└── services
    ├── cloudServiceAdapter.ts
    ├── commands
    │   ├── deletePasteCommand.ts
    │   ├── forHashCommands
    │   │   ├── getHashCommand.ts
    │   │   ├── hashDelete.ts
    │   │   ├── hashGeneratorCommand.ts
    │   │   └── hashGetPasteIdCommand.ts
    │   ├── getAllPasteCommand.ts
    │   ├── getPasteByUserCommand.ts
    │   ├── getPasteCommand.ts
    │   ├── requestUserCommand.ts
    │   └── savePasteCommand.ts
    ├── paste-data-builder.ts
    ├── pasteFacade.ts
    ├── pasteFactory.ts
    ├── redisService.ts
    └── validation
        └── pasteExists.ts
```

User-service, src directory tree.
```bash
├── config
│   └── data-source.ts
├── controller
│   ├── auth
│   │   ├── check.ts
│   │   ├── login.ts
│   │   ├── logout.ts
│   │   └── signup.ts
│   └── profile-management
│       ├── request-reset.ts
│       └── reset-password.ts
├── entity
│   └── user.ts
├── index.ts
├── migrations
│   └── 1724937716133-initial_metadb.ts
├── routes
│   ├── auth.ts
│   └── profile-management.ts
├── server.ts
└── service
    ├── emailService
    │   ├── emailFacade.ts
    │   ├── emailFactory.ts
    │   └── emailService.ts
    ├── hashPassword.ts
    ├── redisObserver.ts
    ├── redisService.ts
    ├── savingDB.ts
    └── validation
        ├── emailExists.ts
        ├── invalid.ts
        ├── passwordCheck.ts
        └── userExists.ts
```

### The pastebin system is designed with a microservices architecture, comprising the following independent services:
- User Service: Manages user registration, login, authentication and password request-reset logic with Redis implementation.
- Paste Service: Handles paste creation, expiration, retrieval and deletion, undo deletion logic with Redis implementation.
- Hash Service: Generates and manages unique hash IDs for pastes stored in own database. 

Each service operates independently, with APIs hosted on different ports (e.g., localhost:3000 for user service, localhost:3001 for paste service, etc.). The architecture ensures scalability, flexibility, and ease of maintenance, with Redis and PostgreSQL as the primary data storage solutions for different types of data.

### Design Patterns
The project incorporates several design patterns to improve modularity, maintainability, and functionality.

- Command Pattern: Used for handling paste deletion and undo functionality. Commands are stored in a command queue, allowing easy reversion (undo) of delete operations if needed, also for complete deletion. Command Patterns are also used as dividing big problems into small highly specialized functionalities, so each of them, have their own job to do.
- Observer Pattern: Integrated with Redis to observe real-time changes in paste data, such as deletion and expiration. This enables real-time updates on the frontend. Also, used for notify users about successfully updated password. 
- Factory Pattern: The ServiceFactory class is used to create instances of cloud storage adapters. By encapsulating the instantiation process, it provides a centralized method to return a CloudStorageAdapter instance, specifically a GoogleCloudStorageAdapter. This pattern allows flexibility to switch or extend cloud storage providers without modifying the main code, enhancing modularity and maintainability.
- Builder Pattern: Facilitates constructing complex paste objects step-by-step, ensuring all required properties are set during creation.
- Facade Pattern: The PasteFacade class serves as a centralized interface to simplify and unify interactions with multiple complex subsystems involved in paste creation, retrieval, and deletion. The facade orchestrates a series of operations across commands, cloud storage adapters, and data builders, streamlining access to core functionalities:

    1. createPaste: Combines content upload, paste object creation using the Builder pattern, database saving, and hash generation into a single method.
    2. getPaste: Retrieves paste details, downloads content from cloud storage, and fetches user information, returning a combined response.
    3. getAllPastes: Uses multiple commands to fetch all pastes and their related data in a single call, 4. 4/ abstracting the underlying complexities.
    4. getPasteByUser: Fetches pastes by a specific user, combining paste data, content, and hash information.
    5. deletePaste and undoDelete: Provides a simple interface for deleting and undoing deletion, delegating complex validation and command execution.

This pattern simplifies client-side interaction with the pastebin system, promoting modularity and ease of use while reducing the need to interact with each subsystem directly.

- Adapter Pattern: Adapts Google Cloud Storage operations for consistent storage functionality, allowing the pastebin system to interact with cloud storage seamlessly.

### UML Diagrams:

The following diagrams provide a high-level view of the design patterns used in the pastebin project and how they interact:

1. Factory Pattern:

    - ServiceFactory -> createCloudStorageAdapter() -> CloudStorageAdapter
    - ServiceFactory creates and returns a GoogleCloudStorageAdapter instance as a CloudStorageAdapter.

2. Facade Pattern:

    - PasteFacade
        - -> CloudStorageAdapter
        - -> SavePasteCommand
        - -> PasteHashCommand
        - -> GetPasteCommand
        - -> GetPasteIdCommand
        - -> DeletePasteCommand
        - -> getUserCommand
        - -> getAllPastesCommand

    - PasteFacade coordinates interactions among these commands and the CloudStorageAdapter, providing a unified interface to manage paste data.

4. Builder Pattern:

    - PastedataBuilder -> build() -> Paste
    - PastedataBuilder constructs a Paste object step-by-step, used by PasteFacade during paste creation.

5. Command Pattern:

    - SavePasteCommand, DeletePasteCommand, GetPasteCommand, etc.
    - Each command encapsulates a specific operation, enabling modular and reversible actions, e.g., SavePasteCommand -> execute() to save a paste.

6. Observer Pattern:

    - Redis -> observes changes in paste data
    - Allows the frontend to react to paste expiration or deletion in real time.

7. Adapter Pattern:

    - GoogleCloudStorageAdapter -> adapts to CloudStorageAdapter
    - GoogleCloudStorageAdapter provides compatibility with the CloudStorageAdapter interface, making Google Cloud functions accessible in a standardized way.

### Usage Instructions
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

Configure environment variables for each service, including database credentials, Redis connection details, and Google Cloud Storage credentials with create bucket in Google Cloud Console.

Start Services:

Use npm start in backend folder.

Access the Frontend:

Run npm start in the frontend directory to start the React application and visit http://localhost:8000 in your browser.

### Assumptions and Limitations

#### Assumptions:

Only unexpired pastes are displayed by default on the public pastes page.
Users can undo a paste deletion within 5 minutes. After that, the paste is permanently removed.

####  Limitations:

Syntax highlighting is not implemented on the PastesPage component.
The system relies on Redis for managing temporary deletion states; if Redis goes down, this functionality may be affected.

#### Overall Clarity and Completeness
This project is designed with a modular, scalable approach to handle paste creation and management effectively. By employing various design patterns and microservices, the project is built for long-term maintainability and extensibility.

