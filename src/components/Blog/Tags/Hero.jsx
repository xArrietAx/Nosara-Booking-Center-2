import { getTags } from "@/utils/blog/getTags";
import { Heading } from "@/components/Stateless/Heading";
import content from "@/content/tags.json";
import Link from "next/link";
import { Icon } from "@/components/Stateless/Icon";
import { Button } from "@/components/ui/Button";
import { HiArrowNarrowLeft } from "@/icons/index";
import { Pagination } from "@/components/ui/Pagination";
import { Search } from "@/components/Stateless/Search";

export async function Hero({ searchParams }) {
   
  const params = await searchParams;
  
    const page = parseInt(params.page) || 1;
    const postsPerPage = 15;
  
    const { tags, totalPages, allTags } = await getTags(page, postsPerPage)

  return (
    <section>
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-6 my-12">
        <Heading
          as="h1"
          title={content.hero.title}
          desc={content.hero.desc}
          classNameTitle="heading-2"
        />
       <Search className="lg:w-[30%]" data={allTags} fields={["name"]} />
        </div>

        <div className="grid gap-6 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {tags.map((item, i) => {
            return (
              <div
                key={i}
                className="flex flex-col gap-4 p-4 border border-border rounded transition-shadow duration-300 hover:shadow-card"
              >
                <Link className="link text-lg-bold" href={item.url}>
                  {item.name}
                </Link>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 -mt-4 text-text">
                    <Icon name={item.icon} />
                    <span className="text-sm-medium">
                      {item.count} {item.label}
                    </span>
                  </div>

                  <Button
                    as={Link}
                    href={item.url}
                    isIconOnly
                    variant="secondary"
                    hover="primary"
                    className="w-6 h-6"
                  >
                    <HiArrowNarrowLeft className="rotate-180 size-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        <Pagination
          showControls={false}
          initialPage={page}
          total={totalPages}
          className="gap-2 mt-12"
        />
        

      </div>
    </section>
  );
}
