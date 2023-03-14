import { Task } from "../../store/store";
import { Dialog } from "../../components/Dialog";
import { useTaskStore } from "../../store/useTaskStore";
import { observer } from "mobx-react-lite";
import {
  Button,
  OutlinedInput as Input,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import { FormEvent } from "react";

import "./TaskCreate.scss";
import { useNavigate } from "react-router-dom";

interface TaskFormElements extends HTMLFormControlsCollection {
  taskTitle: HTMLInputElement;
  taskDescription: HTMLInputElement;
}

const loadingTask: Task = {
  id: "",
  title: "Loading...",
  description: "Loading...",
  dateStart: Date.now(),
  dateEnd: Date.now(),
  status: "todo",
};

export const TaskCreate = observer(() => {
  const store = useTaskStore();
  const navigate = useNavigate();

  const handleAddTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { taskTitle, taskDescription } = event.currentTarget
      .elements as TaskFormElements;

    if (taskTitle.value && taskDescription.value) {
      store.createTask({
        title: taskTitle.value,
        description: taskDescription.value,
      });

      taskTitle.value = "";
      taskDescription.value = "";

      navigate("/");
    }
  };

  return (
    <Dialog>
      <div className="taskCreate">
        <header className="taskCreateHeader">
          <h1>Task creator</h1>
        </header>
        <form onSubmit={handleAddTask} className="formItems">
          <div className="formItem">
            <InputLabel htmlFor="taskTitle">Title *</InputLabel>
            <TextField id="taskTitle" placeholder="Enter task title..." size="small" />
          </div>
          <div className="formItem">
            <InputLabel htmlFor="taskDescription">Description *</InputLabel>
            <Input
              id="taskDescription"
              placeholder="Enter description..."
              size="small"
              multiline
              minRows={4}
            />
          </div>
          <Button type="submit" variant="contained" style={{ alignSelf: "flex-start" }}>
            Add task
          </Button>
        </form>
      </div>
    </Dialog>
  );
});
