import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: any) {
  try {
    const reqBody = await request.json();
    const { title, isCompleted, isArchived } = reqBody; // Destructure both fields

    // Create an update object, conditionally including fields if they exist
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (isCompleted !== undefined) updateData.isCompleted = isCompleted;
    if (isArchived !== undefined) updateData.isArchived = isArchived;
    const card = await db.card.update({
      where: {
        id: params.id,
      },
      data: updateData,
    });

    return NextResponse.json({ card, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
