# Task Flow Manager

## Description

Task Flow Manager is a full-stack MERN application designed to manage tasks efficiently. It allows users to create, read, update, and delete tasks, represented visually using React Flow as nodes in a flowchart. The frontend is built using React.js and Material-UI, while the backend uses Express.js with a MongoDB database for storing tasks.

This project was developed as part of the following requirements:

- **Frontend**: A React.js application using Material-UI for displaying tasks and React Flow for visual representation.
- **Backend**: A REST API with CRUD operations for managing tasks stored in MongoDB.

---

## Features

### Frontend

- **Display Task List**: View a list of tasks with options to add, edit, and delete.
- **Add New Task**: Dynamically add new tasks.
- **Edit Task**: Update existing tasks.
- **Delete Task**: Remove tasks from the list.
- **Task Flow Visualization**: Represents tasks as nodes in a flowchart using React Flow.
- **Responsive Design**: Optimized for different screen sizes with Material-UI components.
- **Snackbar Notifications**: Alerts for success and error messages.
- **Loading Indicator**: Loader component for a better user experience.

### Backend

- **CRUD Operations**: Create, Read, Update, and Delete tasks.
- **RESTful API Design**: Organized and modular routes for managing tasks.
- **MongoDB Integration**: Stores tasks efficiently using Mongoose.
- **Error Handling**: Proper error messages for various scenarios.

---

## Tech Stack

### Frontend

- **React.js**: Frontend framework for building UI components.
- **Material-UI**: UI component library for styling.
- **React Flow**: For representing tasks as nodes in a flowchart.
- **Axios**: For making API requests.

### Backend

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing tasks.
- **Mongoose**: ODM for MongoDB.

---

## Folder Structure

```
Task-Flow-Manager/
│
├── backend/
│   ├── controllers/
│   │   └── task.js          # Task controller (CRUD operations)
│   ├── models/
│   │   └── task.js          # Mongoose schema for tasks
│   ├── routes/
│   │   └── task.js          # API routes for tasks
│   └── server.js            # Express server setup
│
└── frontend/
    ├── public/
    └── src/
        ├── components/
        │   ├── Loader.js    # Loading spinner
        │   ├── TaskFlow.js  # Flowchart representation of tasks
        │   └── TaskList.js  # Task list with add, edit, and delete features
        ├── services/
        │   └── ApiEndpoint.js  # API service functions (get, post, put, delete)
        └── App.js           # Main React component
```

---

## Installation & Setup

### Prerequisites

- **Node.js** (v14 or later)
- **MongoDB** (Local or Atlas)

### 1. Backend Setup

```bash
npm install
```

- **Create a `.env` file** in the `backend` directory with the following:

```env
 PORT=3005
    CONNECTION_STRING=MongoDB_Connection_String
    CORS_ORIGIN_URL=Frontend_URL
```

- **Start the Backend Server**

```bash
npm start
```

This starts the backend server at `http://localhost:3005`.

### 2. Frontend Setup

```bash
npm install
```

- **Start the Frontend Development Server**

```bash
npm start
```

This starts the frontend server at `http://localhost:3000`.

---

## API Endpoints

### Base URL: `http://localhost:5000/tasks`

| Method | Endpoint | Description                   |
| ------ | -------- | ----------------------------- |
| GET    | `/`      | Get all tasks                 |
| POST   | `/`      | Create a new task             |
| PUT    | `/:id`   | Update an existing task by ID |
| DELETE | `/:id`   | Delete a task by ID           |

## Future Enhancements

- **User Authentication**: Role-based access control.
- **Drag and Drop**: Improve React Flow with draggable nodes.
- **Task Dependencies**: Represent dependencies in the flowchart.
- **Enhanced Styling**: More advanced UI/UX features.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`feature/your-feature-name`).
3. Commit your changes.
4. Push to your fork.
5. Open a pull request.

---

## License

This project is licensed under the MIT License.

---

## Contact

For any queries or issues, feel free to reach out:

- **Author**: Kshitij Agrawal
- **Email**: akshitij70@gmail.com

---

## Acknowledgements

- **React** for the frontend framework.
- **Material-UI** for UI components.
- **React Flow** for flowchart visualization.
- **Express.js** and **MongoDB** for the backend architecture.
