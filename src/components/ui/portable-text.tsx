import { PortableText as PortableTextComponent, type PortableTextComponents } from "@portabletext/react";

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-8 text-lg md:text-xl leading-relaxed text-gray-800">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-8 mt-16 leading-[1.1] tracking-tight">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-black mb-6 mt-12 leading-tight tracking-tight">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-black mb-4 mt-10 leading-tight">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-black mb-4 mt-8">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-[8px] border-red-600 pl-8 py-4 my-12 bg-gray-50 italic text-gray-900 text-xl font-medium leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-none mb-8 space-y-4 ml-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-8 space-y-4 font-bold">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-lg md:text-xl leading-relaxed flex items-start gap-4">
        <div className="w-2 h-2 bg-red-600 mt-2.5 shrink-0" />
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="text-lg md:text-xl leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-black text-black">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-gray-700">{children}</em>
    ),
    link: ({
      children,
      value
    }) => (
      <a
        href={value?.href}
        className="text-red-600 hover:text-black font-black underline decoration-2 underline-offset-4 transition-colors"
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