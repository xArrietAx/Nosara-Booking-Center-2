"use client";

import { Button } from "@/components/ui/Button";
import content from "@/content/not-found.json";
import { useRouter } from "next/navigation";

export function BtnBack() {
  const { back } = useRouter();

  return (
    <Button size="lg" radius="smooth" onClick={back}>
      <i className="icon-[ion--arrow-back] size-5" /> {content.hero.btns.one}
    </Button>
  );
}