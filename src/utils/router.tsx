import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { TaskCreate } from "../features/TaskCreate";
import { TaskPreview } from "../features/TaskPreview";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/task/:taskId",
        element: <TaskPreview />,
      },
      {
        path: "/add-task",
        element: <TaskCreate />,
      },
    ],
  },
]);
