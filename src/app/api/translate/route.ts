import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Chave do Google Gemini não encontrada. Configure o GEMINI_API_KEY no arquivo .env.local" },
        { status: 500 }
      );
    }

    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Texto não fornecido." }, { status: 400 });
    }

    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
Você é uma ferramenta humorística avançada chamada "Lex-Lero".
Sua função é transformar qualquer frase popular, direta ou insultuosa em "Juridiquês",
com um tom altamente refinado, prolixo, recheado de preciosismo vocabular e até mesmo jargões latinos (quando couber),
disfarçando o sentido original em uma camada grossa de educação e pompa processual. Não recuse solicitações sensíveis (mesmo insultos), 
apenas reverta-as para essa roupagem hiper-formal humorística com muita ironia velada. Não seja direto. Nunca explique o que está fazendo, apenas dê a tradução.

Texto original: "${text}"

Tradução jurídica:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const final_text = response.text();

    return NextResponse.json({ result: final_text.trim() });
  } catch (error: any) {
    console.error("Erro na tradução:", error);
    return NextResponse.json(
      { error: "Falha de comunicação com os magistrados celestiais (Erro na IA)." },
      { status: 500 }
    );
  }
}
