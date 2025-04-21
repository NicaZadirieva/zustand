import { Key } from 'react';
import { create, StateCreator } from 'zustand';


export type TodoItem = {
    title: string;
    isCompleted: boolean;
    key: string;
}

type TodoItemState = {
    doneTasks: TodoItem[];
    processingTasks: TodoItem[];
}

type TodoActions = {
    complete: (item: Key[]) => void;
    startProcess: (item: Key[]) => void;
}

function getAllTasks() {
  const data: TodoItem[] = [
    {
      title: "Title 1",
      isCompleted: true,
      key: "1",
    },
    {
      title: "Title 2",
      isCompleted: true,
      key: "2",
    },
    {
      title: "Title 3",
      isCompleted: false,
      key: "3",
    },
    {
      title: "Title 4",
      isCompleted: true,
      key: "4",
    },
  ];
  return data;
}

function getAllDoneTasks() {
    return getAllTasks().filter((task) => {
      return task.isCompleted;
    });
}

function getProcessedTasks() {
    return getAllTasks().filter((task) => {
      return !task.isCompleted;
    });
}

const todoSlice: StateCreator<TodoItemState & TodoActions> = (set, get) => {
    return {
        doneTasks: getAllDoneTasks(),
        processingTasks: getProcessedTasks(),
        complete: (moveKeys: Key[]) => {
            const { doneTasks, processingTasks } = get();
            
            set({
                    processingTasks: processingTasks.filter((processTask: TodoItem) => !moveKeys.includes(processTask.key)),
                    doneTasks: [...doneTasks, ...processingTasks.filter((processTask: TodoItem) => moveKeys.includes(processTask.key)),]
                }
            )
        },
        startProcess: (moveKeys: Key[]) => {
            const { doneTasks, processingTasks } = get();
            
            set({
                    doneTasks: doneTasks.filter((doneTask: TodoItem) => !moveKeys.includes(doneTask.key)),
                    processingTasks: [...processingTasks, ...doneTasks.filter((doneTask: TodoItem) => moveKeys.includes(doneTask.key)),]
                }
            )
        },
    }
}

export const useTodoStore = create<TodoItemState & TodoActions>(todoSlice);
export const addDoneTask = useTodoStore.getState().complete;
export const startTask = () => useTodoStore.getState().startProcess;
export const getDoneTask = () => useTodoStore.getState().doneTasks;
export const getStartedTasks = () => useTodoStore.getState().processingTasks;