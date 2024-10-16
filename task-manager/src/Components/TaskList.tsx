import React from 'react';
import { TaskListProps } from '../types';
import TaskItem from './TaskItem';
import { List, Paper } from '@mui/material';

const TaskList = ({ tasks, onToggle, onDelete }: TaskListProps) => {
  return (
    <Paper sx={{ marginTop: 2 }}>
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
  );
};

export default TaskList;