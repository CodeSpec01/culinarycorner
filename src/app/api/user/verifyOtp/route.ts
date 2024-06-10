import User from "@/src/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const user = await User.findOne({ forgotPasswordCode: data.code }).select(
      "-password"
    );

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid OTP",
        },
        { status: 400 }
      );
    }
    if (user.forgotPasswordCodeExpiry! < new Date()) {
      return NextResponse.json(
        {
          message: "OTP expired",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        message: "OTP verified successfully",
      },
      { status: 200 }
    );
    
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
