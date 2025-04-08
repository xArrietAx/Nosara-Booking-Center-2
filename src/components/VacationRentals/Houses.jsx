import { Aside } from "./Aside";
import { HouseGrid } from "./HousesGrid";

export function Houses({ data, countsData, page, limit, count, totalPages, sortBy }) {
  return (
    <section id="houses">
      <div className="container">
        <div className="flex flex-col-reverse gap-12 mt-14 lg:flex-row lg:gap-6">
          <Aside countsData={countsData} />
          <HouseGrid data={data} totalPages={totalPages} page={page} limit={limit} sortBy={sortBy} count={count} />
        </div>
      </div>
    </section>
  );
}