"use client";
import { usePostTest } from "@/lib/hooks/usePostTest";
import { useAuth } from "@clerk/nextjs";
import { unauthorized } from "next/navigation";

interface PostTestProps {
    id: string;
    title: string;
    content: string;
    published: boolean;
}

export default function PostTestPage() {
    const { data: postTest } = usePostTest<PostTestProps[]>("api/post-test");
    const { userId, isLoaded } = useAuth();

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (!userId) {
        unauthorized();
    }

    return (
        <div className="min-h-screen mt-28 ml-5 text-2xl space-y-4">
            {postTest?.map((post) => {
                return (
                    <div key={post.id} className="flex justify-center gap-4">
                        <h2 className="text-xl font-semibold">
                            Title: {post.title}
                        </h2>
                        <p className="text-lg font-medium">
                            content: {post.content}
                        </p>
                        <p className="text-lg font-medium">
                            content: {post.published}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}
