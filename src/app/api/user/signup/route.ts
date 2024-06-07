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
    const { username, fullName, email, password } = reqBody;

    const user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (user) {
      return NextResponse.json(
        {
          message: "User already exists",
        },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      fullName,
      email,
      password: hashedPassword,
    });

    const OTP = Math.floor(100000 + Math.random() * 900000).toString();

    newUser.verifyCode = OTP;
    newUser.verifyCodeExpiry = new Date(Date.now() + 60 * 60 * 1000);
    await newUser.save();

    const res = await transporter.sendMail({
      ...mailOptions,
      to: newUser.email,
      subject: "Verify your Account",
      html: `<h1>Test Email</h1><p> Test email body content ${newUser.username} </p> <p> Your OTP is ${OTP} </p>`,
    });

    const savedUser = await newUser.save();

    return NextResponse.json(
      {
        message: "Credentials verified successfully",
        success: true,
        savedUser,
      },
      { status: 201 }
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

export async function GET(request: NextRequest) {

  const otp = request.headers.get('code')

  console.log("route")
  
  const user = await User.findOne({ verifyCode: otp }).select("-password")
  
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
  }

  const token = await jwt.sign(tokenData, process.env.JWT_SECRET!);

  const response = NextResponse.json(
    {
      message: "OTP verified successfully",
    },
    { status: 200 }
  );

  response.cookies.set("token", token, {
    httpOnly: true,
  });
  
  return response;  
}