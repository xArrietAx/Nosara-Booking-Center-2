import { getCategories } from "@/utils/blog/getCategories";
import { getRecentPosts } from "@/utils/blog/getRecentPosts";
import { createGallery } from "@/utils/blog/createGallery";
import { getPosts } from "@/utils/blog/getPosts";
import { Button } from "@/components/ui/Button";
import { MdCalendarMonth } from "@/icons/index";
import { Gallery } from "./Singles/Gallery";
import Image from "next/image";
import Link from "next/link";
import { Search } from "@/components/Stateless/Search";

export async function Aside() {

  const posts = await getPosts()
  const recentposts = await getRecentPosts()
  const categories = await getCategories()
  const gallery = await createGallery()

  return (
    <aside className="space-y-8 lg:w-2/6">

      <Search data={posts} fields={["metadata.title"]} />

      <div className="p-7 border border-border rounded-lg">
        <span className="text-xl-bold inline-block w-full pb-5 border-b border-border mb-8">
          Explore Categories
        </span>
        <ul className="flex flex-wrap gap-3">
          {categories.map((item, i) => {
            return (
              <li key={i}>
                <Button as={Link} href={item.url} size="sm" variant="outline" hover="secondary">{item.name}</Button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="p-7 border border-border rounded-lg">
        <span className="text-xl-bold inline-block w-full pb-5 border-b border-border mb-8">
          Recent Posts
        </span>
        <ul className="flex flex-col gap-8">
          {recentposts.slice(0, 5).map(item => {
            return (
              <li key={item.slug}>
                <div className="flex items-center gap-3">
                  <div className="flex-none w-20 h-20 rounded-lg overflow-hidden">
                    <Image
                      src={item.metadata.image}
                      alt=""
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <Link className="link text-md-bold line-clamp-3" href={`/Blog/${item.slug}`}>
                      {item.metadata.title}
                    </Link>
                    <div className="flex items-center gap-2 text-text">
                      <MdCalendarMonth />
                      <p className="text-sm-medium">{item.metadata.date}</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <Gallery gallery={gallery} />

    </aside>
  );
}
