import { ITodo } from "./../types/todo";
import { Schema, model } from "mongoose";

const todoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

export default model<ITodo>("Todo", todoSchema);
