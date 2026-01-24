'use client';

interface FormattedTextProps {
  text: string;
  className?: string;
}

export default function FormattedText({ text, className = '' }: FormattedTextProps) {
  // Parse **bold** markdown syntax
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          // Remove the ** and render as bold
          return (
            <strong key={i} className="font-semibold text-gray-900">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      })}
    </span>
  );
}
