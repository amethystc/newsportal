import { PortableText as PortableTextComponent, type PortableTextComponents } from "@portabletext/react";

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 text-lg leading-relaxed">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-6 mt-12 text-gray-900">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mb-4 mt-10 text-gray-900">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mb-3 mt-8 text-gray-900">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold mb-2 mt-6 text-gray-900">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-red-600 pl-6 py-2 my-6 bg-gray-50 italic text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-6 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-6 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-lg leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-lg leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    link: ({ 
      children, 
      value 
    }) => (
      <a 
        href={value?.href} 
        className="text-red-600 hover:text-red-700 underline transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

interface PortableTextProps {
  value: any[];
  className?: string;
}

export function PortableText({ value, className }: PortableTextProps) {
  return (
    <div className={className}>
      <PortableTextComponent value={value} components={portableTextComponents} />
    </div>
  );
}