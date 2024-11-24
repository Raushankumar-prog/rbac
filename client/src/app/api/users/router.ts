import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";


export async function POST(req: Request) {
  try {
    const { email, password, name, roleId } = await req.json();

    const newUser = await prisma.user.create({
      data: {
        email,
        password, 
        name,
        roleId,
      },
    });

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create user" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: { role: true }, // Fetch roles if needed
    });

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}


export async function PUT(req: Request) {
  try {
    const { id, ...data } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
