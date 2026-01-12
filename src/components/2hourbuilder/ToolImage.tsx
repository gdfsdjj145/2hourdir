'use client';

interface ToolImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ToolImage({ src, alt, className }: ToolImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  );
}
