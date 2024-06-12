import { dbConnect } from "@/src/dbconfig/dbConnect";
import Order from "@/src/models/order.model";
import User from "@/src/models/user.model";
import { transporter, mailOptions } from "@/src/utils/nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get("email");

    dbConnect();

    const user = await User.findOne({ email: email }).select("-password");

    if (!user) {
      return NextResponse.json(
        {
          message: "No User found with the email address",
        },
        { status: 404 }
      );
    }

    const OTP = Math.floor(100000 + Math.random() * 900000).toString();

    user!.verifyCode = OTP;
    user!.verifyCodeExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user!.save();

    await transporter.sendMail({
      ...mailOptions,
      to: email!,
      subject: "Verify Order",
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>

  <body style="color: #fff">
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
                              Verify Order
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
                              Hello ${user!.fullName},
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
                              We have received your
                              <span
                                style="color: #36f706; text-decoration: none"
                                >reservation initiation</span
                              >
                              request at
                              <a
                                href="https://culinarycorner.vercel.app/"
                                style="color: #067df7; text-decoration: none"
                                >Culinary Corner</a
                              >. To ensure the security and accuracy of your
                              reservation, we kindly ask you to verify your
                              request by entering the following One-Time
                              Password (OTP) when prompted:
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
              If this wasn't you, please change your account password.<br />For
              further assistance contact help on
              <a
                href="mailto:mail.culinarycorner@gmail.com"
                style="color: #067df7; text-decoration: none"
                >mail.culinarycorner@gmail.com</a
              ><br />This message was system generated. You don't need to reply
              to this message.
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
                      &copy; 2024 Culinary Corner<br />NSUT Dwarka, Delhi 110078,
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
        message: "Order Verification Email sent successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const email = request.nextUrl.searchParams.get("email");

    if (!email || !data) {
      return NextResponse.json(
        {
          message: "Didn't recieve email or order data",
          success: false,
        },
        { status: 400 }
      );
    }

    dbConnect();

    const user = await User.findOne({ verifyCode: data.otp }).select(
      "-password"
    );

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid OTP",
          success: false,
        },
        { status: 400 }
      );
    }

    if (user.verifyCodeExpiry! < new Date()) {
      return NextResponse.json(
        {
          message: "OTP Expired",
          success: false,
        },
        { status: 400 }
      );
    }

    const newOrder = new Order({
      customerName: user.fullName,
      totalAmount: data.netTotal,
      items: data.cart,
    });

    await newOrder.save();

    user.orders!.unshift(newOrder);
    user.verifyCode = "";

    await user.save();

    await transporter.sendMail({
      ...mailOptions,
      to: email!,
      subject: "Order Confirmation Details",
      html: `<!DOCTYPE html PUBLIC "-W3CDTD XHTML 1.0 TransitionalEN" "http:www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>

  <body style="color: #fff">
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
                              src="https:res.cloudinary.com/duptu5wcm/image/upload/v1717834612/culinarycorner/logo.png"
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
                              Order Confirmation Details
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
                              Hello ${user!.fullName},
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
                              We are pleased to
                              <span
                                style="color: #36f706; text-decoration: none"
                                >confirm</span
                              >
                              your order placed at
                              <a
                                href="https:culinarycorner.vercel.app/"
                                style="color: #067df7; text-decoration: none"
                                >Culinary Corner</a
                              >. Your order will be delivered to you by tomorrow
                              6pm. Please find the detail of your order below
                              this message.<br />
                            </p>

                            <ul style="margin-bottom: 20px">
                              <li style="margin-bottom: 20px; color: #c9c9c9">
                                Ordered under: ${newOrder.customerName}
                              </li>
                              <li style="margin-bottom: 20px; color: #c9c9c9">
                                Ordered On: ${new Date().toDateString()}
                              </li>
                              <li style="margin-bottom: 20px; color: #c9c9c9">
                                Items :
                                <ul style="margin-bottom: 20px">

                                ${newOrder.items.map(
                                  (order: {
                                    name: string;
                                    quantity: number;
                                    price: number;
                                  }) =>
                                    `<li style="margin-bottom: 20px; color: #c9c9c9">
                                      ${order.name} : ${order.quantity} x ${
                                      order.price
                                    } - Rs. ${order.quantity * order.price}
                                    </li>`
                                ).join("\n")}
                                </ul>
                              </li>
                              <li style="margin-bottom: 20px; color: #c9c9c9">
                                Total Amount : ${newOrder.totalAmount}
                              </li>
                            </ul>
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
                                These order details are also present on Culinary Corner website in Your Orders under profile. You can <br />
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
                                If you need to make any changes or have any
                                special requests, please do not hesitate to
                                contact us.<br />Thank you for ordering with Culinary Corner.<br />
                              </p>
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
              If this wasn't you, please change your account password.<br />For
              further assistance contact help on
              <a
                href="mailto:mail.culinarycorner@gmail.com"
                style="color: #067df7; text-decoration: none"
                >mail.culinarycorner@gmail.com</a
              ><br />This message was system generated. You don't need to reply
              to this message.
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
                      &copy; 2024 Culinary Corner<br />NSUT Dwarka, Delhi 110078,
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
        message: "Order completed successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Something went wrong, please try again",
        success: false,
      },
      { status: 500 }
    );
  }
}
