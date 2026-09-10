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
}

export function Photo({ id, locale, sizes, className, priority, fill }: Props) {
  const photo = photoProps(id, locale);
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
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
