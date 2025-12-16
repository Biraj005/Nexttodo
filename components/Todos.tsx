"use client";
import { useEffect, useState } from "react";
import type { TodoResponse } from "@/schemas/todos";
import axios from "axios";

function Todos() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [newTodo, setNewTodo] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const [todos, setTodos] = useState<TodoResponse[]>([]);

  const toggleChange = async (id: string) => {
    try {
      const result = await axios.put(
        `/api/todos/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (result.data.success) {
        setTodos((prev) =>
          prev.map((todo) =>
            todo._id === id ? { ...todo, completed: true } : todo
          )
        );
      } else {
        console.log(result.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
      }
     
        console.log(error);
   
    }
  };

  const addTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTodo.trim()) {
      setFormError("Todo can't be empty");
      return;
    }
    try {
      const result = await axios.post(
        "/api/todos",
        {
          title: newTodo,
        },
        {
          withCredentials: true,
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      console.log(result.data);
      if (result.data.success) {
        const { _id, title, completed, createdAt } = result.data.todo;
        setTodos((prev) => [...prev, { _id, title, completed, createdAt }]);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setServerError(error.response?.data.message);
      }
    }
    setNewTodo("");
  };

  useEffect(() => {
    const Init = async () => {
      try {
        console.log("hiii");
        const result = await axios.get("/api/todos", {
          withCredentials: true,
        });

        if (result.data.success) {
          console.log(result.data);
          setTodos(result.data.todos);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    Init();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center pt-10">
      <h1 className="mb-6 text-2xl font-bold">Todos</h1>

      <form
        onSubmit={addTodo}
        className="mb-2 flex w-full max-w-md items-center gap-2 rounded-xl bg-white p-2 shadow"
      >
        <input
          type="text"
          placeholder="Enter task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          type="submit"
          className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white transition hover:bg-green-700 active:scale-95"
        >
          Add
        </button>
      </form>

      {formError && <p className="mb-4 text-sm text-red-500">{formError}</p>}
      {todos.length === 0 && <p className="text-gray-500">No todos yet</p>}

      <ul className="w-full max-w-md space-y-3">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex items-center justify-between rounded-lg border px-4 py-3 shadow-sm transition hover:bg-gray-50"
          >
            <span
              className={`text-sm ${
                todo.completed ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              {todo.title}
            </span>

            <input
              type="checkbox"
              checked={todo.completed}
              disabled={todo.completed}
              onChange={() => toggleChange(todo._id)}
              className="h-4 w-4 cursor-pointer"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
