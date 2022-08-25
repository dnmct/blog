import fs from "fs/promises";
import { Task } from "../types/tasks";
type Comment = {
  id: string;
  message: string;
  taskId: string;
};

interface DB {
  tasks: Task[];
  comments: Comment[];
}

export async function getDB(): Promise<DB> {
  const dbString = await fs.readFile("db.json", { encoding: "utf-8" });
  return JSON.parse(dbString);
}

export async function updateTasks(db: DB, updatedTasks: Task[]) {
  const updatedDB = {
    ...db,
    tasks: updatedTasks,
  };
  await fs.writeFile("db.json", JSON.stringify(updatedDB));
}
