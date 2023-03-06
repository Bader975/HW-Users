import express from "express";
import { Hello, Login, createUser,  getallUsers } from "../controller/user.controller";
import { validate } from "../middleware/validate";
import { userVaild } from "../zod.schema/user.zod";

let router = express.Router();


router.get('/user', getallUsers)
router.get('/user/login', Login)

router.post('/user',validate(userVaild),createUser)







export default router;