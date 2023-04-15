# Backend Node.js Script-management App
This is a Node.js app that allows users to manage scripts. It provides the following routes:

## Scripts Routes
GET /api/scripts : Retrieve all scripts<br/>
POST /api/scripts : Create a new script<br/>
GET /api/scripts:id : Retrieve a specific script by ID<br/>
PUT /api/scripts:id : Update a specific script by ID<br/>
DELETE /api/scripts:id : Delete a specific script by ID<br/>
`These are authenticated routes and require a token`
## Authentication Routes
POST /api/users/register: Register a new user<br/>
POST /api/users/login: Login a user<br/>
GET /api/users/current: Retrieve the currently logged-in user (protected route)<br/>

## Authentication
Authentication is required for the /current route and the script routes. The auth middleware is used to protect this route, ensuring that only authenticated users can access.

## Usage
Install dependencies: `npm install`<br/>
Start the app: `npm start`<br/>
Access the app via a web browser or API client<br/>
Register a new user using the /register route<br/>
Login with the registered user using the /login route to obtain an authentication token<br/>
Include the authentication token in the request headers for protected routes, such as /current<br/>
Use the available routes to manage scripts, including creating, retrieving, updating, and deleting scripts<br/>

