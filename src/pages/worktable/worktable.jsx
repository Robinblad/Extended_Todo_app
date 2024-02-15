import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../../context";
import calculateSprintDuration from "../../utils/calculateSprintDuration";
import { Line } from "react-chartjs-2";
import "./worktable.scss";

function TaskContainer({
  task,
  onDelete,
  onAddPerformer,
  onTaskClosed,
  onDetails,
}) {
  const [timeTillEnd, setTimeTillEnd] = useState(task.taskTime * 3600);

  useEffect(() => {
    if (timeTillEnd > 0) {
      const intervalId = setInterval(() => {
        setTimeTillEnd(timeTillEnd - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      onTaskClosed(task.id);
    }
  }, [timeTillEnd, onTaskClosed, task.id]);

  return (
    <div className="taskContainer">
      <p>
        {task.taskName} {timeTillEnd <= 0 && "Closed"}
      </p>
      <p>{task.sprintName}</p>
      <p>{task.author}</p>
      <p>{task.timeTillEnd}</p>
      <p>{task.performerLastName}</p>
      <p>{task.performerFirstName}</p>
      <p>{task.position}</p>
      <p>{task.department}</p>
      <div className="taskContainerButtons">
        <button
          onClick={() => onAddPerformer(task.id)}
          className="addPerformerButton"
        >
          Add Performer
        </button>
        <button
          onClick={() => {
            if (typeof onDetails === "function") {
              onDetails(task);
            } else {
              console.error("onDetails is not a function");
            }
          }}
          className="detailsButton"
        >
          Detail
        </button>
        <button onClick={() => onDelete(task.id)} className="deleteButton">
          Delete Task
        </button>
      </div>
    </div>
  );
}

function SprintContainer({
  sprint,
  tasks,
  onDetails,
  onTaskDelete,
  onTaskAddPerformer,
  onTaskClosed,
  currentDate,
}) {
  const sprintDuration = calculateSprintDuration(sprint);
  const isSprintCompleted = new Date(sprint.endDate) <= currentDate;

  return (
    <div className="sprintContainer">
      <h2 className="sprintName">
        {sprint.sprintName} {isSprintCompleted && "Completed"} (Duration:{" "}
        {sprintDuration || ""} days)
      </h2>
      {tasks.map((task) => (
        <TaskContainer
          key={task.id}
          task={task}
          onDelete={onTaskDelete}
          onAddPerformer={onTaskAddPerformer}
          onTaskClosed={onTaskClosed}
          onDetails={onDetails}
        />
      ))}
    </div>
  );
}

function TasksTrendDiagram({ tasks }) {
  const data = {
    labels: tasks.map((task) => task.creationDate),
    datasets: [
      {
        label: "Number of Closed Tasks",
        data: tasks.map((task) => task.isClosed),
        fill: false,
        backgroundColor: "rgb(75,192,192)",
        borderColor: "rgba(75,192,192,0.2)",
      },
    ],
  };

  const [showDiagram, setShowDiagram] = useState(false);

  const openDiagram = () => setShowDiagram(true);
  const closeDiagram = () => setShowDiagram(false);

  return (
    <div>
      <button onClick={openDiagram}>Open Diagram</button>
      {showDiagram && (
        <div className="popup">
          <h3>Task Details</h3>
          {tasks.map((task) => (
            <div key={task.id}>
              <p>Author: {task.author}</p>
              <p>
                Performer: {task.performerFirstName} {task.performerLastName}
              </p>
              <p>Position: {task.position}</p>
              <p>Department: {task.department}</p>
            </div>
          ))}
          <button onClick={closeDiagram}>Close</button>
          <Line data={data} />
        </div>
      )}
    </div>
  );
}

function Worktable() {
  const { tasks, setTasks, newSprint, setNewSprint } = useContext(DataContext);
  const [showAddPerformerForm, setShowAddPerformerForm] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const currentDate = new Date();
  const [showPopup, setShowPopup] = useState(false);
  const [currentTaskDetails, setCurrentTaskDetails] = useState(null);

  const handleTaskClosed = (taskId) => {};

  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleShowDetails = (task) => {
    setCurrentTaskDetails(task);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setCurrentTaskDetails(null);
  };

  const handleAddPerformer = (taskId) => {
    setShowAddPerformerForm(true);

    setCurrentTaskId(taskId);
  };

  function TaskDetailsPopup({ task, onClose }) {
    // Code to create the details popup and chart
    // You can use the `task` prop to display task details
    // and implement the chart with the data you have

    return (
      <div className="taskDetailsPopup">
        {/* Task details and chart goes here */}
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  // ... (the rest of the Worktable component)

  {
    showPopup && currentTaskDetails && (
      <TaskDetailsPopup task={currentTaskDetails} onClose={handleClosePopup} />
    );
  }

  const handleAddPerformerSubmit = (performerData) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === currentTaskId) {
        return {
          ...task,
          performerLastName: performerData.performerLastName,
          performerFirstName: performerData.performerFirstName,
          position: performerData.position,
          department: performerData.department,
        };
      }
      return task;
    });
    setTasks(updatedTasks);

    setShowAddPerformerForm(false);
  };

  const sortedTasks = tasks.sort((a, b) => {
    const timeA = a.initializationTime || "";
    const timeB = b.initializationTime || "";
    return timeA.localeCompare(timeB);
  });

  return (
    <div className="worktableWrapper">
      <div className="block"></div>
      <h1 className="worktableTitle">Worktable</h1>
      {newSprint && (
        <SprintContainer
          sprint={newSprint}
          tasks={sortedTasks.filter((task) => task.sprintId === newSprint.id)}
          onTaskDelete={handleTaskDelete}
          onTaskAddPerformer={handleAddPerformer}
          onTaskClosed={handleTaskClosed}
          onDetails={handleShowDetails} // Here the function is passed as a prop
          currentDate={currentDate}
        />
      )}
      {showAddPerformerForm && (
        <div>
          <input
            type="text"
            placeholder="Last Name"
            value={newSprint.performerLastName}
            onChange={(e) =>
              setNewSprint({ ...newSprint, performerLastName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="First Name"
            value={newSprint.performerFirstName}
            onChange={(e) =>
              setNewSprint({ ...newSprint, performerFirstName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Position"
            value={newSprint.position}
            onChange={(e) =>
              setNewSprint({ ...newSprint, position: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Department"
            value={newSprint.department}
            onChange={(e) =>
              setNewSprint({ ...newSprint, department: e.target.value })
            }
          />
          <button onClick={() => handleAddPerformerSubmit(newSprint)}>
            Submit Performer
          </button>
          {showPopup && currentTaskDetails && (
            <TaskDetailsPopup
              task={currentTaskDetails}
              onClose={handleClosePopup}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Worktable;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//import React, { useState, useEffect, useContext } from "react";
//import { DataContext } from "../../context";

//const GetTask = () => {
//  const { newTask } = useContext(DataContext);
//  return (
//    <div>
//      <h2>New Task</h2>
//      <p>Task Name: {newTask.taskName}</p>
//      <p>Subheading: {newTask.subheading}</p>
//      <p>Author: {newTask.author}</p>
//      <p>Task Time: {newTask.taskTime}</p>
//      <p>Description: {newTask.description}</p>
//      <p>Observer: {newTask.observer}</p>
//      <p>Time to end: {newTask.timeTillEnd}</p>
//    </div>
//  );
//};

//function Worktable() {
//  const { tasks, setTasks, newTask, setNewTask, newSprint, setNewSprint } =
//    useContext(DataContext);
//  const [selectedSprint, setSelectedSprint] = useState(null);
//  const [showAddPerformerForm, setShowAddPerformerForm] = useState(false);
//  const handleSelectSprint = (sprint) => {

//    setSelectedSprint(sprint);
//  };

//  const handleAddPerformer = (taskId) => {

//    setShowAddPerformerForm(true);
//  };

//  const handleAddPerformerSubmit = (performerData) => {

//    setShowAddPerformerForm(false);
//  };

//  const isSprintCompleted = (sprint) => {

//    return new Date(sprint.endDate) < new Date();
//  };

//  return (
//    <div>
//      <h1>Worktable</h1>
//      <div>
//        {newSprint.map((sprint) => (
//          <div key={sprint.id}>
//            <h2>
//              {sprint.sprintName} {isSprintCompleted(sprint) ? "Completed" : ""}
//            </h2>
//            <div>
//              {tasks
//                .filter((task) => task.sprintId === sprint.id)
//                .sort(/* sorting logic */)
//                .map((task) => (
//                  <div key={task.id}>
//                    <p>{task.taskName}</p>
//                    <p>{task.author}</p>
//                    {/* More task details */}
//                    <button onClick={() => handleAddPerformer(task.id)}>
//                      Add Performer
//                    </button>
//                  </div>
//                ))}
//            </div>
//          </div>
//        ))}
//      </div>

//      {showAddPerformerForm && (
//        <form onSubmit={handleAddPerformerSubmit}>

//          <button type="submit">Submit Performer</button>
//        </form>
//      )}
//    </div>
//  );
//}

//export default GetTask;
