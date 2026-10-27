import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(1, "Assunto é obrigatório"),
  message: z.string().min(20, "Mensagem deve ter pelo menos 20 caracteres"),
});

const subjectLabels: Record<string, string> = {
  orcamento: "Solicitar Orçamento",
  desenvolvimento: "Desenvolvimento Web/APIs",
  seguranca: "Segurança & LGPD",
  cloud: "Cloud & Infraestrutura",
  arquitetura: "Arquitetura & Consultoria",
  suporte: "Suporte & Manutenção",
  outsourcing: "Outsourcing & Alocação",
  parceria: "Parceria Comercial",
  outros: "Outros",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = contactSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { message: "Dados inválidos", errors: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = validated.data;
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    const contact = await prisma.contact.create({
      data: {
        ...data,
        subject: subjectLabels[data.subject] || data.subject,
        ip,
        userAgent,
      },
    });

    // TODO: Send email notification
    // await sendNotificationEmail(contact);

    return NextResponse.json({ message: "Mensagem enviada com sucesso!", id: contact.id }, { status: 201 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 });
  }
}