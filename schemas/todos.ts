

import { z } from "zod";


export const todoCreateSchema = z.object({
  title: z.string().min(1, "Todo cannot be empty"),
});


export const todoResponseSchema = z.object({
  _id: z.string(),
  title: z.string(),
  completed: z.boolean(),
  createdAt: z.string(),
});

export type TodoCreateInput = z.infer<typeof todoCreateSchema>;
export type TodoResponse = z.infer<typeof todoResponseSchema>;
