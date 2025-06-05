import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching category" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const body = await request.json();
    const category = await prisma.category.update({
      where: {
        id: params.id,
      },
      data: body,
    });
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating category" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    await prisma.category.delete({
      where: {
        id: params.id,
      },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting category" },
      { status: 500 }
    );
  }
}
