import type { Release } from "@/lib/content/schema";
import { SocialIcon } from "@/components/ui/SocialIcon";

type LinkKey = keyof Release["links"];
const ORDER: LinkKey[] = ["bandcamp", "spotify", "appleMusic", "deezer", "youtube"];

interface Props {
  links: Release["links"];
  labels: Record<string, string>;
  buyLabel?: string;
  variant?: "paper" | "outline";
}

export function StreamingLinks({ links, labels, buyLabel, variant = "paper" }: Props) {
  const cls = variant === "outline" ? "sticker sticker-outline-paper" : "sticker sticker-paper";
  return (
    <ul className="flex flex-wrap gap-2.5" aria-label={labels.listenOn}>
      {ORDER.filter((key) => links[key]).map((key) => (
        <li key={key}>
          <a href={links[key]} className={cls} rel="noopener">
            <SocialIcon name={key} />
            {key === "bandcamp" && buyLabel ? buyLabel : labels[key]}
          </a>
        </li>
      ))}
    </ul>
  );
}
