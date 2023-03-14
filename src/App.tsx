import { Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Link, Outlet } from "react-router-dom";
import "./App.scss";
import { TaskList } from "./features/TaskList";
import { useTaskStore } from "./store/useTaskStore";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { TaskStatus } from "./store/store";
import { useState } from "react";

const App = observer(() => {
  const store = useTaskStore();

  return (
    <div className="app">
      <header className="board-header">
        <Button
          size="small"
          variant="contained"
          onClick={() => {}}
          className="addTaskButton"
        >
          <Link to={"/add-task"}>Add task</Link>
        </Button>
      </header>
      <main>
        <DragDropContext
          onDragEnd={(result) => {
            if (result.destination) {
              store.moveTask(
                result.draggableId,
                result.destination.droppableId,
                result.destination.index
              );
            }
          }}
        >
          <div className="board">
            <TaskList title="To do" status="todo" />
            <TaskList title="In progress" status="in-progress" />
            <TaskList title="Review" status="review" />
            <TaskList title="Done" status="done" />
          </div>
        </DragDropContext>
      </main>
      <Outlet />
    </div>
  );
});

export default App;
