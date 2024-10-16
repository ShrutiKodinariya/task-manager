import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for matchers like toBeInTheDocument
import AddTaskForm from '../Components/AddTaskForm';

const mockOnAdd = jest.fn();

describe('AddTaskForm Component', () => {
  test('renders form with input and button', () => {
    render(<AddTaskForm onAdd={mockOnAdd} />);
    
    // Check if the input field and button are rendered
    const inputField = screen.getByPlaceholderText('Enter Task') as HTMLInputElement;
    const addButton = screen.getByRole('button', { name: 'Add Task' });

    expect(inputField).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test('calls onAdd with input value when form is submitted', () => {
    render(<AddTaskForm onAdd={mockOnAdd} />);
    
    const inputField = screen.getByPlaceholderText('Enter Task') as HTMLInputElement;
    const addButton = screen.getByRole('button', { name: 'Add Task' });

    // Simulate user typing a task
    fireEvent.change(inputField, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    // Ensure onAdd is called with the correct task text
    expect(mockOnAdd).toHaveBeenCalledWith('New Task');
    expect(inputField.value).toBe(''); // Ensure input field is cleared after submission
  });

  test('shows error when trying to submit empty input', () => {
    render(<AddTaskForm onAdd={mockOnAdd} />);
    
    const addButton = screen.getByRole('button', { name: 'Add Task' });

    // Try to submit an empty form
    fireEvent.click(addButton);

    // Expect error message to be displayed
    const errorMessage = screen.getByText('Task cannot be empty');
    expect(errorMessage).toBeInTheDocument();
  });

  test('removes error message after successful submission', () => {
    render(<AddTaskForm onAdd={mockOnAdd} />);
    
    const inputField = screen.getByPlaceholderText('Enter Task') as HTMLInputElement;
    const addButton = screen.getByRole('button', { name: 'Add Task' });
  
    // Submit empty form to show error
    fireEvent.click(addButton);
    const errorMessage = screen.getByText('Task cannot be empty');
    expect(errorMessage).toBeInTheDocument();
  
    // Submit valid input to remove error
    fireEvent.change(inputField, { target: { value: 'Valid Task' } });
    fireEvent.click(addButton);
    
    // Instead of trying to type cast `errorMessage` as HTMLElement, we rely on expect's ability to handle null values
    expect(screen.queryByText('Task cannot be empty')).toBeNull(); // This will now correctly check for the absence of the error message
  });
  
});
