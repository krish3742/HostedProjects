# Branch Manager Backend

This is the backend for a Branch Manager application, built with Node.js, Express, and MongoDB. It provides APIs for managing branchs.

## Features

- **Branch Management**: Create, read, update, and delete tasks.
- **Error Handling**: Proper error responses for API failures.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables:

   Create a `.env` file in the root directory and configure the following:

   ```env
    PORT=PORT_NO
    CONNECTION_STRING=MongoDB_Connection_String
    CORS_ORIGIN_URL=Frontend_URL
   SECRET_KEY=KEY
   CLOUDINARY_CLOUD_NAME=Cloud_Name
   CLOUDINARY_API_KEY=API_Key
   CLOUDINARY_API_SECRET=API_Secret
   ```

3. Start the server:

   ```bash
   npm start
   ```

## API Endpoints

### Tasks

- **GET** `/api/getAllBranches` - Get all tasks
- **POST** `/api/createBranch` - Create a new Branch
- **PUT** `/api/updateBranch/:id` - Update a Branch by ID
- **DELETE** `/api/deleteBranch/:id` - Delete a Branch by ID

### Authentication

- **POST** `/auth/register` - Register User
- **POST** `/auth/login` - Login User

## License

This project is open-source and available under the [MIT License](LICENSE).
