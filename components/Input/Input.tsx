"use client";

import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircleQuestionIcon, SendHorizonalIcon } from "lucide-react";
import { parseFile } from "@/app/api/parse/route";

interface InputProps {
    onResult: (text: string) => void;
  }

export default function SummarizerInput({ onResult }: InputProps) {
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
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
  
      if (scrollHeight > lineHeight) {
        inputRef.current.style.height = `${scrollHeight}px`;
      } else {
        inputRef.current.style.height = `${lineHeight}px`;
      }
    }
  }, [prompt]);

  const handleSubmit = async () => {
    console.log("🚀 Kirim ditekan!");
  
    if (!file) {
      console.warn("⚠️ File belum dipilih!");
      return;
    }
  
    const type = file.name.endsWith(".pdf") ? "pdf" : "docx";
  
    // Log file info
    console.log("📄 Selected File:", {
      name: file.name,
      type: file.type,
      size: file.size,
    });
  
    // Prepare FormData and log entries
    const formData = new FormData();
    formData.append("file", file);
  
    for (const [key, value] of formData.entries()) {
      console.log(`📦 FormData Entry - ${key}:`, value);
    }
  
    // Call API via parseFile
    const text = await parseFile(file, type);
  
    console.log("📚 API Result:", text);
  
    if (text) {
      console.log("✅ Parsing berhasil, hasil dikirim ke parent.");
      onResult(text);
    } else {
      console.warn("❌ Failed to parse file.");
    }
  };
  
  

  return (
    <div className="absolute rounded-xl mx-auto max-w-3xl bottom-10 left-10 right-10 p-4 bg-muted transition-all duration-300 flex justify-center">
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

        <div className="flex justify-between gap-2 transition-all duration-300">
            <div className="flex items-center justify-center">
                <Button asChild variant="ghost">
                    <label htmlFor="file-upload" className="cursor-pointer">📎 Masukkan File</label>
                </Button>
                    <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    />
                <Button onClick={() => alert("Submit Clicked")}
                variant={"ghost"}>
                    <MessageCircleQuestionIcon/>
                    Buat Pertanyaan
                </Button>
            </div>
            <Button
            onClick={handleSubmit}
            variant={"ghost"}
            >
                <SendHorizonalIcon/>
                Kirim
            </Button>
        </div>
      </div>
    </div>
  );
}