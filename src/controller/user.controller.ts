import { prisma } from '../config/db';
import * as argon2 from "argon2";
import express, { Application, Request, Response } from "express";
const app: Application = express();
app.use(express.json());




// Loging


export const Login = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const userlogin = await prisma.user.findFirst({
            
            where:email,

            
        });
        const vi = await argon2.verify("$argon2id$v=19$m=65536,t=3,p=4$CNIKPxqjVSt92JLMoN7EtA$dPIrN3CXM5xhVcfhVpdoM76jQm0lpscBxbEgmVFSvvM", req.body.password)
console.log(vi);

        //   ES6 if else
        userlogin ? res.json({ message: "worng email or password !!" }) : res.json({ message: `weclome back ${email}` });
    } catch (error) {
        console.log(error);
    }
};


// Read 
export const getallUsers = async (req: Request, res: Response) => {
    let users = await prisma.user.findMany()
    res.json(users);
    // res.json();
}
export const Hello = async (req: Request, res: Response) => {

    res.json({ "msg": "Hello visters" })
}




// Creat
export const createUser = async (req: Request, res: Response) => {
    let hashedPassword = await argon2.hash(req.body.password);
    try {
        const newUser = await prisma.user.create({
            data: {
                email: req.body.email,
                name: req.body.name,
                password: hashedPassword
            }
        });

        if (newUser) {
            res.status(200).json({ "msg": "The user has been created", newUser })
        }
    }
    catch (error) {
        res.status(500).json(error)

    }
}



