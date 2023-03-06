import { z,TypeOf } from "zod";

export const userVaild = z.object({
    body:z.object({
        name:z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
    })
  .min(2, { message: " name Must be 2 or more characters long" }),



        password :z.string({
            required_error: "password is required",
            invalid_type_error: "password must be a Number and String",
    })
  .min(5, { message: "Must be 5 or more characters long" }),
  


  email :z.string({
    required_error: "email is required",
    
})
.email({ message: "Invalid email address" })






}),
});






export type userVaild = TypeOf<typeof userVaild>["body"];
