import { Request, Response } from "express";
import Todo from "../../models/todo";
import { ITodo } from "../../types/todo";

const getTodos = async (req: Request, res: Response) => {
  try {
    const todos: ITodo[] = await Todo.find();
    res.status(200).json({ todos });
  } catch (error) {
    throw error;
  }
};

const addTodo = async (req: Request, res: Response) => {
  try {
    const body = req.body as Pick<ITodo, "name" | "description" | "status">;
    const todo: ITodo = new Todo({
      name: body.name,
      description: body.description,
      status: body.status,
    });
    const newTodo: ITodo = await todo.save();
    const allTodos: ITodo[] = await Todo.find();
    res
      .status(201)
      .json({ message: "Todo added", todo: newTodo, todos: allTodos });
  } catch (error) {
    throw new Error("Error adding todo");
  }
};
const updateTodo = async (req: Request, res: Response) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate({ _id: id });
    const allTodos: ITodo[] = await Todo.find();
    res.status(200).json({
      message: "Todo updated",
      todo: updateTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw new Error("Error updating todo");
  }
};
const deleteTodo = async (req: Request, res: Response) => {
  try {
    const deletedTodo: ITodo | null = await Todo.findByIdAndDelete(
      req.params.id
    );
    const allTodos: ITodo[] = await Todo.find();
    res.status(200).json({
      message: "Todo deleted",
      todo: deletedTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw new Error("Error deleting todo");
  }
};

export { getTodos, addTodo, updateTodo, deleteTodo };
