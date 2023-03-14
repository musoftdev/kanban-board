import { Task, TaskStatus } from "../../store/store";
import { Dialog } from "../../components/Dialog";
import { useTaskStore } from "../../store/useTaskStore";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
  Input,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import "./TaskPreview.scss";
import { dateFormatter } from "../../utils/dateFormatter";
import { useState } from "react";

const loadingTask: Task = {
  id: "",
  title: "Loading...",
  description: "Loading...",
  dateStart: Date.now(),
  dateEnd: Date.now(),
  status: "todo",
};

export const TaskPreview = observer(() => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const store = useTaskStore();
  const task = store.getTaskById(taskId) ?? loadingTask;

  const [editMode, setEditMode] = useState(false);

  const handleStatusChange = (event: SelectChangeEvent) => {
    if (taskId) {
      store.updateTask(taskId, {
        status: event.target.value as TaskStatus,
      });
    }
  };

  const handleTaskDeleted = () => {
    if (taskId) {
      store.deleteTask(taskId);
      navigate("/");
    }
  };

  return (
    <Dialog>
      <div className="previewContent">
        <div className="previewHeader">
          <h2>Task description</h2>
          <div className="buttonRow">
            {editMode ? (
              <>
                <Button size="small" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
                <Button
                  size="small"
                  onClick={() => setEditMode(false)}
                  variant="contained"
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button size="small" color="error" onClick={handleTaskDeleted}>
                  Delete
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </Button>
              </>
            )}
          </div>
        </div>

        <div>
          <label>Start date:</label>
          <p>{dateFormatter(task.dateStart)}</p>
        </div>

        <div className="previewItem">
          <label>Title:</label>
          <OutlinedInput readOnly size="small" defaultValue={task.title} />
        </div>
        <div className="previewItem">
          <label>Description:</label>
          <OutlinedInput readOnly size="small" defaultValue={task.description} />
        </div>
        <Select
          id="demo-select-small"
          value={task.status}
          displayEmpty
          onChange={handleStatusChange}
          size="small"
        >
          <MenuItem value="todo">Todo</MenuItem>
          <MenuItem value="in-progress">In progress</MenuItem>
          <MenuItem value="review">Review</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </Select>
      </div>
    </Dialog>
  );
});
