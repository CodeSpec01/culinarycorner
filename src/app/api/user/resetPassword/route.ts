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
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>

  <body style="color: #c9c9c9">
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
                              Reset Password
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
                              Hello ${foundUser.fullName},
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
                              You are receiving this email because we received a
                              request to <span style="color: #36f706; text-decoration: none;">reset your password</span> for your <a href="https://culinarycorner.vercel.app/" style="color: #067df7; text-decoration: none;" >Culinary
                              Corner</a> account. For verification, please enter the following verification code when prompted.
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
                                      Reset Password code (OTP)
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
                                      (The OTP is only valid for 10 minutes)
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
              If you did not request a password reset, please contact us
              immediately at
              <a
                href="mailto:mail.culinarycorner@gmail.com"
                style="color: #067df7; text-decoration: none"
                >mail.culinarycorner@gmail.com</a
              ><br />This message was system generated. Please do not reply to
              this message.
            </p>
            <table
              align="center"
              width="100%"
              border="0"
              cellspacing="0"
              cellpadding="0"
              role="presentation"
              style="max-width: 37.5em; margin-top: 20px"
            >
              <tbody>
                <tr>
                  <td>
                    <p
                      style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 16px 0;
                        text-align: center;
                        color: #9ca3af;
                        margin-bottom: 45px;
                      "
                    >
                      &copy 2024 Culinary Corner<br />NSUT Dwarka, Delhi 110078,
                      IN
                    </p>
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
