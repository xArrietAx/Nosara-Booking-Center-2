"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function Breadcrumb({ noLink }) {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter((path) => path);

  return (
    <section className="py-7 border-t border-border bg-sectionBg">
      <ol className="container flex items-center gap-3 font-medium text-sm text-text">
        <li>
          <Link href="/" className="link-reverse font-semibold">Home</Link>
        </li>
        {pathArray.map((path, index) => {
          const href = "/" + pathArray.slice(0, index + 1).join("/");
          const isLast = index === pathArray.length - 1;
          const decodedPath = decodeURIComponent(path.replace(/-/g, pathArray[0] === "Shuttles" ? " to " : " ").replace(/_/g, " "));

          // 🔹 Si `path` está en `noLink.names` y el índice coincide, no debe ser link
          const shouldBeLink = !(noLink?.names.includes(path) && noLink?.number === index);

          return (
            <li key={href} className="flex items-center gap-3">
              <span className="text-lg">/</span>
              {isLast || !shouldBeLink ? (
                <span className={`font-semibold line-clamp-1 ${!shouldBeLink ? "" : "text-black" }`}>
                  {decodedPath}
                </span>
              ) : (
                <Link href={href} className="link-reverse font-semibold ">
                  {decodedPath}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
