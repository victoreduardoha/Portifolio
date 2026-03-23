import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Portfolio <noreply@victoreduardo.site>",
      to: [process.env.CONTACT_TO_EMAIL || "victoreduardo.ml@icloud.com"],
      replyTo: email,
      subject: `[Portfólio] ${subject}`,
      html: `
        <h2>Nova mensagem do portfólio</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${subject}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${String(message).replace(/\n/g, "<br/>")}</p>
      `,
    });

    if (error) {
      console.error("Resend send error:", error);
      return NextResponse.json(
        { error: "Erro ao enviar email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Erro interno ao enviar mensagem." },
      { status: 500 }
    );
  }
}
