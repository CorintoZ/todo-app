import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { TaskProvider } from '../../context/TaskContext';
import Task from './Task';

const mockMarkAsDone = vi.fn();
const mockUpdateTask = vi.fn();

vi.mock('../../context/TaskContext', () => ({
  useTaskContext: () => ({
      markAsDone: mockMarkAsDone,
      updateTask: mockUpdateTask,
  }),
  TaskProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="task-provider">{children}</div>
  ),
}));

test('renders task correctly', () => {
  render(
    <TaskProvider>
      <Task task="Test Task" />
    </TaskProvider>
  );

  expect(screen.getByText('Test Task')).toBeInTheDocument();
  expect(screen.getByText('✔️')).toBeInTheDocument();
  expect(screen.getByText('Edit')).toBeInTheDocument();
});

test('toggles to edit mode when Edit button is clicked', async () => {
  render(
    <TaskProvider>
      <Task task="Test Task" />
    </TaskProvider>
  );

  const editButton = screen.getByText('Edit');
  fireEvent.click(editButton);

  expect(screen.getByText('Update')).toBeInTheDocument();
  expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument();
});

test('calls markAsDone from useTaskContext when ✔️ button is clicked', async () => {
  render(
    <TaskProvider>
      <Task task="Test Task" />
    </TaskProvider>
  );

  const markAsDoneButton = screen.getByText('✔️');
  fireEvent.click(markAsDoneButton);

  await waitFor(() => {
    expect(mockMarkAsDone).toHaveBeenCalledWith('Test Task');
  });
});
