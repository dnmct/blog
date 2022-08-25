import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Task: NextPage = () => {
  const router = useRouter();
  const taskId = router.query.taskId as string;
  const {
    isError,
    isLoading,
    data: task,
  } = useQuery(
    ["tasks", taskId],
    () =>
      fetch(`http://localhost:3000/api/tasks/${taskId}`).then((res) =>
        res.json()
      ),
    { enabled: !!taskId }
  );

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
