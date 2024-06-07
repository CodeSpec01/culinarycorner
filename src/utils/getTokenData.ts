import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const getTokenData = async (request: NextRequest) => {
  const token = request.cookies.get("token");

  if (!token) {
    return NextResponse.json(
      {
        message: "No token found",
      },
      { status: 401 }
    );
  }

  if (!token!.value) {
    return NextResponse.json(
      {
        message: "No token found",
      },
      { status: 401 }
    );
  }

  const tokenData = await jwt.verify(
    token!.value || "",
    process.env.JWT_SECRET!
  );

  return NextResponse.json(
    {
      message: "Token Data extracted successfully",
      data: tokenData,
    },
    { status: 200 }
  );
};
