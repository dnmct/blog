import fs from "fs/promises";
import { Task } from "../types/tasks";

interface DB {
  tasks: Task[];
}

export async function getDB(): Promise<DB> {
  const dbString = await fs.readFile("db.json", { encoding: "utf-8" });
  const db = await JSON.parse(dbString);
  return db;
}

export async function updateTasks(db: DB, updatedTasks: Task[]) {
  const updatedDB = {
    ...db,
    tasks: updatedTasks,
  };
  await fs.writeFile("db.json", JSON.stringify(updatedDB));
}
