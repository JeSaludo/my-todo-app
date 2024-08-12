"use client";
import React, { useState, useTransition } from "react";
import Button from "./button";
import { Plus, X } from "lucide-react";
import { PostTask } from "@/action/task";

export default function AddTask() {
  const [taskName, setTaskName] = useState("");

  const [isPending, startTransition] = useTransition();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      PostTask({ taskName }).then((data) => {});
    });
  };
  return (
    <div className="w-[224px] items-baseline   p-2 border-2 rounded-md flex-none">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task name..."
          value={taskName}
          className="px-4 py-2  w-full "
          required
          onChange={(e) => setTaskName(e.target.value)}
        />
        <div className="flex gap-3">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}
