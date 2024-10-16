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
        background: 'linear-gradient(90deg, rgba(0,23,36,0.7400210084033614) 0%, rgba(9,105,121,0.5243347338935574) 51%, rgba(0,212,255,0.20220588235294112) 100%)',
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
              fontFamily: '"Roboto Slab", serif', // Change to your desired font family
              fontWeight: 'bold', // Example style: make text bold
              fontStyle: 'italic', // Example style: italicize the text
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