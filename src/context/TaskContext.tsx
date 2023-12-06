import React, { createContext, useContext, useState } from 'react';

type TaskContextProps = {
  tasks: string[];
  addTask: (task: string) => void;
  updateTask: (oldTask: string, newTask: string) => void;
  markAsDone: (task: string) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = (task: string) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const updateTask = (oldTask: string, newTask: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task === oldTask ? newTask : task))
    );
  };

  const markAsDone = (task: string) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t !== task));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, markAsDone }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

