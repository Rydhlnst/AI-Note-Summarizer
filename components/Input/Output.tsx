import ReactMarkdown from "react-markdown";

interface OutputProps {
  result: string;
}

export default function OutputSection({ result }: OutputProps) {
  if (!result) return null;

  return (
    <div className="mt-4 p-4 bg-muted rounded-md prose prose-invert max-w-3xl w-full">
      <h2 className="text-xl font-bold mb-2">📚 Hasil Ringkasan:</h2>
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-4" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-xl font-semibold mt-3" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-lg font-medium mt-2" {...props} />,
          p: ({ node, ...props }) => <p className="mb-2" {...props} />,
          li: ({ node, ...props }) => <li className="ml-4 list-decimal" {...props} />,
        }}
      >
        {result}
      </ReactMarkdown>
    </div>
  );
}
