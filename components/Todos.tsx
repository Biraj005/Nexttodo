"use client";
import { useState } from "react";
import type { TodoResponse } from "@/schemas/todos"; 

function Todos() {
  const [newTodo, setNewTodo] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const [todos, setTodos] = useState<TodoResponse[]>([
    { id: "1", title: "Learn Next.js", completed: false, createdAt: new Date().toISOString() },
    { id: "2", title: "Practice DSA", completed: true, createdAt: new Date().toISOString() },
  ]);

  const toggleChange = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const addTodo =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTodo.trim()) {
      setFormError("Todo can't be empty");
      return;
    }

    // setTodos((prev) => [
    //   ...prev,
    //   {
    //     id: crypto.randomUUID(),
    //     title: newTodo.trim(),
    //     completed: false,
    //     createdAt: new Date().toISOString(),
    //   },
    // ]);

    // setNewTodo("");
    // setFormError(null);
    try {
      
    } catch (error) {
      
    }
  };

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
            key={todo.id}
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
              onChange={() => toggleChange(todo.id)}
              className="h-4 w-4 cursor-pointer"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
