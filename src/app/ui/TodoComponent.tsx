"use client";

import React, { FormEvent, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { CircleEllipsis } from "lucide-react";
import { GripVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Ellipsis } from "lucide-react";
import { Pencil } from "lucide-react";
export interface List {
  id: string;
  title: string;
  card: Card[];
}
export interface Card {
  id: string;
  title: string;
  isCompleted: boolean;
}

async function getTask() {
  const res = await fetch(`${process.env.DOMAIN_NAME}/api/lists`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data.tasks || [];
}

export default function TaskComponent() {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);

  const [newlistTitle, setNewListTitle] = useState("");
  const [newCardTitle, setNewCardTitle] = useState("");

  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const [isAddTaskOpen, setAnotherTaskOpen] = useState(false);

  const [editedCards, setEditedCards] = useState<{ [key: string]: string }>({});
  const [editedTitle, setEditedTitle] = useState<{ [key: string]: string }>({});
  const [editedCheckbox, setEditedCheckbox] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/lists");
      const data = await response.json();
      setLists(data.tasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCard = async (e: FormEvent, listId: string) => {
    e.preventDefault();

    const response = await fetch("/api/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cardName: newCardTitle, listId }),
    });

    if (response.ok) {
      setNewCardTitle("");
      fetchTasks();
    }
  };

  const handleAddList = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listName: newlistTitle }),
    });

    if (response.ok) {
      setNewListTitle("");
      setAnotherTaskOpen(false);
      fetchTasks();
    }
  };

  const handleEditList = async (
    e: FormEvent,
    listId: string,
    isArchived?: boolean
  ) => {
    e.preventDefault();

    const updatedTitle = editedTitle[listId];
    const response = await fetch(`/api/lists/${listId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: updatedTitle, isArchived }),
    });

    if (response.ok) {
      fetchTasks();
    }
  };

  const handleEditCard = async (
    e: FormEvent,
    cardId: string,
    isArchived?: boolean
  ) => {
    e.preventDefault();

    const updatedTitle = editedCards[cardId];
    const response = await fetch(`/api/cards/${cardId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: updatedTitle, isArchived: isArchived }),
    });

    if (response.ok) {
      fetchTasks();
    }
  };

  const handleCheckboxChange = async (cardId: string, isCompleted: boolean) => {
    const newCompletedState = !isCompleted;

    setEditedCheckbox((prevState) => {
      const newState = {
        ...prevState,
        [cardId]: newCompletedState,
      };
      return newState;
    });

    const response = await fetch(`/api/cards/${cardId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isCompleted: newCompletedState }),
    });

    if (response.ok) {
      fetchTasks();
    }
  };

  return (
    <div className="my-4 ">
      <div className="flex gap-4 items-start">
        {lists && (
          <div className=" flex items-baseline gap-4">
            {lists.map((list: List) => (
              <Card className="w-[300px]" key={list.id}>
                <CardHeader className="p-2">
                  <div className="relative">
                    <Input
                      className="border-none text-xl font-bold"
                      value={editedTitle[list.id] || list.title}
                      onChange={(e) =>
                        setEditedTitle({
                          ...editedTitle,
                          [list.id]: e.target.value,
                        })
                      }
                      onBlur={(e) => handleEditList(e, list.id)}
                    />
                    <div className="absolute top-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="focus:border-none">
                          <Ellipsis></Ellipsis>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => handleEditList(e, list.id, true)}
                          >
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuItem>Copy</DropdownMenuItem>
                          <DropdownMenuItem>Move</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 px-4">
                  <ul className="space-y-2 ">
                    {list.card.map((card: Card) => (
                      <li key={card.id} className="flex justify-items-center">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            className="rounded-full"
                            checked={
                              editedCheckbox[card.id] ?? card.isCompleted
                            }
                            onCheckedChange={() =>
                              handleCheckboxChange(
                                card.id,
                                editedCheckbox[card.id] ?? card.isCompleted
                              )
                            }
                          />

                          <Input
                            className={`px-4 flex-grow ${
                              card.isCompleted ? "text-gray-300" : ""
                            } transition-colors ease-in-out duration-150`}
                            value={editedCards[card.id] || card.title}
                            onChange={(e) =>
                              setEditedCards({
                                ...editedCards,
                                [card.id]: e.target.value,
                              })
                            }
                            onBlur={(e) => handleEditCard(e, card.id)}
                          />
                          <div className="">
                            <DropdownMenu>
                              <DropdownMenuTrigger className="focus:border-none">
                                <CircleEllipsis className=" p-1" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem
                                  onClick={(e) =>
                                    handleEditCard(e, card.id, true)
                                  }
                                >
                                  Archive{" "}
                                </DropdownMenuItem>
                                <DropdownMenuItem>Copy</DropdownMenuItem>
                                <DropdownMenuItem>Move</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {selectedTaskId == list.id ? (
                    <div className="space-y-2">
                      <Input
                        className=""
                        placeholder="Enter a name for this card"
                        value={newCardTitle}
                        onChange={(e) => setNewCardTitle(e.target.value)}
                      />
                      <div className="flex gap-2 ">
                        <Button onClick={(e) => handleAddCard(e, list.id)}>
                          Add Card
                        </Button>
                        <Button
                          variant={"secondary"}
                          onClick={() => setSelectedTaskId(null)}
                          className=""
                        >
                          <X />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="">
                      <Button onClick={() => setSelectedTaskId(list.id)}>
                        Add Card
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Card className="w-[300px]">
          <div
            className={`transition-all delay-100 duration-300 ease-in-out ${
              isAddTaskOpen
                ? "opacity-100 transform scale-100"
                : "opacity-0 transform scale-95"
            }`}
            style={{ height: isAddTaskOpen ? "auto" : 0, overflow: "hidden" }}
          >
            {isAddTaskOpen && (
              <CardContent>
                <div>
                  <Input
                    className="my-4"
                    placeholder="Enter a name for this list"
                    value={newlistTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                  />
                  <div className="flex gap-3">
                    <Button onClick={handleAddList}>Add List</Button>
                    <Button
                      variant={"secondary"}
                      onClick={() => {
                        setAnotherTaskOpen(false);
                      }}
                      className=""
                    >
                      <X />
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}
          </div>
          {!isAddTaskOpen && (
            <Button
              variant={"secondary"}
              className="w-full transition-all ease-in-out duration-300"
              onClick={() => {
                setAnotherTaskOpen(true);
              }}
            >
              Add Another Task
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
}
