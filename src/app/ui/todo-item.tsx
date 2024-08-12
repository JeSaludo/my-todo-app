import React, { useEffect, useState } from "react";
import { Card } from "./todo-list";

interface CardComponentProps {
  card: Card;
}

export default function CardComponent({ card }: CardComponentProps) {
  return (
    <div key={card.id} className="border rounded-md p-2">
      <p>{card.title}</p>
    </div>
  );
}
