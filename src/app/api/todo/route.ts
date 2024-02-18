import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();

  console.log(body);

  const user = await prisma.user.findUnique({
    where: {
      email: body.session.user.email,
    },
  });

  if (user) {
    const createdTodo = await prisma.todo.create({
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        status: "incomplete",
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return NextResponse.json(createdTodo, { status: 201 });
  }

  return NextResponse.json("fail");
}
