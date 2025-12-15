import mongoose, { Schema, InferSchemaType, Types } from "mongoose";

const TodoSchema = new Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },

    userId: {
      type: Types.ObjectId,
      ref: "User",     
      required: true,
    },
  },
  { timestamps: true }
);

export type TodoDocument = InferSchemaType<typeof TodoSchema>;

export const Todo =
  mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
