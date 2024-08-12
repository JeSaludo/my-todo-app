"use client";
import React, { useEffect, useState } from "react";
import Button from "./button";
import { Plus, X } from "lucide-react";
import CardComponent from "./todo-item";
import AddTask from "./Task";

export interface Task {
  id: string;
  title: string;
  card: Card[];
}

export interface Card {
  id: string;
  title: string;
  isCompleted: boolean;
}

export default function TodoList() {
  return (
    <div className="flex gap-4">
      <div className="border p-2 border-red" id="draggableElement">
        <h1>Drag Here</h1>
        <li>Hello</li>
      </div>

      <div className="border p-2 border-red" id="droppableArea">
        <h1>Drop Here</h1>
        <li>Hello</li>
      </div>
    </div>
  );
}
