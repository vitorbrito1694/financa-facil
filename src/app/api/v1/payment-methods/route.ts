import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const search = searchParams.get("search") || undefined;
    const type = searchParams.get("type") || undefined;
    const userId = searchParams.get("userId");

    console.log(userId);

    // Return error if userId is not provided
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const where: any = {
      userId: userId, // Add userId to where clause
    };

    if (search) {
      where.name = {
        contains: search,
        mode: "insensitive",
      };
    }

    if (type) {
      where.type = type;
    }

    const [paymentMethods, total] = await Promise.all([
      prisma.paymentMethod.findMany({
        where,
        take: limit,
        skip: skip,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.paymentMethod.count({ where }),
    ]);

    return NextResponse.json({
      data: paymentMethods,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
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
