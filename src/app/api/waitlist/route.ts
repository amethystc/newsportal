import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/write-client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, fullName } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 },
      );
    }

    // Use dummy full name if not provided
    const finalFullName = fullName || "Anonymous User";

    // Create waitlist entry in Sanity
    const result = await writeClient.create({
      _type: "waitlist",
      email: email,
      fullName: finalFullName,
      notes: "",
      signedUpAt: new Date().toISOString(),
    });

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Successfully added to waitlist",
      data: {
        id: result._id,
        email: result.email,
        fullName: result.fullName,
        signedUpAt: result.signedUpAt,
      },
    });
  } catch (error) {
    console.error("Error adding to waitlist:", error);

    // Handle duplicate email error (Sanity specific)
    if (error instanceof Error && error.message.includes("duplicate")) {
      return NextResponse.json(
        { success: false, message: "Email already exists in waitlist" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
