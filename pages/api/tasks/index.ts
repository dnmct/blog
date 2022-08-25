// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import { Task } from "../../../types/tasks";
import { nanoid } from "nanoid";
import { getDB, updateTasks } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Task[] | { id: string }>
) {
  const db = await getDB();
  const tasks = db.tasks;

  if (req.method === "GET") {
    res.status(200).json(tasks);
  }

  if (req.method === "POST") {
    const parsed = JSON.parse(req.body);
    const newTask = {
      title: parsed.title,
      completed: false,
      id: nanoid(),
    };
    const newTasks = [...tasks, newTask];
    await updateTasks(db, newTasks);
    res.status(200).json({ id: newTask.id });
  }
}
