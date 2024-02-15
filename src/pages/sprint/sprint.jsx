import React, { useState, useContext } from "react";
import { DataContext } from "../../context";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./sprint.scss";

const Sprint = () => {
  const { newTask, newSprint } = useContext(DataContext);
  const [columns, setColumns] = useState({
    todo: [],
    inProgress: [],
    testing: [],
    done: [],
    undone: [],
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceColumn = source.droppableId;
    const destColumn = destination.droppableId;
    const sourceItems = [...columns[sourceColumn]];
    const destItems = [...columns[destColumn]];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    setColumns((prevColumns) => ({
      ...prevColumns,
      [sourceColumn]: sourceItems,
      [destColumn]: destItems,
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="sprintWrapper">
        <div className="block"></div>
        {/*<div className="dataHeader">
          <p>{newSprint.sprintName}</p>
          <p>{newSprint.startDate}</p>
          <p>{newSprint.endDate}</p>
        </div>*/}

        <div className="sprintHeader">
          <p>{newSprint.sprintName}</p>
          <div className="dataHeader">
            <p>Start Date: {newSprint.startDate}</p>
            <p>End Date: {newSprint.endDate}</p>
          </div>
        </div>
        <div className="sprintContainerSprint">
          {Object.entries(columns).map(([columnId, tasks]) => (
            <Droppable droppableId={columnId} key={columnId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="column"
                >
                  <h2 className="columnTitle">{columnId}</h2>
                  <div className="columnTitleLine"></div>

                  {tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="taskContainerSprint"
                        >
                          <p>Content is here1</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Sprint;

//{
//<div className="sprintContainerSprint">
//<p>{newTask.taskName}</p>
//<p>{newTask.subheading}</p>
//<p>{newTask.author}</p>
//<p>{newTask.taskTime}</p>
//<p>{newTask.description}</p>
//<p>{newTask.observer}</p>
//<p>{newSprint.sprintName}</p>
//<p>{newSprint.sprintGoal}</p>
//<p>{newSprint.startDate}</p>
//<p>{newSprint.endDate}</p>
//<p>{newSprint.performerLastName}</p>
//<p>{newSprint.performerFirstName}</p>
//<p>{newSprint.position}</p>
//<p>{newSprint.department}</p>
//<p>{newTask.id}</p>
//</div>
//}

//import React, { useContext } from "react";
//import { DataContext } from "../../context";
//import "./sprint.scss"; //
//import { Droppable, Draggable } from "react-beautiful-dnd";

//// Card component to represent each task
//const Card = ({ task }) => {
//  const {
//    taskName,
//    sprintName,
//    performerLastName,
//    performerFirstName,
//    description,
//    taskTime,
//  } = task;
//  let cardStyle = "card";
//  switch (task.status) {
//    case "ToDo":
//      cardStyle += " blue";
//      break;
//    case "In_progress":
//      cardStyle += " orange";
//      break;
//    case "Testing":
//      cardStyle += " yellow";
//      break;
//    case "Done":
//      cardStyle += " green";
//      break;
//    default:
//      break;
//  }

//  return (
//    <div className={cardStyle}>
//      <h3>{taskName}</h3>
//      <p>{sprintName}</p>
//      <p>
//        Performer: {performerFirstName} {performerLastName}
//      </p>
//      <p>{description}</p>
//      <p>Time till end: {taskTime}</p>
//    </div>
//  );
//};

//const SprintColumn = ({ columnId, tasks }) => (
//  <Droppable droppableId={columnId}>
//    {(provided) => (
//      <div {...provided.droppableProps} ref={provided.innerRef}>
//        {tasks.map((task, index) => (
//          <Draggable key={task.id} draggableId={task.id} index={index}>
//            {(provided) => (
//              <div
//                ref={provided.innerRef}
//                {...provided.draggableProps}
//                {...provided.dragHandleProps}
//              >
//                <Card task={task} />
//              </div>
//            )}
//          </Draggable>
//        ))}
//        {provided.placeholder}
//      </div>
//    )}
//  </Droppable>
//);

//// Sprint component to represent the sprint columns and cards
//const Sprint = () => {
//  const { tasks } = useContext(DataContext);

//  // Function to handle drag and drop will go here

//  return (
//    <div className="sprintBoard">
//      <div className="sprintColumn toDo">
//        <h2>To Do</h2>
//        {/* Map through tasks and render cards for ToDo */}
//      </div>
//      <div className="sprintColumn inProgress">
//        <h2>In Progress</h2>
//        {/* Map through tasks and render cards for In_progress */}
//      </div>
//      <div className="sprintColumn testing">
//        <h2>Testing</h2>
//        {/* Map through tasks and render cards for Testing */}
//      </div>
//      <div className="sprintColumn done">
//        <h2>Done</h2>
//        {/* Map through tasks and render cards for Done */}
//      </div>
//    </div>
//  );
//};

//export default Sprint;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//import React, { useContext } from "react";
//import { DataContext } from "../../context";
//import "./sprint.scss";

//const Sprint = () => {
//  const { newTask, setNewTask, newSprint, setNewSprint } =
//    useContext(DataContext);

//  return (
//    <div className="sprintContainerSprint">
//      <p>{newTask.taskName}</p>
//      <p>{newTask.subheading}</p>
//      <p>{newTask.author}</p>
//      <p>{newTask.taskTime}</p>
//      <p>{newTask.description}</p>
//      <p>{newTask.observer}</p>
//      <p>{newSprint.sprintName}</p>
//      <p>{newSprint.sprintGoal}</p>
//      <p>{newSprint.startDate}</p>
//      <p>{newSprint.endDate}</p>
//      <p>{newSprint.performerLastName}</p>
//      <p>{newSprint.performerFirstName}</p>
//      <p>{newSprint.position}</p>
//      <p>{newSprint.department}</p>
//      <p>{newTask.id}</p>
//    </div>
//  );
//};

//export default Sprint;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//import React, { useContext } from "react";
//import { DataContext } from "../../context";
//import { DndProvider, useDrag, useDrop } from "react-dnd";
//import { HTML5Backend } from "react-dnd-html5-backend";
//import "./sprint.scss";

//// Card component
//const Card = ({ task, columnName }) => {
//  const [{ isDragging }, drag] = useDrag(() => ({
//    type: "CARD",
//    item: { id: task.id, originalColumnName: columnName },
//    collect: (monitor) => ({
//      isDragging: monitor.isDragging(),
//    }),
//  }));

//  const backgroundColor = getColorForColumnName(columnName);

//  return (
//    <div
//      className="card"
//      ref={drag}
//      style={{ opacity: isDragging ? 0.5 : 1, backgroundColor }}
//    >
//      <p>{task.taskName}</p>
//      <p>{task.performer}</p>
//      <p>{task.description}</p>
//      <p>{task.timeTillEnd}</p>
//    </div>
//  );
//};

//// Column component
//const Column = ({ columnName, tasks, moveCard }) => {
//  const [, drop] = useDrop(() => ({
//    accept: "CARD",
//    drop: (item, monitor) => {
//      moveCard(item.id, columnName);
//    },
//  }));

//  return (
//    <div
//      className="column"
//      ref={drop}
//      style={{ backgroundColor: "lightgrey", padding: "10px" }}
//    >
//      <h2>{columnName}</h2>

//      {tasks.map((task) => (
//        <Card key={task.id} task={task} columnName={columnName} />
//      ))}
//    </div>
//  );
//};

//const Sprint = () => {
//  const { tasks, setTasks } = useContext(DataContext);

//  // Logic to categorize tasks into columns
//  const toDoTasks = tasks ? tasks.filter((task) => task.status === "ToDo") : [];
//  const inProgressTasks = tasks
//    ? tasks.filter((task) => task.status === "In_progress")
//    : [];
//  const testingTasks = tasks
//    ? tasks.filter((task) => task.status === "Testing")
//    : [];
//  const doneTasks = tasks ? tasks.filter((task) => task.status === "Done") : [];

//  const moveCard = (cardId, newColumnName) => {
//    // Logic to move card to a new column and update its status
//    // You will need to implement this based on your application's state management
//  };

//  return (
//    <DndProvider backend={HTML5Backend}>
//      <div className="sprint-page">
//        {/* Render columns here */}
//        <Column columnName="ToDo" tasks={toDoTasks} moveCard={moveCard} />
//        <Column
//          columnName="In_progress"
//          tasks={inProgressTasks}
//          moveCard={moveCard}
//        />
//        <Column columnName="Testing" tasks={testingTasks} moveCard={moveCard} />
//        <Column columnName="Done" tasks={doneTasks} moveCard={moveCard} />
//      </div>
//    </DndProvider>
//  );
//};

//const getColorForColumnName = (columnName) => {
//  const colors = {
//    ToDo: "blue",
//    In_progress: "orange",
//    Testing: "yellow",
//    Done: "green",
//  };
//  return colors[columnName] || "grey";
//};

//export default Sprint;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//import React, { useContext } from "react";
//import { DataContext } from "../../context";
//import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

//function Sprint() {
//  const { tasks } = useContext(DataContext);

//  const onDragEnd = (result) => {
//    if (!result.destination) {
//      return;
//    }
//    const { source, destination } = result;
//  };

//  const renderColumn = (columnTasks, columnName) => {
//    return columnTasks.map((sprints, index) => (
//      <Draggable key={sprints.id} draggableId={sprints.id} index={index}>
//        {" "}
//        {(provided) => (
//          <div
//            ref={provided.innerRef}
//            {...provided.draggableProps}
//            {...provided.dragHandleProps}
//            style={{
//              ...provided.draggableProps.style,
//              backgroundColor: getColorForColumnName(columnName),
//            }}
//          >
//            <p>sadad</p>
//            <p>{sprints.taskName}</p>
//            <p>{sprints.author}</p>
//            <p>{sprints.description}</p>
//            <p>{sprints.taskTime}</p>
//          </div>
//        )}{" "}
//      </Draggable>
//    ));
//  };

//  console.log(tasks);

//  const getColorForColumnName = (columnName) => {
//    const colors = {
//      ToDo: "blue",
//      In_progress: "orange",
//      Testing: "yellow",
//      Done: "green",
//    };
//    return colors[columnName] || "grey";
//  };

//  const toDoTasks = tasks.filter((task) => task.status === "ToDo");
//  const inProgressTasks = tasks.filter((task) => task.status === "In_progress");
//  const testingTasks = tasks.filter((task) => task.status === "Testing");
//  const doneTasks = tasks.filter((task) => task.status === "Done");

//  return (
//    <DragDropContext onDragEnd={onDragEnd}>
//      <div className="sprint-page">
//        {/* Render columns here */}
//        <Droppable droppableId="toDoColumn">
//          {(provided) => (
//            <div ref={provided.innerRef} {...provided.droppableProps}>
//              {renderColumn(toDoTasks, "ToDo")}
//            </div>
//          )}
//        </Droppable>
//        <Droppable droppableId="inProgressColumn">
//          {(provided) => (
//            <div ref={provided.innerRef} {...provided.droppableProps}>
//              {renderColumn(inProgressTasks, "In_progress")}
//            </div>
//          )}
//        </Droppable>
//        <Droppable droppableId="testingColumn">
//          {(provided) => (
//            <div ref={provided.innerRef} {...provided.droppableProps}>
//              {renderColumn(testingTasks, "Testing")}
//            </div>
//          )}
//        </Droppable>
//        <Droppable droppableId="doneColumn">
//          {(provided) => (
//            <div ref={provided.innerRef} {...provided.droppableProps}>
//              {renderColumn(doneTasks, "Done")}
//            </div>
//          )}
//        </Droppable>
//      </div>
//    </DragDropContext>
//  );
//}

//export default Sprint;
