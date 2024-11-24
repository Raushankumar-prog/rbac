import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function POST(req: Request) {
  try {
    const { name } = await req.json();

  
    const newRole = await prisma.role.create({
      data: { name },
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
    
    const roles = await prisma.role.findMany({
      include: { users: true, permissions: true },
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
    const { id, name } = await req.json();

    
    const updatedRole = await prisma.role.update({
      where: { id },
      data: { name },
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
