import React, { useState } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import styles from './Task.module.css';

type TaskProps = {
  task: string;
}

const MarkAsDoneButton: React.FC<{ onMarkAsDone: () => void }> = ({ onMarkAsDone }) => {
  return <button onClick={onMarkAsDone}>✔️</button>;
}

const UpdateTaskForm: React.FC<{ task: string, onUpdateTask: (task: string) => void }> = ({ 
  task,
  onUpdateTask,
  }) => {
  const [updatedTask, setUpdatedTask] = useState(task);
  const handleUpdateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdateTask(updatedTask);
  };

  return (
    <form onSubmit={handleUpdateTask}>
      <input
        type="text"
        value={updatedTask}
        onChange={(e) => setUpdatedTask(e.target.value)}
      />
      <button type="submit">Update</button>
    </form>
  );
  }

const Task: React.FC<TaskProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateTask, markAsDone } = useTaskContext();

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateTask = (updatedTask: string) => {
    updateTask(task, updatedTask);
    setIsEditing(false);
  };

  const handleMarkAsDone = () => {
    markAsDone(task);
  }

  return (
    <div className={styles.task}>
      {!isEditing && (
        <>
          <p>{task}</p>
          <MarkAsDoneButton onMarkAsDone={handleMarkAsDone} />
          <button onClick={handleToggleEdit}>Edit</button>
        </>
      )}
      {isEditing && <UpdateTaskForm task={task} onUpdateTask={handleUpdateTask} />}
    </div>
  );
};

export default Task;
