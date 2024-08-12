import Image from "next/image";
import Header from "./ui/header";
import TodoList from "./ui/todo-list";
import AddTask from "./ui/Task";
import TaskComponent from "./ui/TodoComponent";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="">
      <Header />
      <div className="flex gap-3">
        <TaskComponent></TaskComponent>
      </div>
      {/* <TodoList /> */}
    </main>
  );
}
