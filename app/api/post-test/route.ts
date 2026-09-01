import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
    try {
        const { userId } = await auth();
        console.log(userId);

        const postTest = await prisma.postTest.findMany({
            orderBy: {
                id: "asc",
            },
        });

        return NextResponse.json(postTest);
    } catch (err) {
        console.error(err);

        return NextResponse.json(
            { error: "Failed to fetch PostTest" },
            { status: 500 },
        );
    }
}
