import { Button } from "@/components/ui/Button";
import { MdFacebook } from "@/icons/index";
import Link from "next/link";
import { headers } from 'next/headers';

export async function Footer({ tags }) {

  const headersList = await headers();

  const referer = headersList.get('referer') || ""

  return (
    <div className="flex flex-wrap justify-between gap-5 pt-8 border-t border-border">
      <ul className="flex flex-wrap gap-3">
        {tags.map(item => {
          return <Button as={Link} href={`Tags/${item}`} key={item} size="sm" variant="outline" hover="secondary">
          {item}
        </Button>
        })}  
      </ul>
        <div className="flex items-center justify-center gap-2">
          <p className="text-lg-bold whitespace-nowrap">Share this:</p>
          <Button
            as={Link}
            variant="outline"
            href={`http://www.facebook.com/sharer.php?u=${referer}`}
            target="_blank"
            rel="noopener noreferrer"
            isIconOnly
            className="hover:-translate-y-1"
          >
            <MdFacebook className="size-6" />
          </Button>
        </div>
    </div>
  );
}
