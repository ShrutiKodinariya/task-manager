import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from '../Components/TaskItem';
import { Task } from '../types';

const mockTask: Task = { id: 1, text: 'Test Task', completed: false };
const mockOnToggle = jest.fn();
const mockOnDelete = jest.fn();

describe('TaskItem', () => {
  it('renders the task text', () => {
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('calls onToggle when checkbox is clicked', () => {
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockOnToggle).toHaveBeenCalledWith(1);
  });

  it('calls onDelete when delete button is clicked', () => {
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it('applies correct background color based on completion status', () => {
    const { rerender } = render(<TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    expect(screen.getByRole('listitem')).toHaveStyle('background-color: #e8f5e9');

    rerender(<TaskItem task={{...mockTask, completed: true}} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    expect(screen.getByRole('listitem')).toHaveStyle('background-color: transparent');
  });
});