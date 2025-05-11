import { NextResponse } from "next/server";
import { streamText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export async function POST(req: Request) {
  try {
    const { content, language = "id" } = await req.json();
    console.log("📥 [API] Diterima Content:", content);
    console.log("🌐 [API] Target Language:", language);

    if (!content || content.trim() === "") {
      console.warn("⚠️ [API] Content kosong.");
      return NextResponse.json({ success: false, error: "Content is required." }, { status: 400 });
    }

    const openrouter = createOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY!,
    });

    const prompt = `
Buat ringkasan dari konten berikut menggunakan format:

1. Judul utama (gunakan heading #)
2. Setiap poin menggunakan heading ## 
3. Berikan penjelasan di bawah setiap heading.
4. Tambahkan satu baris kosong di setiap pergantian poin.
Konten: ${content}
    `.trim();

    console.log("📤 [API] Prompt ke OpenRouter:", prompt);

    const response = streamText({
      model: openrouter("meta-llama/llama-4-maverick"),
      prompt,
      system: `Selalu jawab dalam bahasa ${language} dengan format markdown. Buat ringkasan yang jelas dan padat.`,
    });

    await response.consumeStream();
    const finalText = await response.text;

    console.log("✅ [API] Hasil Ringkasan AI:", finalText);

    return NextResponse.json({ success: true, data: finalText }, { status: 200 });
  } catch (error) {
    console.error("❌ [API] Error:", error);
    return NextResponse.json({
      success: false,
      error: (error as Error).message || "Internal server error.",
    }, { status: 500 });
  }
}
