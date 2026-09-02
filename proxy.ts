import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// ✅ IMPORTANT: Only use auth.protect() for UI pages, NOT API routes
// API routes should handle auth checks themselves and return 401
const isProtectedPage = createRouteMatcher([
    "/dashboard(.*)",
    "/protected(.*)",
    // API routes are NOT included here - they handle auth themselves
]);

export default clerkMiddleware(async (auth, req) => {
    // ✅ Initialize auth context for ALL requests
    // This makes auth() available in API routes and pages
    // const authState = await auth();

    // console.log("========== CLERK PROXY ==========");
    // console.log("path:", req.nextUrl.pathname);
    // console.log("userId:", authState.userId);
    // console.log("isAuthenticated:", !!authState.userId);
    // console.log("================================");

    // ✅ Only protect UI pages - NOT API routes
    // Pages redirect to /sign-in, APIs should return 401 themselves
    if (isProtectedPage(req)) {
        await auth.protect();
    }
});

// export default clerkMiddleware();

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
        "/__clerk/:path*",
        // "/__clerk/(.*)",
    ],
};
