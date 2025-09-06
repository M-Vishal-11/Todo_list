"use client";

import { useEffect, useState } from "react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [list, setList] = useState<Task[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("list");
    if (data) {
      setList(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  function AddItem() {
    if (!search.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      text: search.trim(),
      completed: false,
    };
    setList([...list, newTask]);
    setSearch("");
  }

  function deleteItem(id: number) {
    setList(list.filter((task) => task.id !== id));
  }

  function toggleComplete(id: number) {
    setList(
      list.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <div>
      <div className="ml-4 mt-2 p-4 bg-white shadow-lg rounded-2xl w-[400px]">
        {/* Input + Add button */}
        <div className="flex items-center">
          <input
            placeholder="Enter a task..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="flex-1 bg-amber-50 focus:bg-amber-100 focus:ring-2 focus:ring-amber-300 outline-none mt-2 py-2 px-3 text-lg rounded-lg shadow-sm"
          />
          <button
            className="ml-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition"
            onClick={AddItem}
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <div className="mt-6">
          <ul className="space-y-3">
            {list.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                    className="w-5 h-5 accent-green-500"
                  />
                  <span
                    className={`text-lg font-medium ${
                      task.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {task.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteItem(task.id)}
                  className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                >
                  Del
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
