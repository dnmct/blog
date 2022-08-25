import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Task } from "../../types/tasks";

const Task: NextPage = () => {
  const router = useRouter();
  const taskId = router.query.taskId as string;
  const [task, setTask] = useState<Task | { message: string } | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/tasks/${taskId}`)
      .then((res) => res.json())
      .then((res) => setTask(res));
  }, [taskId]);

  return (
    <div>
      {task?.message ? (
        <p>Task not found</p>
      ) : (
        <pre>{JSON.stringify(task, null, 2)}</pre>
      )}
    </div>
  );
};

export default Task;
