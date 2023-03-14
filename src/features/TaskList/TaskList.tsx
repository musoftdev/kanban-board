import { useTaskStore } from "../../store/useTaskStore";
import "./TaskList.scss";
import { observer } from "mobx-react-lite";
import { Droppable, DropResult } from "react-beautiful-dnd";
import { TaskRow } from "./components/TaskRow";
import { useEffect, useLayoutEffect, useMemo } from "react";

type TaskListProps = {
  title: string;
  status: string;
  // dropResult: DropResult | null;
};

export const TaskList = observer(({ title, status }: TaskListProps) => {
  const store = useTaskStore();

  const taskList = store.tasks.filter((task) => task.status === status);

  // const taskList = useMemo(() => {
  //   const tempArray = [...filteredList];
  //   if (dropResult?.destination?.droppableId === status) {
  //     const dropTask = store.getTaskById(dropResult.draggableId);
  //     const removedItemIdx = tempArray.indexOf(dropTask!);
  //     tempArray.splice(removedItemIdx, 1);
  //     tempArray.splice(dropResult.destination.index, 0, dropTask!);
  //   }
  //   return tempArray;
  // }, [filteredList]);

  return (
    <div>
      <header className="taskList-header">
        <h3>{title}</h3>
      </header>
      <Droppable droppableId={status} type={"TASK"}>
        {(provided, snapshot) => (
          <ul className="taskList" ref={provided.innerRef} {...provided.droppableProps}>
            {taskList.map((task, index) => (
              <TaskRow task={task} index={index} key={task.id} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
});
