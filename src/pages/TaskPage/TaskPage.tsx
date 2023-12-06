import React from 'react';
import AddTaskForm from '../../components/AddTaskForm/AddTaskForm';
import Task from '../../components/Task/Task';
import { useTaskContext } from '../../context/TaskContext';
import { useAuth } from '../../context/useAuth';
import styles from './TaskPage.module.css';

type TaskPageProps = {}

const TaskPage: React.FC<TaskPageProps> = () => {
  const { logout } = useAuth();
  const { tasks } = useTaskContext();
  const handleLogout = () => {
    logout();
  };

  return (
    <div className={styles.taskContainer}>
      <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
      <h2>Task Page</h2>
      <AddTaskForm />
      <ul className={styles.taskList}>
        {tasks.map((task, index) => (
          <li key={index}><Task task={task} /></li>
        ))}
      </ul>
    </div>
  );
};

export default TaskPage;
