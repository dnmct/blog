import Head from "next/head";
import { FormEvent, useState } from "react";
import { TaskItem } from "../components/Task";
import { useCreateTask, useTasks } from "../hooks/tasks";

const TestPage = () => {
  const [input, setInput] = useState("");
  const { data: tasks, isLoading: tasksLoading } = useTasks();
  const { mutateAsync: createTask, isLoading: isSubmitting } = useCreateTask();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await createTask(input);
      setInput("");
    } catch (e) {
      console.error(e);
    }
  }

  if (tasksLoading) {
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
            tasks.map((task) => <TaskItem key={task.id} task={task} />)
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
