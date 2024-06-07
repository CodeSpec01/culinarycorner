import { dbConnect } from "@/src/dbconfig/dbConnect";
import User from "@/src/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { transporter, mailOptions } from "@/src/utils/nodemailer";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { identifier, password } = reqBody;

    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User doesn't exists with these credentials",
        },
        { status: 400 }
      );
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          message: "Password is incorrect",
        },
        { status: 400 }
      );
    }

    const OTP = Math.floor(100000 + Math.random() * 900000).toString();

    user.verifyCode = OTP;
    user.verifyCodeExpiry = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();

    const res = await transporter.sendMail({
      ...mailOptions,
      to: user.email,
      subject: "Reset Your Password",
      html: `<h1>Test Email</h1><p> Test email body content ${user.username} </p> <p> Your OTP is ${OTP} </p>`,
    });

    return NextResponse.json(
      {
        message: "Credentials verified successfully",
        success: true,
      },
      { status: 200 }
    );

    // const tokenData = {
    //   username: user.username,
    //   email: user.email,
    //   avatar: user.avatar || "",
    // };

    // const token = jwt.sign(tokenData, process.env.JWT_SECRET!);

    // response.cookies.set("token", token, {
    //   httpOnly: true,
    // });

    // return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const otp = request.headers.get("code");

  const user = await User.findOne({ verifyCode: otp });

  if (!user) {
    return NextResponse.json(
      {
        message: "Invalid OTP",
      },
      { status: 400 }
    );
  }

  if (user.verifyCodeExpiry < new Date()) {
    return NextResponse.json(
      {
        message: "OTP expired",
      },
      { status: 400 }
    );
  }

  user.verifyCode = "";
  await user.save();

  const tokenData = {
    username: user.username,
    email: user.email,
    avatar: user.avatar || "",
  };

  const token = await jwt.sign(tokenData, process.env.JWT_SECRET!);

  const response = NextResponse.json(
    {
      message: "OTP verified successfully",
      success: true,
    },
    { status: 200 }
  );

  response.cookies.set("token", token, {
    httpOnly: true,
  });

  return response;
}
