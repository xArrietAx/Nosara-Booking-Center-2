import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { headers } from "next/headers";

export async function Footer({ tags }) {
  const headersList = await headers();

  const referer = headersList.get("referer") || "";

  return (
    <div className="flex flex-wrap justify-between gap-5 pt-8 border-t border-border">
      <ul className="flex flex-wrap gap-3">
        {tags.map((item) => {
          return (
            <Button
              as={Link}
              href={`Tags/${item}`}
              key={item}
              size="sm"
              variant="outline"
              hover="secondary"
            >
              {item}
            </Button>
          );
        })}
      </ul>
      <div className="flex items-center justify-center gap-2">
        <p className="text-lg-bold whitespace-nowrap">Share this:</p>
        <Button
  as={Link}
  href="https://www.instagram.com/"
  target="_blank"
  rel="noopener noreferrer"
  isIconOnly="md"
  className="hover:-translate-y-1"
  aria-label="Share on Instagram"
>
  <i className="icon-[tabler--brand-instagram-filled] size-6" />
</Button>
        <Button
          as={Link}
          href={`http://www.facebook.com/sharer.php?u=${referer}`}
          target="_blank"
          rel="noopener noreferrer"
          isIconOnly="md"
          className="hover:-translate-y-1"
          aria-label="Visit our facebook page"
        >
          <i className="icon-[mage--facebook-square] size-6" />
        </Button>
        <Button
          isIconOnly="md"
          className="hover:-translate-y-1"
          aria-label="Just for decorating"
        >
          <i className="icon-[tabler--brand-youtube-filled]  size-6" />
        </Button>
      </div>
    </div>
  );
}
