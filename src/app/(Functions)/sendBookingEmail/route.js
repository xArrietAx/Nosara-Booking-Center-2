import { createTransport } from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    let transport = await createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const ContentBookingEmail = `
    <h1>${body.name}</h1>
    <p>Telefono del cliente: ${body.phone}</p>
    <p>Email del cliente: ${body.email}</p>
    <br />
    <p>Mensaje: ${body.message}</p>
    `;

    await transport.sendMail({
      from: {
        name: body.name,
        address: process.env.EMAIL_USER,
      },
      to: process.env.EMAIL_USER,
      subject: `${body.name} quiere rentar ${body.service}`,
      html: ContentBookingEmail,
    });

    return NextResponse.json({
      message: "The email has been sent successfully!",
      status: 200,
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Failed to send the email" },
      { status: 500 }
    );
  }
}
