"use client";

import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2Icon, MessageCircleQuestionIcon, SendHorizonalIcon } from "lucide-react";
import { parseFile } from "@/app/api/parse/route";
import { fetchHandler } from "@/lib/handlers/fetch";

interface InputProps {
  onResult: (text: string) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SummarizerInput({ onResult, setLoading }: InputProps) {
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      const lineHeight = 24;
      const scrollHeight = inputRef.current.scrollHeight;
      inputRef.current.style.height = `${Math.max(scrollHeight, lineHeight)}px`;
    }
  }, [prompt]);

  const handleSubmit = async () => {
    if (!file) {
      console.warn("⚠️ File belum dipilih.");
      return;
    }

    setLoading(true);

    const type = file.name.endsWith(".pdf") ? "pdf" : "docx";

    try {
      setIsLoading(true);
      console.log("📤 Mulai proses parsing...");
      const parsedText = await parseFile(file, type);

      if (!parsedText || parsedText.trim() === "") {
        console.warn("⚠️ Parsing gagal atau hasil kosong.");
        return;
      }

      console.log("📄 Hasil Parsing:", parsedText.slice(0, 300));

      console.log("🤖 Mengirim ke API AI untuk dirangkum...");
      const aiSummary = await fetchHandler<{ data: string }>("/api/ai", {
        method: "POST",
        body: JSON.stringify({ content: parsedText, language: "id" }),
        headers: { "Content-Type": "application/json" },
      });

      if (aiSummary.success && aiSummary.data) {
        console.log("📚 Hasil Ringkasan AI:", aiSummary.data);
        onResult(aiSummary.data);
        setFile(null); // ✅ Hapus file setelah sukses
      } else {
        console.warn("❌ Gagal mendapatkan ringkasan AI.", aiSummary.error);
        onResult("Gagal mendapatkan ringkasan dari AI.");
      }
      setLoading(false)
    } catch (error) {
      console.error("🔥 Error saat handleSubmit:", error);
      onResult("Terjadi kesalahan saat memproses ringkasan.");
      setLoading(false)
    } finally {
      setIsLoading(false);
      setFile(null);
      setPrompt("");

    }
  };

  return (
    <div className="rounded-xl mx-auto max-w-3xl p-4 bg-muted flex justify-center transition-all duration-300">
      <div className="w-full space-y-2">
        {file && (
          <Card className="flex items-center justify-between p-2 bg-muted text-foreground">
            <span className="truncate max-w-[70%]">{file.name}</span>
            <Button
              variant="ghost"
              className="text-red-500 hover:underline"
              onClick={() => setFile(null)}
            >
              Hapus
            </Button>
          </Card>
        )}

        <Textarea
          ref={inputRef}
          rows={1}
          placeholder="Minta ringkasan di sini atau drag & drop file..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="w-full resize-none px-4 py-2 outline-none bg-muted text-foreground border-none focus:outline-none focus:ring-0 focus:border-none rounded-xl"
        />

        <div className="flex justify-between gap-2">
          <div className="flex items-center">
            <Button asChild variant="ghost">
              <label htmlFor="file-upload" className="cursor-pointer">📎 Masukkan File</label>
            </Button>
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <Button onClick={() => alert("Fitur pertanyaan belum tersedia!")} variant="ghost">
              <MessageCircleQuestionIcon />
              Buat Pertanyaan
            </Button>
          </div>
          <Button onClick={handleSubmit} variant="ghost" disabled={isLoading}>
            {isLoading ? <Loader2Icon className="animate-spin mr-2" /> : <SendHorizonalIcon />}
            {isLoading ? "Memproses..." : "Kirim"}
          </Button>
        </div>
      </div>
    </div>
  );
}
