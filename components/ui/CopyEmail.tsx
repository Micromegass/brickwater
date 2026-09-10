"use client";

import { Check, Copy } from "@phosphor-icons/react";
import { useState } from "react";

export function CopyEmail({ email, label, done }: { email: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="sticker sticker-paper"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2400);
        } catch {
          window.prompt(label, email);
        }
      }}
    >
      {copied ? <Check size={18} weight="bold" aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
      {copied ? done : label}
    </button>
  );
}
