import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Email must be valid"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type IUserSchema = z.infer<typeof UserSchema>;


export const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
});
export type ILoginSchema = z.infer<typeof LoginSchema>;