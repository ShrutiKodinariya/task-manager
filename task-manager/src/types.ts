import { text } from "stream/consumers";

export interface Task{
    id: number;
    text: string;
    completed: boolean;
}

export interface TaskItemProps{
    task: Task;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

export interface TaskListProps{
    tasks: Task[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

export interface AddTaskFormProps{
    onAdd: (text: string) => void;
}