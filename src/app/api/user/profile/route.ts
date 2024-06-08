import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/src/dbconfig/dbConnect";
import User from "@/src/models/user.model";
import { getTokenData } from "@/src/utils/getTokenData";
import bcryptjs from "bcryptjs";
import cloudinary, { UploadApiResponse } from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_CLOUDINARY_API_SECRET,
});

export async function GET(request: NextRequest) {
  try {
    const res = await getTokenData(request);
    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          message: "Token not found",
        },
        { status: 404 }
      );
    }

    dbConnect();

    const user = await User.findOne({
      username: data.data.username,
    }).select(
      "-password -verifyCode -verifyCodeExpiry -forgotPasswordCodeExpiry -forgotPasswordCode"
    );

    const response = NextResponse.json(
      {
        message: "Profile data fetched successfully",
        data: user,
      },
      { status: 200 }
    );
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

export async function POST(request: NextRequest) {
  const activeTab = await request.headers.get("activeTab");

  let data = {
    email: "",
    username: "",
    fullName: "",
    password: "",
  };

  if (activeTab !== "avatar") {
    data = (await request.json()) || request.formData();
  }

  if (activeTab === "account") {
    dbConnect();

    try {
      const user = await User.findOne({ email: data.email }).select(
        "-password -verifyCode -verifyCodeExpiry -forgotPasswordCodeExpiry -forgotPasswordCode"
      );

      if (!user) {
        return NextResponse.json(
          {
            message: "Could not find the account",
          },
          { status: 404 }
        );
      }

      user!.username = data.username;
      user!.fullName = data.fullName;
      user!.email = data.email;
      await user.save();

      const response = NextResponse.json(
        {
          message: "Profile data updated successfully",
        },
        { status: 200 }
      );

      const tokenData = {
        username: user.username,
        email: user.email,
        avatar: user.avatar || "",
      };

      const token = await jwt.sign(tokenData, process.env.JWT_SECRET!);

      response.cookies.set("token", token, {
        httpOnly: true,
      });

      return response;
    } catch (error: any) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 }
      );
    }
  } else if (activeTab === "password") {
    dbConnect();

    try {
      const user = await User.findOne({ email: data.email }).select(
        " -verifyCode -verifyCodeExpiry -forgotPasswordCodeExpiry -forgotPasswordCode"
      );

      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(data.password, salt);

      user!.password = hashedPassword;
      await user?.save();

      return NextResponse.json(
        {
          message: "Password Updated successfully",
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

  dbConnect();
  try {
    const data = await request.formData();

    const file: File | null = data.get("avatar") as unknown as File;
    const email: string = data.get("email") as string;

    const user = await User.findOne({ email: email }).select(
      "-password -verifyCode -verifyCodeExpiry -forgotPasswordCodeExpiry -forgotPasswordCode"
    );

    if (!user) {
      return NextResponse.json(
        {
          message: "Could not find the account",
        },
        { status: 404 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${user.username}-${Date.now()}`;

    const uploadResponse = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          {
            public_id: fileName,
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result!);
            }
          }
        );

        uploadStream.end(buffer);
      }
    );

    const newAvatar = uploadResponse.secure_url;

    if (user.avatar) {
      const url = user.avatar.split("/");
      const splitUrl = url[url.length - 1].split(".")[0];
      const delRes = await cloudinary.v2.uploader.destroy(splitUrl);
    }

    user.avatar = newAvatar;
    await user.save();

    const response = NextResponse.json(
      {
        message: "Profile photo updated successfully",
        avatar: newAvatar,
      },
      { status: 200 }
    );

    const tokenData = {
      username: user.username,
      email: user.email,
      avatar: user.avatar || "",
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET!);

    response.cookies.set("token", token);
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
