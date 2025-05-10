interface OutputProps {
    result: string;
  }
  
  export default function OutputSection({ result }: OutputProps) {
    if (!result) return null;
  
    return (
      <div className="mt-4 p-2 bg-muted rounded-md">
        <h2>Hasil Ringkasan:</h2>
        <p>{result}</p>
      </div>
    );
  }
  