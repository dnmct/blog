import { useQuery, useQueryClient } from "@tanstack/react-query";
import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";
import { Task } from "../types/tasks";

const TestPage = () => {
  const queryClient = useQueryClient();
  const [input, setInput] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const { data: tasks, isLoading } = useQuery<Task[]>(["tasks"], () =>
    fetch("http://localhost:3000/api/tasks").then((res) => res.json())
  );

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const task = {
      title: input,
    };
    fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((res) => {
        setInput("");
        setSubmitting(false);
        queryClient.invalidateQueries(["allTasks"]);
      });
  }

  function deleteTask(id: string) {
    fetch(`http://localhost:3000/api/tasks/${id}`, { method: "DELETE" }).then(
      (res) => queryClient.invalidateQueries(["allTasks"])
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>Creating Blog posts</title>
      </Head>
      <div className="space-y-6">
        <ul className="space-y-4">
          {!tasks ? (
            <p>Something went wrong</p>
          ) : (
            tasks.map((task) => (
              <li key={task.id} className="flex items-center justify-between">
                <span>{task.title}</span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="h-6 w-6 bg-red-600 text-white"
                >
                  x
                </button>
              </li>
            ))
          )}
        </ul>
        <form onSubmit={onSubmit} className="flex space-x-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="py-2 px-3"
            type="text"
            placeholder="Task"
          />
          <button
            disabled={isSubmitting}
            className="bg-slate-700 p-2 text-white"
            type="submit"
          >
            {isSubmitting ? "Submitting..." : "Create Task"}
          </button>
        </form>
      </div>
    </>
  );
};

export default TestPage;
