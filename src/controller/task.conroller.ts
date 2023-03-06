import { prisma } from "../config/db";
import express, { Application, Request, Response } from "express";
const app: Application = express();
app.use(express.json());

export const getUserTask = async (req: Request, res: Response) => {
    try {
        let { userId } = req.params;
        let tasks = await prisma.task.findMany({
            where: {
                userId,
            },
            // select: {
            //     title: true,

            //     user: {
            //         select: {
            //             name: true,
            //         },
            //     },
            // },
        });
        if (tasks) {
            res.status(200).json(tasks);
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const createTask = async (req: Request, res: Response) => {
    try {
        const newTask = await prisma.task.create({
            data: {
                title: req.body.title,
                userId: req.body.userId,
            },
        });
        if (newTask) {
            res.status(200).json({ msg: "The Task has been created", newTask });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};
export const updateTask = async (req: Request, res: Response) => {
    try {
        const upadeTask = await prisma.task.updateMany({
            where: {
                id: req.params.id,
                userId: req.body.userId,
            },

            data: {
                title: req.body.title,
                isCompleted: req.body.isCompleted,
            },
        });
        if (upadeTask.count == 0) {
            res.json("no recoder was updated");
        } else {
            res.status(200).json({ msg: "The Task has been Updated", upadeTask });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const deleteTask = await prisma.task.deleteMany({
            where: {
                id: req.params.id,
                userId: req.body.userId,
            },
        });
        if (deleteTask.count == 0) {
            res.json("no recoder was deleted");
        } else {
            res.status(200).json({ msg: "The Task has been deleted", deleteTask });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};
