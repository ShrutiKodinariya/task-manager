import React from 'react';
import { TaskListProps } from '../types';
import TaskItem from './TaskItem';
import { List, Paper, Box, Typography } from '@mui/material';

const TaskList = ({ tasks, onToggle, onDelete }: TaskListProps) => {
  return (
    <Box sx={{marginTop:5}}>
      <Typography 
      variant="h6" 
                    sx={{ 
                        fontFamily: '"Roboto Slab", serif',
                        color: '#111', 
                        fontSize: 25,
                    }}>
        Task List:
      </Typography>
    <Paper sx={{ marginTop: 2 ,
      backgroundColor: 'rgba(243, 218, 231, 0.8)',
    }}>
      <List>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </List>
    </Paper>
    </Box>
  );
};

export default TaskList;