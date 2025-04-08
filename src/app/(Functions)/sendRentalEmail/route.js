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

    const rentalEmail = `
    <h1>${body.name} quiere rentar ${body.rent}</h1>
    <p>Email del cliente: ${body.email}</p>
    <p>Numero del cliente: ${body.phone}</p>
    <br />
    <h2>Detalles de la renta:</h2>
    <ul>
    ${Object.keys(body).map(key => {
      if (body[key]) {
        return `<li>${key}: ${body[key]}</li>`;
      } else {
        return '';
      }
    }).join('')}
    </ul>
    `;

    await transport.sendMail(
      {
        from: {
          name:body.name,
          address: process.env.EMAIL_USER
        },
        to: process.env.EMAIL_USER,
        subject: `${body.name} quiere rentar ${body.rent}`,
        html: rentalEmail
    })

      return NextResponse.json({
        message: "The email has been sent successfully!",
        body
      });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message:"Failed to send the email" }, { status:500 })
  }
}