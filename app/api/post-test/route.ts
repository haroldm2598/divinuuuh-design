import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
    try {
        // Get auth - now properly initialized by proxy.ts
        const { userId } = await auth();

        // Explicit check - should never be null now
        if (!userId) {
            console.warn("❌ Auth failed: No userId found");
            return NextResponse.json(
                { error: "Unauthorized - No user session" },
                { status: 401 },
            );
        }
        console.log("===============");
        console.log("Authenticated User ID:", userId);
        console.log("===============");

        const postTest = await prisma.postTest.findMany({
            orderBy: {
                id: "asc",
            },
        });

        return NextResponse.json(postTest);
    } catch (err) {
        console.error("❌ API Error:", err);

        return NextResponse.json(
            { error: "Failed to fetch PostTest" },
            { status: 500 },
        );
    }
}
