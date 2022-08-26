import { useDeleteTask } from "../hooks/tasks";
import { Task } from "../types/tasks";

interface Props {
  key: string;
  task: Task;
}

export function TaskItem({ task }: Props) {
  const { mutate: deleteTask } = useDeleteTask(task.id);
  return (
    <li key={task.id} className="flex items-center justify-between">
      <span>{task.title}</span>
      <button
        onClick={() => deleteTask()}
        className="h-6 w-6 bg-red-600 text-white"
      >
        x
      </button>
    </li>
  );
}
