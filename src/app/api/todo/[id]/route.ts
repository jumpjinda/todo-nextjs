import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: NextRequest) {
  const body = await request.json();

  const updatedTodo = await prisma.todo.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      description: body.description,
      category: body.category,
    },
  });

  if (updatedTodo) {
    return NextResponse.json(updatedTodo, { status: 200 });
  }

  return NextResponse.error;
}

export async function DELETE(request: NextRequest) {
  const todoId = request.url.split("/").pop();

  const deletedTodo = await prisma.todo.delete({
    where: {
      id: todoId,
    },
  });

  if (deletedTodo) {
    return NextResponse.json(deletedTodo, { status: 200 });
  }

  return NextResponse.error;
}
