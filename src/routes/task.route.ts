import express from "express";

import { createTask, deleteTask, getUserTask, updateTask } from "../controller/task.conroller";
import { validate } from "../middleware/validate";
import { taskVaild } from "../zod.schema/task.zod ";

let router = express.Router();



router.get('/task/:userId', getUserTask)
router.post('/task',validate(taskVaild),createTask)
router.put('/task/:id', updateTask)
router.delete('/task/:id', deleteTask)






export default router;