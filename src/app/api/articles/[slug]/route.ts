import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/client";
import { articleQuery } from "@/sanity/queries";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Slug parameter is required" },
        { status: 400 }
      );
    }

    // Fetch article from Sanity
    const article = await client.fetch(articleQuery, { slug });

    if (!article) {
      return NextResponse.json(
        { success: false, message: "Article not found" },
        { status: 404 }
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      data: article,
    });

  } catch (error) {
    console.error("Error fetching article:", error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}