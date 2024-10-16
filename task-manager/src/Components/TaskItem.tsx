import React from 'react';
import { TaskItemProps } from '../types';
import { Checkbox, IconButton, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(task.id)}>
          <DeleteIcon />
        </IconButton>
      }
      sx={{
        backgroundColor: task.completed ? 'transparent' : '#e8f5e9', // Simplified condition
        transition: 'background-color 0.3s ease',
      }}
    >
      <Checkbox checked={task.completed} onChange={() => onToggle(task.id)} />
      <ListItemText
        primary={task.text}
        sx={{ textDecoration: task.completed ? 'line-through' : 'none' }} // This part looks good
      />
    </ListItem>
  );
};

export default TaskItem;
