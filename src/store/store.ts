import { makeAutoObservable } from "mobx";
import { nanoid } from "nanoid";


export type Task = {
  id: string,
  title: string,
  description: string,
  dateStart: number,
  dateEnd: number | null,
  status: TaskStatus
}

export type TaskStatus = "todo" | "in-progress" | "review" | "done"


type PartialTask = {
  [K in keyof Task]?: Task[K]
}


export const createTaskStore = () =>
  makeAutoObservable({
    tasks: [] as Task[],

    createTask(task: { title: string, description: string }) {
      const newTask: Task = {
        ...task,
        id: nanoid(),
        dateStart: Date.now(),
        dateEnd: null,
        status: "todo"
      }

      this.tasks.push(newTask)
    },

    changeTaskStatus(taskId: string, status: TaskStatus) {
      const currentTask = this.tasks.find((task) => task.id === taskId)
      if (currentTask) {
        currentTask.status = status
        return currentTask
      }

    },

    updateTask(taskId: string, updateFields: PartialTask) {
      const currentTask = this.tasks.find((task) => task.id === taskId)
      if (currentTask) {
        Object.keys(updateFields).forEach((key) => {
          (currentTask[key as keyof PartialTask] as any) = updateFields[key as keyof PartialTask]
        })
      }
    },

    moveTask(taskId: string, status: string, indexTo: number) {
      const prevTask = this.tasks.filter((task) => task.status === status)[indexTo]
      const currentTask = this.tasks.find((task) => task.id === taskId)

      if (currentTask) {
        currentTask.status = status as TaskStatus

        const removeIndex = this.tasks.indexOf(currentTask)
        const insertIndex = prevTask ? this.tasks.indexOf(prevTask) : this.tasks.length - 1

        const isEnd = indexTo === 0 || insertIndex === this.tasks.length - 1
        this.tasks.splice(removeIndex, 1)
        this.tasks.splice(isEnd ? indexTo : insertIndex, 0, currentTask)






      }
    },

    getTaskById(taskId?: string) {
      return this.tasks.find((task) => task.id === taskId)
    },

    deleteTask(taskId: string) {
      // const deleteIdx = this.tasks.findIndex((task) => task.id === taskId)
      // if (deleteIdx !== -1) {
      //   this.tasks.splice(deleteIdx, 1)
      // }
      this.tasks = this.tasks.filter((task) => task.id !== taskId)
    }
  });


export type StoreType = ReturnType<typeof createTaskStore>;

