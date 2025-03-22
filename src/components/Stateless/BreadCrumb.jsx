"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function Breadcrumb() {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter((path) => path);

  return (
    <section className="py-7 border-t border-border bg-sectionBg">
      <ol className="container flex items-center gap-3 font-medium text-sm text-text">
        <li>
          <Link href="/"className="link-reverse">Home</Link>
        </li>
        {pathArray.map((path, index) => {
          const href = "/" + pathArray.slice(0, index + 1).join("/");
          const isLast = index === pathArray.length - 1;

          return (
            <li key={href} className="flex items-center gap-3">
              <span className="text-lg">/</span>
              {isLast ? (
                <span className="text-black font-bold line-clamp-1" >
                  {decodeURIComponent(path.replace(/-/g, " "))}
                </span>
              ) : ( pathArray[0] === "Rentals" ? <span>{decodeURIComponent(path.replace(/-/g, " "))}</span> : 
                <Link href={href} className="link-reverse">
                  {decodeURIComponent(path.replace(/-/g, " "))}
                </Link> )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
