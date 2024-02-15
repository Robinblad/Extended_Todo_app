import React, { useState, useContext } from "react";
import { DataContext } from "../../context";
import "./Admin.scss";

function Admin() {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const {
    tasks,
    setTasks,
    newTask,
    setNewTask,
    newSprint,
    setNewSprint,
    sprints,
    setSprints,
  } = useContext(DataContext);

  const createTask = () => {
    const requiredFields = [
      "taskName",
      "subheading",
      "author",
      "taskTime",
      "description",
      "observer",
    ];

    for (const field of requiredFields) {
      if (!newTask[field]) {
        alert(`Please fill in the ${field}`);
        return;
      }
    }

    setShowTaskForm(true);

    const sprintId = newTask.sprintId;
    const newId = generateId();

    const newTaskObj = {
      ...newTask,
      id: newId,

      sprintId: sprintId,
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask({ ...newTask, id: newId });

    if (sprintId) {
      const updatedSprints = sprints.map((sprint) => {
        if (sprint.id === sprintId) {
          return { ...sprint, tasks: [...sprint.tasks, newTaskObj] };
        }
        return sprint;
      });
      setSprints(updatedSprints);
    } else {
      const newSprintId = generateId();
      const newSprint = {
        id: newSprintId,
        sprintName: newTask.sprintName,

        tasks: [newTaskObj],
        active: true,
      };
      setSprints([...sprints, newSprint]);
    }
  };

  const generateId = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const randomLetters =
      letters[Math.floor(Math.random() * letters.length)] +
      letters[Math.floor(Math.random() * letters.length)];
    const randomNumbers =
      numbers[Math.floor(Math.random() * numbers.length)] +
      numbers[Math.floor(Math.random() * numbers.length)] +
      numbers[Math.floor(Math.random() * numbers.length)] +
      numbers[Math.floor(Math.random() * numbers.length)];
    return `${randomLetters}-${randomNumbers}`;
  };

  function calculateSprintDuration(sprint) {
    const startDate = new Date(sprint.startDate);
    const endDate = new Date(sprint.endDate);
    const duration = (endDate - startDate) / (1000 * 60 * 60 * 24);
    return duration;
  }

  function SprintNameInput({ sprints, onSelectSprint }) {
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
      if (inputValue) {
        setSuggestions(
          sprints.filter((sprint) =>
            sprint.sprintName.toLowerCase().includes(inputValue.toLowerCase())
          )
        );
      } else {
        setSuggestions([]);
      }
    }, [inputValue, sprints]);

    return (
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Start typing sprint name..."
        />
        {suggestions.length > 0 && (
          <ul>
            {suggestions.map((sprint) => (
              <li key={sprint.id} onClick={() => onSelectSprint(sprint)}>
                {sprint.sprintName}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    createTask();
  };

  const registerSprint = (event) => {
    event.preventDefault();
    if (!newSprint.sprintName) {
      alert("Please fill in the sprint name");
      return;
    }
  };

  const activeSprints = sprints.filter((sprint) => sprint.active);

  return (
    <div className="adminWrapper">
      <div className="block"></div>
      <h1 className="adminPanel">Admin Panel</h1>
      <div className="createTaskWrapper">
        <h2 className="createTask">new task</h2>
        <form onSubmit={handleSubmit} className="createTaskForm">
          <input
            type="text"
            placeholder="Task name"
            value={newTask.taskName}
            onChange={(e) =>
              setNewTask({ ...newTask, taskName: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Subheading"
            value={newTask.subheading}
            onChange={(e) =>
              setNewTask({ ...newTask, subheading: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Author"
            value={newTask.author}
            onChange={(e) => setNewTask({ ...newTask, author: e.target.value })}
          />

          <input
            type="number"
            placeholder="Task time"
            value={newTask.taskTime}
            onChange={(e) =>
              setNewTask({ ...newTask, taskTime: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Observer"
            value={newTask.observer}
            onChange={(e) =>
              setNewTask({ ...newTask, observer: e.target.value })
            }
          />
        </form>
        <button onClick={createTask} className="createTaskButton">
          Create Task
        </button>
      </div>

      {showTaskForm && (
        <div className="registerSprintWrapper">
          <p className="v">V</p>
          <div className="line"></div>
          <h2 className="registerSprint">register sprint</h2>

          <select
            value={newTask.sprintId}
            onChange={(e) => {
              const selectedSprint = activeSprints.find(
                (sprint) => sprint.sprintName === e.target.value
              );
              setNewTask({
                ...newTask,
                sprintId: selectedSprint.id,
                sprintName: selectedSprint.sprintName,
              });
            }}
          >
            Select Sprint
            {activeSprints.map((sprint) => (
              <option key={sprint.id} value={sprint.sprintName}>
                {sprint.sprintName}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Sprint Name"
            value={newSprint.sprintName}
            onChange={(e) =>
              setNewSprint({ ...newSprint, sprintName: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Sprint Goal"
            value={newSprint.sprintGoal}
            onChange={(e) =>
              setNewSprint({ ...newSprint, sprintGoal: e.target.value })
            }
          />

          <input
            type="date"
            placeholder="Start Date"
            value={newSprint.startDate}
            onChange={(e) =>
              setNewSprint({ ...newSprint, startDate: e.target.value })
            }
          />

          <input
            type="date"
            placeholder="End Date"
            value={newSprint.endDate}
            onChange={(e) =>
              setNewSprint({ ...newSprint, endDate: e.target.value })
            }
          />
          <button onClick={registerSprint} className="registerSprintButton">
            Register Sprint
          </button>
          <div className="bottomBlock"></div>
        </div>
      )}
    </div>
  );
}

export default Admin;
