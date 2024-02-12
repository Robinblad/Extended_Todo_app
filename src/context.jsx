import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({});
  const [newSprint, setNewSprint] = useState({});
  const [sprints, setSprints] = useState([]);

  return (
    <DataContext.Provider
      value={{
        tasks,
        setTasks,
        newTask,
        setNewTask,
        newSprint,
        setNewSprint,
        sprints,
        setSprints,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
