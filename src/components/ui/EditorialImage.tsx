import Image from "next/image";

interface EditorialImageProps {
  src?: string | null;
  alt: string;
  className?: string;
}

export default function EditorialImage({ src, alt, className = "" }: EditorialImageProps) {
  if (!src?.startsWith("/")) {
    return <div role="img" aria-label={alt} className={`bg-[url('/images/route-fallback.svg')] bg-cover bg-center ${className}`} />;
  }
  return <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 33vw" className={`object-cover ${className}`} />;
}
