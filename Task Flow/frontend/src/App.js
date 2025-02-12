"use client";

import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Loader from "./components/Loader";
import TaskList from "./components/TaskList";
import TaskFlow from "./components/TaskFlow";
import { get, post, put, delet } from "./services/ApiEndpoint";

const theme = createTheme({
  palette: {
    white: {
      main: "#FFFFFF",
    },
  },
});

const customScrollbarStyles = {
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "black",
  },
  scrollbarWidth: "thin",
  scrollbarColor: "black transparent",
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const showSnackbar = (message, severity = "error") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const addTask = async (newTask) => {
    try {
      setLoading(true);
      await post("/tasks", { title: newTask });
      fetchTasks();
    } catch (error) {
      showSnackbar("Internal server error, try again!");
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await get("/tasks");
      setTasks(response.data.data);
    } catch (error) {
      showSnackbar("Internal server error, try again!");
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id, newTask) => {
    try {
      setLoading(true);
      await put(`/tasks/${id}`, { title: newTask });
      fetchTasks();
    } catch (error) {
      setLoading(false);
      if (error.status === 403) {
        showSnackbar("Task title required!");
      } else if (error.status === 404) {
        showSnackbar("Task not found!");
      } else {
        showSnackbar("Internal server error, try again!");
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      setLoading(true);
      await delet(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      setLoading(false);
      if (error.status === 404) {
        showSnackbar("Task not found!");
      } else {
        showSnackbar("Internal server error, try again!");
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: { md: "100vh" },
          bgcolor: "#f5f5f5",
          pb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              textAlign: "center",
              py: 2,
              fontWeight: "bold",
            }}
          >
            Task Flow Manager
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                height: { md: "calc(100vh - 150px)" },
                ...customScrollbarStyles,
              }}
            >
              <TaskList
                tasks={tasks}
                addTask={addTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            </Box>
            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                height: { xs: "500px", md: "calc(100vh - 150px)" },
                bgcolor: "white",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "grey.200",
                overflow: "hidden",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
              }}
            >
              <TaskFlow tasks={tasks} />
            </Box>
          </Box>
        </Container>
      </Box>
      {loading && <Loader />}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
