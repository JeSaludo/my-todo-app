import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { listName } = await reqBody;

    const existingTask = await db.list.findFirst({
      where: { title: listName },
    });

    if (existingTask)
      return NextResponse.json({
        message: "Task is already existing",
      });

    await db.list.create({
      data: { title: listName },
    });

    return NextResponse.json(
      { message: "Task Created Successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const tasks = await db.list.findMany({
      where: {
        isArchived: false,
      },
      include: {
        card: {
          where: {
            isArchived: false,
          },
        },
      },
    });
    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
