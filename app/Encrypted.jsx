import { EncryptedText } from "@/components/ui/encrypted-text";
import React from "react";

export default function EncryptedTextDemoSecond({text}) {
  return (
    <p className="mx-auto font-bold max-w-lg text-left">
      <EncryptedText
        text={text}
        encryptedClassName="text-neutral-500"
        revealedClassName="text-black"
        revealDelayMs={50} />
    </p>
  );
}
