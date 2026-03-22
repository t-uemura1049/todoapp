"use client";

import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos([...todos, { id: Date.now(), text: trimmed, completed: false }]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addTodo();
  };

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-md">
        {/* ヘッダー */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-indigo-700 tracking-tight">Todoリスト</h1>
          {todos.length > 0 && (
            <p className="mt-2 text-sm text-gray-500">
              残り <span className="font-semibold text-indigo-600">{remaining}</span> 件
            </p>
          )}
        </div>

        {/* 入力エリア */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="タスクを入力..."
            className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <button
            onClick={addTodo}
            className="rounded-xl bg-indigo-600 px-5 py-3 text-white font-semibold shadow-sm hover:bg-indigo-700 active:scale-95 transition-all"
          >
            追加
          </button>
        </div>

        {/* タスクリスト */}
        <div className="space-y-3">
          {todos.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg">タスクがありません</p>
              <p className="text-sm mt-1">上の入力欄からタスクを追加してください</p>
            </div>
          )}
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm border transition-all ${
                todo.completed ? "border-gray-100 opacity-60" : "border-gray-200"
              }`}
            >
              {/* チェックボックス */}
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  todo.completed
                    ? "bg-indigo-500 border-indigo-500"
                    : "border-gray-300 hover:border-indigo-400"
                }`}
                aria-label={todo.completed ? "未完了に戻す" : "完了にする"}
              >
                {todo.completed && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>

              {/* テキスト */}
              <span
                className={`flex-1 text-gray-800 ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.text}
              </span>

              {/* 削除ボタン */}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="flex-shrink-0 text-gray-300 hover:text-red-400 transition-colors p-1 rounded-lg hover:bg-red-50"
                aria-label="削除"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* 完了済みタスクをまとめて削除 */}
        {todos.some((t) => t.completed) && (
          <div className="mt-4 text-right">
            <button
              onClick={() => setTodos(todos.filter((t) => !t.completed))}
              className="text-sm text-gray-400 hover:text-red-400 transition-colors"
            >
              完了済みをすべて削除
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
