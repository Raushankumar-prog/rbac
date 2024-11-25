import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, permissionName } = await req.json();

    // Check if the permission exists
    const permission = await prisma.permission.findUnique({
      where: { name: permissionName },
    });
    if (!permission) {
      return NextResponse.json(
        { success: false, error: "Permission not found" },
        { status: 400 }
      );
    }

    // Create the role with the associated permission
    const newRole = await prisma.role.create({
      data: {
        name,
        permissionName: permission.name,
      },
    });

    return NextResponse.json({ success: true, role: newRole }, { status: 201 });
  } catch (error) {
    console.error("Error creating role:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create role" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Fetch roles along with their permissions and users
    const roles = await prisma.role.findMany({
      include: {
        permission: true, // Include associated permission details
        users: true,      // Include associated users
      },
    });

    return NextResponse.json({ success: true, roles });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch roles" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id, name, permissionName } = await req.json();

    // Check if the permission exists
    const permission = await prisma.permission.findUnique({
      where: { name: permissionName },
    });
    if (!permission) {
      return NextResponse.json(
        { success: false, error: "Permission not found" },
        { status: 400 }
      );
    }

    // Update the role with the new name and permission
    const updatedRole = await prisma.role.update({
      where: { id },
      data: {
        name,
        permissionName: permission.name,
      },
    });

    return NextResponse.json({ success: true, role: updatedRole });
  } catch (error) {
    console.error("Error updating role:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update role" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    // Delete the role
    await prisma.role.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Role deleted" });
  } catch (error) {
    console.error("Error deleting role:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete role" },
      { status: 500 }
    );
  }
}
