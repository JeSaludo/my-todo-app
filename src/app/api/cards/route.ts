import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { cardName, listId } = reqBody;

    const newCard = await db.card.create({
      data: {
        title: cardName,
        isCompleted: false,
        listId,
      },
    });
    return NextResponse.json(
      { message: "Card Created Successfully", newCard },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
