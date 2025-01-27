import { PostCard } from "@/components/ui/Cards/PostCard";
import { Pagination } from "@/components/ui/Pagination";

export function Posts({ data, page, totalPages }) {
  return (
    <section>
      <div className="container">
        <div className="mt-14">
          {data.length === 0 ? (
            <div className="font-bold text-center">No posts found</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {data.map((item) => {
                return <PostCard key={item.slug} data={item} />;
              })}
            </div>
          )}
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
