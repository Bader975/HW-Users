import * as jwt from "jsonwebtoken";

import  express,{Application} from "express";
import  RouterUser  from "./routes/user.route";

import * as dotenv from "dotenv";
import { connectDB } from "./config/db";


const app:Application= express();
app.use(express.json());
dotenv.config();
connectDB();

app.use('/',RouterUser);


// Port

app.listen(3008, () => console.log("Server Started"));
