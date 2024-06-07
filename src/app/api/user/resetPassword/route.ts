import User from "@/src/models/user.model";
import { transporter, mailOptions } from "@/src/utils/nodemailer";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  const email = request.headers.get("email");

  try {
    const foundUser = await User.findOne({ email: email }).select("-password");

    if (!foundUser) {
      return NextResponse.json(
        {
          message: "User doesn't exist with this email",
        },
        { status: 404 }
      );
    }

    const OTP = Math.floor(100000 + Math.random() * 900000).toString();

    foundUser.forgotPasswordCode = OTP;
    foundUser.forgotPasswordCodeExpiry = new Date(Date.now() + 60 * 60 * 1000);
    await foundUser.save();

    console.log("found user => ", foundUser);

    const res = await transporter.sendMail({
      ...mailOptions,
      to: email!,
      subject: "Reset Your Password",
      html: `<h1>Test Email</h1><p> Test email body content ${foundUser.username} </p> <p> Your OTP is ${OTP} </p>`,
    });

    return NextResponse.json(
      {
        message: "OTP sent successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("error => ", error);

    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const user = await User.findOne({ email: data.email });

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(data.password, salt);

    user!.password = hashedPassword;
    user!.forgotPasswordCode = "";
    await user!.save();

    const response = NextResponse.json(
      {
        message: "Password reset successfully",
      },
      { status: 200 }
    );

    const tokenData = {
      username: user!.username,
      email: user!.email,
      avatar: user!.avatar,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!);

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
