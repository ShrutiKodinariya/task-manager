import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskItem from '../Components/TaskItem';

const mockTask = {
  id: 1,
  text: 'Test Task',
  completed: false,
};

const mockOnToggle = jest.fn();
const mockOnDelete = jest.fn();

describe('TaskItem Component', () => {
  test('renders task text', () => {
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    const taskText = screen.getByText('Test Task');
    expect(taskText).toBeInTheDocument();
  });

  test('shows the checkbox as unchecked initially', () => {
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('calls onToggle when checkbox is clicked', () => {
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockOnToggle).toHaveBeenCalledWith(1);  // Ensures the task ID is passed correctly
  });

  test('calls onDelete when delete button is clicked', () => {
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    const deleteButton = screen.getByLabelText('delete');
    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledWith(1);  // Ensures the task ID is passed correctly
  });

  test('strikes through text when task is completed', () => {
    const completedTask = { ...mockTask, completed: true };
    render(<TaskItem task={completedTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    const taskText = screen.getByText('Test Task');
    expect(taskText).toHaveStyle('text-decoration: line-through');
  });
});
