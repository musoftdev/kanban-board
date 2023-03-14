import { Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import { Task } from "../../../store/store";

export const TaskRow = ({ task, index }: { task: Task; index: number }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Link
          to={`task/${task.id}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="taskRow"
        >
          <li>
            <div className="taskDescription">
              <p>{task.title}</p>
              <small>{task.description}</small>
            </div>
          </li>
        </Link>
      )}
    </Draggable>
  );
};
