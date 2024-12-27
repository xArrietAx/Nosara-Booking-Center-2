"use client";

import { usePathname } from "next/navigation";
import { HiChevronDown } from "@/icons/index";
import Link from "next/link";

export function Breadcrumb() {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter((path) => path);

  return (
    <section className="py-9 border-t border-border bg-sectionBg">
      <ol className="container flex items-center gap-3 font-medium text-text">
        <li>
          <Link href="/">Home</Link>
        </li>
        {pathArray.map((path, index) => {
          const href = "/" + pathArray.slice(0, index + 1).join("/");
          const isLast = index === pathArray.length - 1;

          return (
            <li key={href} className="flex items-center gap-3">
              <HiChevronDown className="size-6 -rotate-90" />
              {isLast ? (
                <span className="text-black font-bold" >
                  {decodeURIComponent(path.replace(/-/g, " "))}
                </span>
              ) : (
                <Link href={href} className="">
                  {decodeURIComponent(path.replace(/-/g, " "))}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
