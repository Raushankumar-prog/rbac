import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";



export async function POST(req: Request) {
  try {
    const { email, password, name, roleId } = await req.json();

    if (!email || !password || !name || !roleId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

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
      include: {
        role: {
          include: {
            permission: true, // Include permission details if needed
          },
        },
      },
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
    const { id, email, password, name, roleId } = await req.json();

    if (!id || (!email && !password && !name && !roleId)) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const userExists = await prisma.user.findUnique({ where: { id } });
    if (!userExists) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    if (roleId) {
      const roleExists = await prisma.role.findUnique({ where: { id: roleId } });
      if (!roleExists) {
        return NextResponse.json(
          { success: false, error: "Role not found" },
          { status: 404 }
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { email, password, name, roleId },
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

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing user ID" },
        { status: 400 }
      );
    }

    const userExists = await prisma.user.findUnique({ where: { id } });
    if (!userExists) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    await prisma.user.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
