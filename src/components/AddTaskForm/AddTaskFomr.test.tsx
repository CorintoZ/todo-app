import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TaskProvider } from '../../context/TaskContext';
import AddTaskForm from './AddTaskForm';

test('renders AddTaskForm correctly', () => {
  render(
    <TaskProvider>
      <AddTaskForm />
    </TaskProvider>
  );

  expect(screen.getByPlaceholderText('Add new task')).toBeInTheDocument();
  expect(screen.getByText('➕')).toBeInTheDocument();
});

test('clear input on add task', async () => {
  render(
    <TaskProvider>
      <AddTaskForm />
    </TaskProvider>
  );

  const input = screen.getByPlaceholderText('Add new task');
  fireEvent.change(input, { target: { value: 'Test Task' } });

  const addButton = screen.getByText('➕');
  fireEvent.click(addButton);

  expect(input).toHaveValue('');
});

