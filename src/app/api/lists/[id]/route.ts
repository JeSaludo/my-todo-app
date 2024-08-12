import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: any) {
  try {
    const reqBody = await request.json();
    const { title, isArchived } = await reqBody;

    const list = await db.list.update({
      where: {
        id: params.id,
      },
      data: {
        title: title,
        isArchived: isArchived,
      },
    });

    return NextResponse.json({
      message: "List Updated Successfully",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
