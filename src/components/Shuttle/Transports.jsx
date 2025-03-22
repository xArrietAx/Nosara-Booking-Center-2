import { Aside } from "./Aside";
import { Shuttles } from "./Shuttles";

export function Transports({ data, countsData, page, limit, count, totalPages, sortBy }) {
  return (
    <section id="shuttles">
      <div className="container">
        <div className="flex flex-col-reverse gap-12 mt-14 lg:flex-row lg:gap-6">
          <Aside countsData={countsData} />
          <Shuttles data={data} page={page} limit={limit} count={count} totalPages={totalPages} sortBy={sortBy} />
        </div>
      </div>
    </section>
  );
}