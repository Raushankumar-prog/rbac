import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    
    const newPermission = await prisma.permission.create({
      data: { name },
    });

    return NextResponse.json({ success: true, permission: newPermission }, { status: 201 });
  } catch (error) {
    console.error("Error creating permission:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create permission" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    
    const permissions = await prisma.permission.findMany({
      include: { roles: true },
    });

    return NextResponse.json({ success: true, permissions });
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch permissions" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id, name } = await req.json();

   
    const updatedPermission = await prisma.permission.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json({ success: true, permission: updatedPermission });
  } catch (error) {
    console.error("Error updating permission:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update permission" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    
    await prisma.permission.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Permission deleted" });
  } catch (error) {
    console.error("Error deleting permission:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete permission" },
      { status: 500 }
    );
  }
}
