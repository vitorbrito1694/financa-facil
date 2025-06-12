import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        account: true,
        category: true,
        paymentMethod: true,
      },
    });
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching transactions" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const transaction = await prisma.transaction.create({
      data: body,
      include: {
        account: true,
        category: true,
        paymentMethod: true,
      },
    });
    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating transaction" },
      { status: 500 }
    );
  }
}
