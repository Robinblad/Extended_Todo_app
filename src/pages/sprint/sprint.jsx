import React, { useContext } from "react";
import { DataContext } from "../../context";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Sprint() {
  const { tasks } = useContext(DataContext);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;
  };

  const renderColumn = (columnTasks, columnName) => {
    return columnTasks.map((sprints, index) => (
      <Draggable key={sprints.id} draggableId={sprints.id} index={index}>
        {" "}
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              backgroundColor: getColorForColumnName(columnName),
            }}
          >
            <p>sadad</p>
            <p>{sprints.taskName}</p>
            <p>{sprints.author}</p>
            <p>{sprints.description}</p>
            <p>{sprints.taskTime}</p>
          </div>
        )}{" "}
      </Draggable>
    ));
  };

  console.log(tasks);

  const getColorForColumnName = (columnName) => {
    const colors = {
      ToDo: "blue",
      In_progress: "orange",
      Testing: "yellow",
      Done: "green",
    };
    return colors[columnName] || "grey";
  };

  const toDoTasks = tasks.filter((task) => task.status === "ToDo");
  const inProgressTasks = tasks.filter((task) => task.status === "In_progress");
  const testingTasks = tasks.filter((task) => task.status === "Testing");
  const doneTasks = tasks.filter((task) => task.status === "Done");

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="sprint-page">
        {/* Render columns here */}
        <Droppable droppableId="toDoColumn">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {renderColumn(toDoTasks, "ToDo")}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="inProgressColumn">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {renderColumn(inProgressTasks, "In_progress")}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="testingColumn">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {renderColumn(testingTasks, "Testing")}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="doneColumn">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {renderColumn(doneTasks, "Done")}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default Sprint;
