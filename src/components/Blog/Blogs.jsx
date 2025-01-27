import { Heading } from "@/components/Stateless/Heading";
import content from "@/content/blog.json";
import { getPosts } from "@/utils/blog/getPosts";
import { Aside } from "./Aside";
import { PostCard2 } from "../ui/Cards/PostCard2";
import { Pagination } from "../ui/Pagination";

export async function Blogs({ searchParams }) {
  const queries = await searchParams;

  const page = parseInt(queries.page) || 1;
  const postsPerPage = 4;

  const { posts, totalPages } = await getPosts(page, postsPerPage);

  return (
    <section className="section-space" id="blogs">
      <div className="container">
        <div className="flex flex-col gap-20 lg:flex-row lg:gap-6">
          <div className="flex flex-col gap-12 lg:w-2/3">
            <div>
            <Heading
              as="h3"
              title={content.blogs.title}
              desc={content.blogs.desc}
              classNameTitle="heading-2"
            />
            {posts.length === 0 ? (
              <div className="mt-14 font-bold text-center">No posts found</div>
            ) : (
              <div className="grid gap-10 mt-14">
                {posts.map((item) => {
                  return <PostCard2 key={item.slug} data={item} />;
                })}
              </div>
            )}
            </div>
            <Pagination
          showControls={false}
          initialPage={page}
          total={totalPages}
          anchor="#blogs"
          className="gap-2 mt-auto"
        />
          </div>
          <Aside />
        </div>

        
      </div>
    </section>
  );
}
