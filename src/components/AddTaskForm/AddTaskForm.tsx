import React, { useState } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import styles from './AddTaskForm.module.css';

interface AddTaskFormProps {}

const AddTaskForm: React.FC<AddTaskFormProps> = () => {
  const { addTask } = useTaskContext();
  const [task, setTask] = useState('');

  const handleAddTask = () => {
    if (task.trim() !== '') {
      addTask(task.trim());
      setTask('');
    }
  };

  return (
    <div>
      <label>
        Task
        <input className={styles.taskInput} type="text" value={task} placeholder='Add new task' onChange={(e) => setTask(e.target.value)} />
      </label>
      <button onClick={handleAddTask}>➕</button>
    </div>
  );
};

export default AddTaskForm;

