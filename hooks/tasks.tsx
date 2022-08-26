import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { Task } from "../types/tasks";

export function useTask(taskId: string) {
  return useQuery(
    ["tasks", taskId],
    () =>
      fetch(`http://localhost:3000/api/tasks/${taskId}`).then((res) =>
        res.json()
      ),
    { enabled: Boolean(taskId) }
  );
}

export function useTasks() {
  return useQuery<Task[]>(["tasks"], () =>
    fetch("http://localhost:3000/api/tasks").then((res) => res.json())
  );
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation(
    ["tasks", "create"],
    (title: string) => {
      const task = {
        title,
      };
      return fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        body: JSON.stringify(task),
      }).then((res) => res.json());
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tasks"]);
      },
    }
  );
}

export function useDeleteTask(taskId: string) {
  const queryClient = useQueryClient();
  return useMutation(
    ["tasks", taskId, "delete"],
    () =>
      fetch(`http://localhost:3000/api/tasks/${taskId}`, { method: "DELETE" }),
    {
      onSuccess: () => queryClient.invalidateQueries(["tasks"]),
    }
  );
}
