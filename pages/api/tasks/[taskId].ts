// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getDB, updateTasks } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = await getDB();
    const tasks = db.tasks;
    const taskId = req.query.taskId as string;

    if (req.method === "GET") {
      const task = tasks.find((task) => task.id === taskId);
      if (!task) {
        res.status(404).send({ message: `No task with ID ${taskId} found` });
      }
      const comments = db.comments;
      const commentsFromTask = comments.filter(
        (comment) => comment.taskId === taskId
      );
      const taskWithComments = {
        ...task,
        comments: commentsFromTask,
      };
      res.status(200).json(taskWithComments);
    }

    if (req.method === "DELETE") {
      const newTasks = tasks.filter((task) => task.id !== taskId);
      await updateTasks(db, newTasks);
      res.status(200).json({ id: taskId });
    }
  } catch (e) {
    res.status(500).send({ message: "Ups something went wrong", error: e });
  }
}
