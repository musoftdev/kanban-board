import { createContext, ReactNode, useContext } from "react";
import { createTaskStore, StoreType } from "./store";

const TaskContext = createContext<StoreType | null>(null);

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const counterStore = createTaskStore();

  return <TaskContext.Provider value={counterStore}>{children}</TaskContext.Provider>;
};

const useTaskStore = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("error");
  }

  return context;
};

export { StoreProvider, useTaskStore };
