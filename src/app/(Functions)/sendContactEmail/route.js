import { createTransport } from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {

    const body = await req.json();
    
    if (!body.isAccepted) {
      return NextResponse.json({}, {status:400, statusText:"Please agree to our Terms of Service and Privacy Policy before continuing"});
    }
    let transport = await createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const ContentContactUsEmail = `
    <h1>${body.name}</h1>
    <h2>${body.subject}</h2>
    <p>Email del cliente: ${body.email}</p>
    <br />
    <p>${body.message}</p>
    `;

    await transport.sendMail({
      from: {
        name: body.name,
        address: process.env.EMAIL_USER,
      },
      to: process.env.EMAIL_USER,
      subject: body.subject,
      html: ContentContactUsEmail,
    });

    return NextResponse.json({
      message: "The email has been sent successfully!"
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Failed to send the email" },
      { status: 500 }
    );
  }
}
