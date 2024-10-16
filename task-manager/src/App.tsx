import React, { useState, useEffect } from 'react';
import TaskList from './Components/TaskList';
import AddTaskForm from './Components/AddTaskForm';
import { Task } from './types';
import { Container, Typography, Box } from '@mui/material';

const App = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom
            sx={{
              fontFamily: '"Roboto Slab", serif',
              fontWeight: 'bold',
              textDecoration: 'underline',
            }}>
            Task Management App
          </Typography>
          <AddTaskForm onAdd={addTask} />
          <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
        </Box>
      </Container>
    </Box>
  );
};

export default App;