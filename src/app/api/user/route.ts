import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

export async function PUT(request: NextRequest) {
  const body = await request.json();

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (user) {
    const getAllTodo = await prisma.todo.findMany({
      where: {
        userId: user.id,
      },
    });
    return NextResponse.json(getAllTodo, { status: 200 });
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
