import Image from "next/image";
import type { Locale } from "@/i18n/routing";
import { photoProps } from "@/lib/images/photo";

interface Props {
  id: string;
  locale: Locale;
  sizes: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  /** Overrides the alt text, e.g. "" inside a button that already carries the name. */
  alt?: string;
}

export function Photo({ id, locale, sizes, className, priority, fill, alt }: Props) {
  const photo = photoProps(id, locale);
  return (
    <Image
      src={photo.src}
      alt={alt ?? photo.alt}
      width={fill ? undefined : photo.width}
      height={fill ? undefined : photo.height}
      fill={fill}
      sizes={sizes}
      placeholder="blur"
      blurDataURL={photo.blurDataURL}
      priority={priority}
      className={className}
    />
  );
}
