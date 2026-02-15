import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> } // params is a Promise in Next.js 15+
) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        // Verify snippet belongs to user
        const snippet = await prisma.snippet.findUnique({
            where: { id },
            select: { userId: true },
        });

        if (!snippet) {
            return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
        }

        if (snippet.userId !== session.user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        await prisma.snippet.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("❌ API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        // Parse body
        const body = await req.json();
        const { title, explanation, code } = body;

        // Verify snippet belongs to user
        const snippet = await prisma.snippet.findUnique({
            where: { id },
            select: { userId: true },
        });

        if (!snippet) {
            return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
        }

        if (snippet.userId !== session.user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const updatedSnippet = await prisma.snippet.update({
            where: { id },
            data: {
                title: title || undefined,
                explanation: explanation || null, // Allow clearing explanation
                code: code || undefined,
                // We could also update language if we detected it, but simpler to leave for now or trust frontend/AI separately
            },
        });

        return NextResponse.json({ success: true, snippet: updatedSnippet });
    } catch (error) {
        console.error("❌ API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
