import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const paymentMethods = await prisma.paymentMethod.findMany();
    return NextResponse.json(paymentMethods);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching payment methods" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const paymentMethod = await prisma.paymentMethod.create({
      data: body,
    });
    return NextResponse.json(paymentMethod, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating payment method" },
      { status: 500 }
    );
  }
}
