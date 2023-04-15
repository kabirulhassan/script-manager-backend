# Backend Node.js Script-management App
This is a Node.js app that allows users to manage scripts. It provides the following routes:

## Scripts Routes
GET /api/scripts: Retrieve all scripts
POST /api/scripts: Create a new script
GET /api/scripts:id: Retrieve a specific script by ID
PUT /api/scripts:id: Update a specific script by ID
DELETE /api/scripts:id: Delete a specific script by ID
`These are authenticated routes and require a token`
## Authentication Routes
POST /api/users/register: Register a new user
POST /api/users/login: Login a user
GET /api/users/current: Retrieve the currently logged-in user (protected route)

## Authentication
Authentication is required for the /current route and the script routes. The auth middleware is used to protect this route, ensuring that only authenticated users can access.

## Usage
Install dependencies: `npm install`
Start the app: `npm start`
Access the app via a web browser or API client
Register a new user using the /register route
Login with the registered user using the /login route to obtain an authentication token
Include the authentication token in the request headers for protected routes, such as /current
Use the available routes to manage scripts, including creating, retrieving, updating, and deleting scripts

