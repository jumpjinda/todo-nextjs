import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

export async function PUT(request: NextRequest) {
  const body = await request.json();

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (user) {
    if (body.pathname === "/all-tasks") {
      const getAllTodo = await prisma.todo.findMany({
        where: {
          userId: user.id,
        },
      });
      return NextResponse.json(getAllTodo, { status: 200 });
    }

    if (body.pathname === "/important") {
      const getImportant = await prisma.todo.findMany({
        where: {
          userId: user.id,
          category: "important",
          status: "Incomplete",
        },
      });

      if (getImportant) {
        return NextResponse.json(getImportant, { status: 200 });
      }
      return NextResponse.error;
    }

    if (body.pathname === "/completed") {
      const getCompleted = await prisma.todo.findMany({
        where: {
          userId: user.id,
          status: "Completed",
        },
      });
      console.log(getCompleted);
      if (getCompleted) {
        return NextResponse.json(getCompleted, { status: 200 });
      }
      return NextResponse.error;
    }

    if (body.pathname === "/do-it-now") {
      const getDoItNow = await prisma.todo.findMany({
        where: {
          userId: user.id,
          category: "do-it-now",
          status: "Incomplete",
        },
      });

      if (getDoItNow) {
        return NextResponse.json(getDoItNow, { status: 200 });
      }
      return NextResponse.error;
    }
  }

  return NextResponse.error;
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const isDuplicateUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (isDuplicateUser) {
      return NextResponse.json("User has already exist!", { status: 202 });
    }

    if (isDuplicateUser === null) {
      const userCreated = await prisma.user.create({
        data: {
          email: body.email,
          name: body.name,
          hashedPassword: await hash(body.password, 10),
        },
      });

      if (!userCreated) {
        return NextResponse.json("Fail to create user!", { status: 203 });
      }

      if (userCreated) {
        return NextResponse.json(userCreated, { status: 201 });
      }
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
