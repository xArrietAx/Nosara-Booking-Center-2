"use client"

import { Button } from "../ui/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Share() {

  const pathname = usePathname()
 
  const url = `www.nosarabookingcenter.com${pathname}`
  const text = "I found this amazing rental service in Nosara!";

  return (
        <div className="flex items-center gap-2">

          <Button as={Link} size="sm" variant="outline" hover="outline" href={`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`} target="_blank" rel="noopener noreferrer" >
          <i className="icon-[famicons--logo-whatsapp] size-6" />
          <span className="font-bold">Share</span>
          </Button> 

         <Button as={Link} size="sm" variant="secondary" href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" >
         <i className="icon-[famicons--logo-facebook] size-6" />
         <span className="font-bold">Share</span>
          </Button>

        </div>
  );
}
