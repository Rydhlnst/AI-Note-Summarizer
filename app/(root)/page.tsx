"use client";

import SummarizerInput from "@/components/Input/Input";
import OutputSection from "@/components/Input/Output";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export default function Home() {
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewResult = (newResult: string) => {
    setChatHistory((prev) => [...prev, newResult]);
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-between">
      {/* Output Section */}
      <div className="flex flex-col gap-4 p-4 overflow-y-auto flex-1">
        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-6 w-2/3 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
          </div>
        )}
        {chatHistory.map((result, index) => (
          <OutputSection key={index} result={result} />
        ))}
      </div>

      {/* Input Section Fixed at Bottom */}
      <div className="sticky bottom-0 p-4">
        <SummarizerInput onResult={handleNewResult} setLoading={setIsLoading}/>
      </div>
    </div>
  );
}
