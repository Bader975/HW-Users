import { z,TypeOf } from "zod";

export const taskVaild = z.object({
    body:z.object({
      title:z.string({
            required_error: "title is required",
            invalid_type_error: "title must be a string",
    })
  .min(2, { message: " Task Must be 2 or more characters long" }),



       


  isCompleted :z.boolean({
    required_error: "isCompleted Or Not is required",
    invalid_type_error: "isCompleted must be a boolean",
    
}).optional()






}),
});






export type task = TypeOf<typeof taskVaild>["body"];
