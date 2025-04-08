import { Pagination } from "@/components/ui/Pagination";
import { Header } from "./Header";
import { HouseCard } from "../ui/Cards/HouseCard";

export function HouseGrid({ data, page, limit, count, totalPages, sortBy }) {
  return (
    <div className="flex flex-col gap-12 lg:w-2/3">
      <Header page={page} limit={limit} count={count} sortBy={sortBy} />

      <div className="grid gap-5 md:grid-cols-2">
        {
          data.length === 0 ? <p>No vacation rentals found</p> : data.map(item => {
            return <HouseCard key={item.id} data={item} />
          })
        }
      </div>

      <Pagination showControls={false} initialPage={page} total={totalPages} anchor="houses" className="gap-2 mt-auto" />

    </div>
  );
}