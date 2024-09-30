import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email().min(1, "Email Is Required"),
  password: z.string().min(1, "Password Is Required"),
});
type TFormInputs = z.infer<typeof signInSchema>;

export { signInSchema, type TFormInputs };
