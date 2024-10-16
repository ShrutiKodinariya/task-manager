import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskList from '../Components/TaskList';

// Sample task data
const mockTasks = [
  { id: 1, text: 'Task 1', completed: false },
  { id: 2, text: 'Task 2', completed: true },
];

// Mock functions for onToggle and onDelete
const mockOnToggle = jest.fn();
const mockOnDelete = jest.fn();

// Mock the TaskItem component
jest.mock('../Components/TaskItem', () => jest.fn(({ task }) => (
  <div data-testid="task-item">{task.text}</div>
)));

describe('TaskList Component', () => {
  // Test for the task list heading
  test('renders task list heading', () => {
    render(<TaskList tasks={mockTasks} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    const heading = screen.getByText('Task List:');
    expect(heading).toBeInTheDocument();
  });

  // Test for correct number of TaskItem components
  test('renders correct number of TaskItem components', () => {
    render(<TaskList tasks={mockTasks} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    const taskItems = screen.getAllByTestId('task-item');
    expect(taskItems).toHaveLength(mockTasks.length);
  });

  // Test for rendering task text in TaskItem components
  test('renders task text in TaskItem components', () => {
    render(<TaskList tasks={mockTasks} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    const firstTask = screen.getByText('Task 1');
    const secondTask = screen.getByText('Task 2');
    expect(firstTask).toBeInTheDocument();
    expect(secondTask).toBeInTheDocument();
  });

  // Test for no TaskItem if task list is empty
  test('renders no TaskItem if task list is empty', () => {
    render(<TaskList tasks={[]} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    const taskItems = screen.queryAllByTestId('task-item');
    expect(taskItems).toHaveLength(0);
  });
});
