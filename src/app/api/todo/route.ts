import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  const todo = await prisma.todo.findMany();

  if (todo) {
    return NextResponse.json(todo, { status: 200 });
  }

  return NextResponse.error;
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  if (body.status === "Incomplete") {
    const updatedItem = await prisma.todo.update({
      where: {
        id: body.itemId,
      },
      data: {
        status: "Completed",
      },
    });
    return NextResponse.json(updatedItem, { status: 200 });
  }

  if (body.status === "Completed") {
    const updatedItem = await prisma.todo.update({
      where: {
        id: body.itemId,
      },
      data: {
        status: "Incomplete",
      },
    });
    return NextResponse.json(updatedItem, { status: 200 });
  }

  return NextResponse.error;
}

export async function POST(request: NextRequest) {
  const body = await request.json();

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
        status: "Incomplete",
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return NextResponse.json(createdTodo, { status: 200 });
  }

  return NextResponse.error;
}
