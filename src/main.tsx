import ReactDOM from "react-dom/client";
import App from "./App";
import { StoreProvider } from "./store/useTaskStore";
import "./reset.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./utils/router";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StoreProvider>
    <RouterProvider router={router} />
  </StoreProvider>
);
