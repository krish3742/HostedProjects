# Task Flow Manager Backend

This is the backend for a Task Flow Manager application, built with Node.js, Express, and MongoDB. It provides APIs for managing tasks.

## Features

- **Task Management**: Create, read, update, and delete tasks.
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
   ```

3. Start the server:

   ```bash
   npm start
   ```

## API Endpoints

### Tasks

- **GET** `/api/tasks` - Get all tasks
- **POST** `/api/tasks` - Create a new task
- **PUT** `/api/tasks/:id` - Update a task by ID
- **DELETE** `/api/tasks/:id` - Delete a task by ID

## License

This project is open-source and available under the [MIT License](LICENSE).
