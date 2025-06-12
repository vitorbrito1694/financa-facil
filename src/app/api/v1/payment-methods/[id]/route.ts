import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const paymentMethod = await prisma.paymentMethod.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!paymentMethod) {
      return NextResponse.json(
        { error: "Payment method not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(paymentMethod);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching payment method" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const body = await request.json();
    const paymentMethod = await prisma.paymentMethod.update({
      where: {
        id: params.id,
      },
      data: body,
    });
    return NextResponse.json(paymentMethod);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating payment method" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    await prisma.paymentMethod.delete({
      where: {
        id: params.id,
      },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting payment method" },
      { status: 500 }
    );
  }
}
