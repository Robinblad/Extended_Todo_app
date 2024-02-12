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
