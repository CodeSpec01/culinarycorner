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
    newUser.verifyCodeExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await newUser.save();

    const res = await transporter.sendMail({
      ...mailOptions,
      to: newUser.email,
      subject: "Verify your Email Address",
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>

  <body style="color: #c9c9c9; ">
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
                              Verify your Email address
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
                              Hello ${fullName},
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
                              Thanks for registering for a new account on
                              <a
                                href="https://culinarycorner.vercel.app/"
                                style="color: #067df7; text-decoration: none"
                                >Culinary Corner</a
                              >. Before we get started, we just want to make
                              sure this is really you. Please enter the
                              following
                              <span
                                style="color: #36f706; text-decoration: none"
                                >verification code</span
                              >
                              when prompted.
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
              If you don't want to create an account, you can safely ignore this
              message.<br />This message was system generated. You don't need to
              reply to this message.
            </p>
            <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="max-width: 37.5em; margin-top: 20px;">
            <tbody>
              <tr>
                <td>
                  <p style="font-size: 14px; line-height: 24px; margin: 16px 0; text-align: center; color: #9ca3af; margin-bottom: 45px;">&copy; 2024 Culinary Corner<br>NSUT Dwarka, Delhi 110078, IN</p>
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
  const otp = request.headers.get("code");

  console.log("route");

  const user = await User.findOne({ verifyCode: otp }).select("-password");

  if (!user) {
    return NextResponse.json(
      {
        message: "Invalid OTP",
      },
      { status: 400 }
    );
  }

  if (user.verifyCodeExpiry! < new Date()) {
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
    },
    { status: 200 }
  );

  response.cookies.set("token", token, {
    httpOnly: true,
  });

  const res = await transporter.sendMail({
    ...mailOptions,
    to: user.email,
    subject: "Welcome to Culinary Corner",
    html: `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Welcome to Culinary Corner</title>
</head>

<body style="color: #c9c9c9; font-size: 1rem; line-height: 1.5rem; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';">
  <div style="display: none; overflow: hidden; line-height: 1px; opacity: 0; max-height: 0; max-width: 0;">Culinary Corner Welcome</div>

  <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="max-width: 37.5em; background-color: #23272a; padding: 45px; margin: 0 auto;">
    <tbody>
      <tr>
        <td>
          <img src="https://res.cloudinary.com/duptu5wcm/image/upload/v1717834612/culinarycorner/logo.png" alt="Culinary Corner" width="184" height="75" style="display: block; outline: none; border: none; text-decoration: none; margin: 20px auto;" />

          <h1 style="text-align: center; margin: 0; line-height: 2rem;">Welcome to Culinary Corner</h1>

          <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
            <tbody>
              <tr>
                <td>
                  <p style="font-size: 1rem; line-height: 1.5rem; margin: 16px 0;">Congratulations ${user.fullName} ! Culinary Corner welcomes you to a community of chefs and food enthusiasts around the world who rely on Culinary Corner to craft and deliver exceptional culinary experiences.</p>
                  <p style="font-size: 1rem; line-height: 1.5rem; margin: 16px 0;">Benefits of signing up:</p>

                  <ul style="margin-bottom: 20px;">
                    <li style="margin-bottom: 20px;">Visit the <a href="https://culinarycorner.vercel.app/profile" style="color: #067df7; text-decoration: none;">Profile Page</a></li>
                    <li style="margin-bottom: 20px;">Have a custom <span style="color: #5af706; text-decoration: none;" >Profile photo</span>.</li>
                    <li style="margin-bottom: 20px;">Make <a href="https://culinarycorner.vercel.app/#reservation" style="color: #067df7; text-decoration: none;" >Reservations online</a> from the ease of your place.</li>
                    <li style="margin-bottom: 20px;"><span style="color: #5af706; text-decoration: none;">Priority</span> Customer Support</li>
                  </ul>

                  <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                    <tbody>
                      <tr>
                        <td>
                          <a href="https://culinarycorner.vercel.app/" style="display: inline-block; max-width: 100%; background-color: #2250f4; color: #ffffff; border-radius: 0.5rem; padding: 12px 18px; text-decoration: none; text-align: center;">
                            <!--[if mso]><i style="letter-spacing: 18px; mso-font-width: -100%; mso-text-raise: 18" hidden>&nbsp;</i><![endif]-->
                            <span style="line-height: 120%; mso-padding-alt: 0px; mso-text-raise: 9px;">Go to Culinary Corner</span>
                            <!--[if mso]><i style="letter-spacing: 18px; mso-font-width: -100%" hidden>&nbsp;</i><![endif]-->
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="margin-top: 45px;">
                    <tbody>
                      <tr>
                        <td>
                          <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                            <tbody>
                              <tr>
                                <td style="text-align: right; padding-left: 20px; padding-right: 20px;">
                                  <a href="https://culinarycorner.vercel.app/profile" style="color: #067df7; text-decoration: none; font-weight: 700;">Visit Profile</a> <span style="color: #22c55e;">→</span>
                                </td>
                                <td style="text-align: left;">
                                  <a href="https://culinarycorner.vercel.app/#reservation" style="color: #067df7; text-decoration: none; font-weight: 700;">Make a reservation</a> <span style="color: #22c55e;">→</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>

          <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="max-width: 37.5em; margin-top: 20px;">
            <tbody>
              <tr>
                <td>
                  <p style="font-size: 14px; line-height: 24px; margin: 16px 0; text-align: center; color: #9ca3af; margin-bottom: 45px;">&copy; 2024 Culinary Corner<br>NSUT Dwarka, Delhi 110078, IN</p>
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

  return response;
}
