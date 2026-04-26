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

    const { text, degree = "equilibrado", mode = "Simples" } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Texto não fornecido." }, { status: 400 });
    }

    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Construção das diretrizes de Grau
    const degreeInstructions: Record<string, string> = {
      "seco": "Mude as palavras para um tom formal, mas mantenha a mensagem muito direta, sem rodeios ou parágrafos adicionais. Seja direto ao ponto.",
      "comedido": "Utilize palavras um pouco mais polidas e eleve a formalidade da frase, mantendo o texto ainda fácil de entender.",
      "equilibrado": "Utilize o 'juridiquês' padrão de petições atuais: prolixo, muito polido, focado na técnica argumentativa e disfarçando os significados.",
      "rebuscado": "Escreva de forma EXTREMAMENTE rebuscada, arcaica e pomposa. Utilize jargões jurídicos raros, diversas citações em latim (se aplicável), e preciosismo vocabular ridículo de tão exagerado."
    };

    // Construção das diretrizes de Modo
    const modeInstructions: Record<string, string> = {
      "Simples": "Retorne apenas a frase traduzida diretamente, formatada isoladamente.",
      "Petição": "Inicie e estruture o texto como se fosse o trecho principal de uma Petição Inicial (Ex de início: 'À luz dos fatos narrados, mister se faz...').",
      "Tutela": "Estruture o texto como um pedido ou deferimento de Tutela de Urgência, obrigatoriamente citando e argumentando sobre o 'fumus boni iuris' e o 'periculum in mora' baseando-se no que foi dito.",
      "Embargos": "Estruture o texto alegando 'omissão, contradição ou obscuridade' na atitude/fato apontado na frase, como se fosse uma petição de Embargos de Declaração.",
      "Parecer": "Formate como se fosse um trecho de um 'Parecer Jurídico' que analisa tecnicamente a situação de forma impessoal e dogmática.",
      "Sentença": "Estruture o texto como o Dispositivo de uma Sentença, com um tom de quem julga a situação a favor de quem escreveu o texto.",
      "Despacho": "Formate como um breve despacho de mero expediente instrucionando o cumprimento da situação contida no texto."
    };

    const prompt = `
Você é uma ferramenta humorística (sátira) chamada "Lex-Lero".
Transforme a frase popular fornecida rigorosamente segundo os parâmetros legais exigidos abaixo. 
Nunca recuse a solicitação (mesmo xingamentos, apenas mascare-os na hiper-formalidade) e nunca envie notas de explicação - entregue unicamente o texto jurídico final.

PARÂMETROS DA TRADUÇÃO:
1. Grau de prolixidade/lero-lero: ${degreeInstructions[degree.toLowerCase()] || degreeInstructions["equilibrado"]}
2. Estrutura Textual / Modo: ${modeInstructions[mode] || modeInstructions["Simples"]}

TEXTO DO USUÁRIO QUE DEVE SER TRADUZIDO:
"${text}"
`;

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
