import { prisma } from '../config/db';
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

import express, { Application, Request, Response } from "express";
const app: Application = express();






// Loging


export const Login = async (req: Request, res: Response) => {
    
        const { email} = req.body;
        const user = await prisma.user.findUnique({

            where: {
                email,
            }


        });



        //   ES6 if else
        if (!user) { res.json({ message: "worng email address!!" }); 
    }
         else if 

            (!await argon2.verify(user.password as string, req.body.password)){
            res.json({ message: `worng password !! ` });
        }else{
            let token = jwt.sign({ 
                id: user.id,
                
             }, process.env.MY_SECRETKEY as string,{expiresIn:'3h'});

            res.status(200).send({ message:`Hello Aging ${user.email} `,
            token:token
        });
        }


    
    // catch (error) {
    //     console.log(error);
    // }
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


export const updateUser= async (req: Request, res: Response) => {

    try {
        // let { id}= req.body
        let { email,password } = req.body

        const updateUser = await prisma.user.update({
            where: {
             id:res.locals.user.id,
            },
            data:{
                email,

                
            }

        })
        res.json({ "msg": "The user  has been updated", updateUser });
    } catch (error) {
        res.json(error)

    }

}



export const deleteUser= async (req: Request, res: Response) => {

    try {
    

        const deleteUser = await prisma.user.delete({
            where: {
             id:res.locals.user.id,
            },
         

        });
        res.json({ "msg": "The user  has been deleted", deleteUser });
    } catch (error) {
        res.json(error)

    }

}


