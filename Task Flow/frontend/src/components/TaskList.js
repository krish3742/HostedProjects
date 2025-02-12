"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";

function TaskList({ tasks, addTask, updateTask, deleteTask }) {
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      if (editingTask) {
        updateTask(editingTask._id, newTask.trim());
        setEditingTask(null);
      } else {
        addTask(newTask.trim());
      }
      setNewTask("");
    }
  };

  const handleUpdateClick = (task) => {
    setNewTask(task.title);
    setEditingTask(task);
  };

  const handleDeleteClick = (id) => {
    deleteTask(id);
  };

  return (
    <Paper
      elevation={1}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "white",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box sx={{ p: 3, pb: 0 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {editingTask ? "Edit Task" : "Add New Task"}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            gap: 1,
            mb: 3,
          }}
        >
          <TextField
            fullWidth
            size="small"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task title"
            required
            sx={{ flex: 1 }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "primary.main",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            {editingTask ? "Edit Task" : "Add Task"}
          </Button>
        </Box>
        <Typography variant="h5" component="h5" gutterBottom>
          Task List ({tasks.length})
        </Typography>
      </Box>
      <Box
        sx={{
          overflow: "auto",
          flex: 1,
          px: 3,
          pb: 3,
          bgcolor: "#fafafa",
        }}
      >
        <List>
          {tasks.map((task, index) => (
            <ListItem
              key={index}
              sx={{
                bgcolor: "white",
                mb: 1,
                borderRadius: 1,
                border: "1px solid",
                borderColor: "grey.200",
                wordWrap: "break-word",
                whiteSpace: "normal",
              }}
            >
              <ListItemText primary={task.title} />
              <IconButton
                color="white"
                sx={{
                  bgcolor: "secondary.main",
                  "&:hover": {
                    bgcolor: "secondary.dark",
                  },
                  marginRight: "10px",
                  marginLeft: "10px",
                }}
                onClick={() => handleUpdateClick(task)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="white"
                sx={{
                  bgcolor: "secondary.main",
                  "&:hover": {
                    bgcolor: "secondary.dark",
                  },
                }}
                onClick={() => handleDeleteClick(task._id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
}

export default TaskList;
