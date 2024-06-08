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
      subject: "Verify Login",
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>

  <body style="color: #fff; ">
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="
        max-width: 37.5em;
        padding: 20px;
        margin: 0 auto;
        background-color: #23272a;
      "
    >
      <tbody>
        <tr style="width: 100%">
          <td>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="background-color: #23272a"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="
                        background-color: #23272a;
                        display: flex;
                        padding: 20px 0;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <tbody>
                        <tr>
                          <td style="display: flex; justify-content: center">
                            <img
                              alt="Culinary Corner"
                              width="50%"
                              src="https://res.cloudinary.com/duptu5wcm/image/upload/v1717834612/culinarycorner/logo.png"
                              style="
                                display: block;
                                outline: none;
                                border: none;
                                text-decoration: none;
                              "
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="padding: 25px 35px"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <h1
                              style="
                                color: #c9c9c9;
                                font-family: -apple-system, BlinkMacSystemFont,
                                  'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
                                  'Cantarell', 'Fira Sans', 'Droid Sans',
                                  'Helvetica Neue', sans-serif;
                                font-size: 20px;
                                font-weight: bold;
                                margin-bottom: 15px;
                              "
                            >
                              Verify Login
                            </h1>
                            <p
                              style="
                                font-size: 14px;
                                line-height: 24px;
                                margin: 24px 0;
                                color: #c9c9c9;
                                font-family: -apple-system, BlinkMacSystemFont,
                                  'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
                                  'Cantarell', 'Fira Sans', 'Droid Sans',
                                  'Helvetica Neue', sans-serif;
                                margin-bottom: 14px;
                              "
                            >
                              Hello ${user.fullName},
                            </p>
                            <p
                              style="
                                font-size: 14px;
                                line-height: 24px;
                                margin: 24px 0;
                                color: #c9c9c9;
                                font-family: -apple-system, BlinkMacSystemFont,
                                  'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
                                  'Cantarell', 'Fira Sans', 'Droid Sans',
                                  'Helvetica Neue', sans-serif;
                                margin-bottom: 14px;
                              "
                            >
                              Thank you for <span
                                style="color: #067df7; text-decoration: none"
                                
                              >logging in</span> to your Culinary Corner account.<br>For security purposes, please verify your login by entering the following 
                              <span
                                style="color: #36f706; text-decoration: none"
                                >verification code</span
                              >
                               when prompted:
                            </p>
                            <table
                              align="center"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                display: flex;
                                align-items: center;
                                justify-content: center;
                              "
                            >
                              <tbody>
                                <tr>
                                  <td>
                                    <p
                                      style="
                                        font-size: 14px;
                                        line-height: 24px;
                                        margin: 0;
                                        color: #c9c9c9;
                                        font-family: -apple-system,
                                          BlinkMacSystemFont, 'Segoe UI',
                                          'Roboto', 'Oxygen', 'Ubuntu',
                                          'Cantarell', 'Fira Sans', 'Droid Sans',
                                          'Helvetica Neue', sans-serif;
                                        font-weight: bold;
                                        text-align: center;
                                      "
                                    >
                                      Verification code (OTP)
                                    </p>
                                    <p
                                      style="
                                        font-size: 36px;
                                        line-height: 24px;
                                        margin: 40px 0;
                                        color: #c9c9c9;
                                        font-family: -apple-system,
                                          BlinkMacSystemFont, 'Segoe UI',
                                          'Roboto', 'Oxygen', 'Ubuntu',
                                          'Cantarell', 'Fira Sans', 'Droid Sans',
                                          'Helvetica Neue', sans-serif;
                                        font-weight: bold;
                                        text-align: center;
                                      "
                                    >
                                      ${OTP}
                                    </p>
                                    <p
                                      style="
                                        font-size: 14px;
                                        line-height: 24px;
                                        margin: 0px;
                                        color: #c9c9c9;
                                        font-family: -apple-system,
                                          BlinkMacSystemFont, 'Segoe UI',
                                          'Roboto', 'Oxygen', 'Ubuntu',
                                          'Cantarell', 'Fira Sans', 'Droid Sans',
                                          'Helvetica Neue', sans-serif;
                                        text-align: center;
                                      "
                                    >
                                      (This code is only valid for 10 minutes)
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <hr
                      style="
                        width: 100%;
                        border: none;
                        border-top: 1px solid #eaeaea;
                      "
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              style="
                font-size: 12px;
                line-height: 24px;
                margin: 24px 0;
                color: #c9c9c9;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                  'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
                  'Droid Sans', 'Helvetica Neue', sans-serif;
                padding: 0 20px;
              "
            >
              If this wasn't you, please change your account password.<br>For further assistance contact help on <a href="mailto:mail.culinarycorner@gmail.com" style="color: #067df7; text-decoration: none;">mail.culinarycorner@gmail.com</a><br />This message was system generated. You don't need to
              reply to this message.
            </p>
            <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="max-width: 37.5em; margin-top: 20px;">
            <tbody>
              <tr>
                <td>
                  <p style="font-size: 14px; line-height: 24px; margin: 16px 0; text-align: center; color: #9ca3af; margin-bottom: 45px;">&copy 2024 Culinary Corner<br>NSUT Dwarka, Delhi 110078, IN</p>
                </td>
              </tr>
            </tbody>
          </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`,
    });

    return NextResponse.json(
      {
        message: "Credentials verified successfully",
        success: true,
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
