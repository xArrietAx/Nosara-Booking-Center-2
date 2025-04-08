import { ShuttleCard } from "@/components/ui/Cards/ShuttleCard";
import { Pagination } from "@/components/ui/Pagination";
import { Header } from "./Header";

export function Shuttles({ data, page, limit, count, totalPages, sortBy }) {
  return (
    <div className="flex flex-col gap-12 lg:w-2/3">
      <Header page={page} limit={limit} count={count} sortBy={sortBy} />

      <div className="grid gap-5 md:grid-cols-2">
        {
          data.length === 0 ? <p>No shuttles found</p> : data.map(item => {
            return <ShuttleCard key={item.id} data={item} />
          })
        }
      </div>

      <Pagination showControls={false} initialPage={page} total={totalPages} anchor="shuttles" className="gap-2 mt-auto" />
    </div>
  );
}