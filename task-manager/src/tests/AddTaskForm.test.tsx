import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import AddTaskForm from '../Components/AddTaskForm';

const mockOnAdd = jest.fn();

describe('AddTaskForm', () => {
  beforeEach(() => {
    mockOnAdd.mockClear();
  });

  it('renders the form with input and button', () => {
    render(<AddTaskForm onAdd={mockOnAdd} />);
    expect(screen.getByPlaceholderText('Enter Task')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('updates input value when typing', () => {
    render(<AddTaskForm onAdd={mockOnAdd} />);
    const input = screen.getByPlaceholderText('Enter Task');
    fireEvent.change(input, { target: { value: 'New Task' } });
    expect(input).toHaveValue('New Task');
  });

  it('calls onAdd with input value when form is submitted', () => {
    render(<AddTaskForm onAdd={mockOnAdd} />);
    const input = screen.getByPlaceholderText('Enter Task');
    const addButton = screen.getByRole('button', { name: 'Add' });

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    expect(mockOnAdd).toHaveBeenCalledWith('New Task');
  });

  it('displays error messages when trying to add an empty task', () => {
    render(<AddTaskForm onAdd={mockOnAdd} />);
    const addButton = screen.getByRole('button', { name: 'Add' });

    fireEvent.click(addButton);

    const errorMessages = screen.getAllByText('Task cannot be empty');
    expect(errorMessages).toHaveLength(2);  // Expect two error messages
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it('clears input and errors after successfully adding a task', () => {
    render(<AddTaskForm onAdd={mockOnAdd} />);
    const input = screen.getByPlaceholderText('Enter Task');
    const addButton = screen.getByRole('button', { name: 'Add' });

    // First, try to add an empty task to trigger the error
    fireEvent.click(addButton);
    expect(screen.getAllByText('Task cannot be empty')).toHaveLength(2);

    // Now add a valid task
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    expect(input).toHaveValue('');
    expect(screen.queryAllByText('Task cannot be empty')).toHaveLength(0);
  });
});