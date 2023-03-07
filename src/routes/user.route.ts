import express from "express";
import { Hello, Login, createUser,  deleteUser,  getallUsers, updateUser } from "../controller/user.controller";
import { validate } from "../middleware/validate";
import { userVaild, userlogin } from "../zod.schema/user.zod";
import auth from "../middleware/auth";

let router = express.Router();


router.get('/user', getallUsers)
router.post('/user/login',validate(userlogin), Login)

router.post('/user',createUser)

router.put('/user',auth, updateUser)
router.delete('/user',auth, deleteUser)





export default router;