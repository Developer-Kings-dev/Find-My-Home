# Find-My-Home
## Find My Home API
Find My Home API is a comprehensive backend service for managing properties, users, bookings, and images for an accommodation platform. It supports CRUD operations for properties, users, and bookings, along with user authentication and image uploads. The API is secured using JWT tokens for authentication, and property images are handled via Firebase for storage. The project is containerized using Docker for easier deployment and management.

## Features
User Management: User registration, login, profile updates, and deletion. <br>
Property Management: Create, update, view, and delete property listings with details like title, description, price, location, and images.<br>
Booking Management: Book properties for specific time periods and manage bookings.<br>
Image Uploads: Support for uploading and managing property images via Firebase.<br>
Authentication: JWT-based authentication ensures secure access to the API endpoints.<br>

## Technology Stack
Node.js: Backend runtime environment.<br>
Express: Web framework for building API routes.<br>
MongoDB: NoSQL database for persisting data related to users, properties, and bookings.<br>
Firebase: Used for storing and retrieving property images.<br>
JWT (jsonwebtoken): For authentication and secure access to protected routes.<br>
Mongoose: MongoDB object modeling for Node.js.<br>
Docker: Used for containerizing the application to streamline deployment and scaling.<br>

## API Endpoints
### Auth Endpoints
POST /api/auth/login - Logs in an existing user and generates a JWT token.<br>
POST /api/auth/register - Registers a new user with details like name, email, phone number, and password.<br>

### User Endpoints
PUT /api/users - Updates the currently logged-in user’s details, such as name, email, and password.<br>
DELETE /api/users/:id - Deletes a user account by their ID. Requires authentication.<br>

### Property Endpoints
POST /api/properties - Creates a new property listing with attributes like title, description, price, location, and images. Requires authentication.<br>
GET /api/properties - Retrieves all property listings available in the system.<br>
GET /api/properties/:id - Retrieves a specific property by its ID.<br>
PUT /api/properties/:id - Updates a property’s details. Requires authentication.<br>
DELETE /api/properties/:id - Deletes a property listing by its ID. Requires authentication.<br>

### Booking Endpoints
POST /api/bookings - Books a property for a specific date range. Requires authentication.<br>
GET /api/bookings/my-bookings - Retrieves all bookings made by the currently authenticated user.<br>

## Docker Setup
The API is fully containerized using Docker, allowing for easy deployment in any environment.

### Docker Commands:
Build the Docker Image:<br>
Copy code;<br>
docker build -t accommodation-app .<br>

Run the Docker Container:<br>
Copy code;<br>
docker run -d -p 5000:5000 accommodation-app<br>

This will start the server and make the API available at http://localhost:5000.<br>

Docker Compose:<br>
A docker-compose.yml file can be used to define the services and manage multi-container setups (e.g., if you're also running MongoDB as a separate container).<br>

yaml<br>
Copy code<br>
version: '3' <br>
services: <br>
  api: <br>
    build: . <br>
    ports: <br>
      - "5000:5000"   <br>
      
    environment:
      - MONGO_URI=mongodb://mongo:27017/accommodation-app
      - JWT_SECRET=your_jwt_secret
      - FIREBASE_PROJECT_ID=your_firebase_project_id
      - FIREBASE_PRIVATE_KEY=your_firebase_private_key
      - FIREBASE_CLIENT_EMAIL=your_firebase_client_email
  mongo: <br>
    image: mongo <br>
    ports: <br>
      - "27017:27017" <br>
      
### Environment Variables:
- Create a .env file in the root directory and configure the following variables:
- Copy code;
- DB_URI=mongodb://localhost:27017/accommodation-app
- JWT_SECRET=your_jwt_secret
- FIREBASE_PROJECT_ID=your_firebase_project_id
- FIREBASE_PRIVATE_KEY=your_firebase_private_key
- FIREBASE_CLIENT_EMAIL=your_firebase_client_email

### Setup and Installation
- Clone the repository:
- Copy code;
- git clone https://github.com/yourusername/accommodation-app-backend.git

- Install dependencies:
- Copy code;
- npm install

- Set up environment variables in the .env file as described above.

- Run the server locally:
- Copy code;
- npm run dev

- The API will be available at http://localhost:5000.

- Run with Docker:
- Copy code;
- docker-compose up

## Dependencies
- express: Web framework for Node.js.
- jsonwebtoken: For generating and verifying JWT tokens.
- mongoose: MongoDB object modeling.
- firebase-admin: For integrating Firebase storage.
- bcrypt: For securely hashing passwords.
- dotenv: For managing environment variables.
- multer: For handling file uploads.
- express-async-handler: Simplifies async error handling in Express.

### API Testing with Postman or Insomnia
You can import the provided Insomnia workspace or Postman collection to test the API directly.
Use the JWT token obtained from the login request to authenticate protected routes like creating or managing properties.

## License
This project is licensed under the MIT License.

