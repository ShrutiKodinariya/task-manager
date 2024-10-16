import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for extra matchers like toBeInTheDocument
import TaskList from '../Components/TaskList';
import TaskItem from '../Components/TaskItem'; // Importing to mock

const mockTasks = [
  { id: 1, text: 'Task 1', completed: false },
  { id: 2, text: 'Task 2', completed: true },
];

const mockOnToggle = jest.fn();
const mockOnDelete = jest.fn();

// Mock the TaskItem component to simplify testing of TaskList
jest.mock('./TaskItem', () => jest.fn(({ task }) => (
  <div data-testid="task-item">{task.text}</div>
)));

describe('TaskList Component', () => {
  test('renders task list heading', () => {
    render(<TaskList tasks={mockTasks} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    const heading = screen.getByText('Task List:');
    expect(heading).toBeInTheDocument();
  });

  test('renders correct number of TaskItem components', () => {
    render(<TaskList tasks={mockTasks} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    const taskItems = screen.getAllByTestId('task-item');
    expect(taskItems).toHaveLength(mockTasks.length); // Should render 2 tasks
  });

  test('renders task text in TaskItem components', () => {
    render(<TaskList tasks={mockTasks} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    const firstTask = screen.getByText('Task 1');
    const secondTask = screen.getByText('Task 2');
    expect(firstTask).toBeInTheDocument();
    expect(secondTask).toBeInTheDocument();
  });

  test('renders no TaskItem if task list is empty', () => {
    render(<TaskList tasks={[]} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    const taskItems = screen.queryAllByTestId('task-item');
    expect(taskItems).toHaveLength(0); // Should render no tasks
  });
});
