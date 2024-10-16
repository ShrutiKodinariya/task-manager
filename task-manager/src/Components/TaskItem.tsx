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
      sx={{ backgroundColor: task.completed ? '#e8f5e9' : 'inherit' }}
    >
      <Checkbox checked={task.completed} onChange={() => onToggle(task.id)} />
      <ListItemText 
        primary={task.text} 
        sx={{ textDecoration: task.completed ? 'line-through' : 'none' }} 
      />
    </ListItem>
  );
};

export default TaskItem;