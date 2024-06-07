import { getTokenData } from "@/src/utils/getTokenData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const tokenData = await getTokenData(request);

  if (!tokenData.ok) {
    return NextResponse.json(
      {
        message: "No token found",
      },
      { status: 400 }
    );
  }

  const data = await tokenData.json();
  return NextResponse.json(
    { message: "data extracted succesfully", data: data },
    { status: 200 }
  );
}
