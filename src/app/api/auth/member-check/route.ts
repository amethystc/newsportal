import { NextResponse } from "next/server";
import { client } from "@/sanity/client";
import { memberByEmailQuery } from "@/sanity/queries";

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Use the client without a token for read-only access to published members
        // In a production app, you might want to use a restricted token for privacy
        const member = await client.fetch(memberByEmailQuery, { email });

        if (!member) {
            return NextResponse.json(
                { error: "No active membership found for this email" },
                { status: 404 }
            );
        }

        return NextResponse.json({ member });
    } catch (error) {
        console.error("Auth API Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
