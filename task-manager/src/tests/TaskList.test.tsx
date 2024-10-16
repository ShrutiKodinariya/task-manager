import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskList from '../Components/TaskList';
import { Task } from '../types';

const mockTasks: Task[] = [
  { id: 1, text: 'Task 1', completed: false },
  { id: 2, text: 'Task 2', completed: true },
];

const mockOnToggle = jest.fn();
const mockOnDelete = jest.fn();

describe('TaskList', () => {
  it('renders the task list with correct number of tasks', () => {
    render(<TaskList tasks={mockTasks} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    
    const taskItems = screen.getAllByRole('listitem');
    expect(taskItems).toHaveLength(2);
  });

  it('displays "Task List:" text', () => {
    render(<TaskList tasks={mockTasks} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    
    expect(screen.getByText('Task List:')).toBeInTheDocument();
  });

  it('renders TaskItem components for each task', () => {
    render(<TaskList tasks={mockTasks} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });
});