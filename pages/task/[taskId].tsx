import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useTask } from "../../hooks/tasks";

const Task: NextPage = () => {
  const router = useRouter();
  const taskId = router.query.taskId as string;
  const { isError, isLoading, data: task } = useTask(taskId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong</p>;
  }

  return (
    <div>
      <pre>{JSON.stringify(task, null, 2)}</pre>
    </div>
  );
};

export default Task;
