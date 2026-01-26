'use client';

interface FormattedTextProps {
  text: string;
  className?: string;
  boldClassName?: string;
}

export default function FormattedText({ text, className = '', boldClassName = 'text-gray-900' }: FormattedTextProps) {
  // Parse markdown: **bold** and [link](url)
  // First split by links, then by bold within each part
  const linkRegex = /(\[[^\]]+\]\([^)]+\))/g;
  const boldRegex = /(\*\*[^*]+\*\*)/g;

  const parseText = (str: string, keyPrefix: string = ''): React.ReactNode[] => {
    // Split by links first
    const linkParts = str.split(linkRegex);

    return linkParts.flatMap((part, i) => {
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        // This is a link
        const [, linkText, url] = linkMatch;
        return (
          <a
            key={`${keyPrefix}link-${i}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 hover:text-teal-700 underline"
          >
            {linkText}
          </a>
        );
      }

      // Not a link, check for bold
      const boldParts = part.split(boldRegex);
      return boldParts.map((boldPart, j) => {
        if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
          return (
            <strong key={`${keyPrefix}bold-${i}-${j}`} className={`font-semibold ${boldClassName}`}>
              {boldPart.slice(2, -2)}
            </strong>
          );
        }
        return boldPart;
      });
    });
  };

  return <span className={className}>{parseText(text)}</span>;
}
