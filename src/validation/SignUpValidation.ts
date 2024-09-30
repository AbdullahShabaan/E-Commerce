import { z } from "zod";

const signUpSchema = z
  .object({
    firstName: z.string().min(1, "First Name Is Required").max(8),
    lastName: z.string().min(1, "Last Name Is Required").max(8),
    email: z.string().email().min(1, "Email Is Required"),
    password: z
      .string()
      .min(8, "password is at least 8 characters")
      .max(15, "maximum password is 15 characters")
      .regex(/^[A-Za-z0-9]{6,}$/, "Password must be letters and numbers only"),
    confirmPassword: z.string().min(1, "Confirm Password Is Required"),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "Password And Confirm Password Is Not Matching",
    path: ["confirmPassword"],
  });

type TFormInputs = z.infer<typeof signUpSchema>;

export { signUpSchema, type TFormInputs };
