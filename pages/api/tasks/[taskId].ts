// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getDB, updateTasks } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ id: string }>
) {
  const db = await getDB();
  const tasks = db.tasks;

  if (req.method === "DELETE") {
    const taskId = req.query.taskId as string;
    const newTasks = tasks.filter((task) => task.id !== taskId);
    await updateTasks(db, newTasks);
    res.status(200).json({ id: taskId });
  }
}
