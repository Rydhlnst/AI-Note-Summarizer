"use client"

import SummarizerInput from "@/components/Input/Input";
import OutputSection from "@/components/Input/Output";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<string | null>(null);
  return (
    <div className="w-full">
      <div className="absolute rounded-xl mx-auto max-w-3xl left-10 right-10 p-4 transition-all duration-300 flex justify-center">
        <div className="w-full flex-1 overflow-auto">
          {result && <OutputSection result={result} />}
        </div>
      </div>
      <div className="">
        <SummarizerInput onResult={(text) => setResult(text)} />
      </div>
    </div>
  );
}
