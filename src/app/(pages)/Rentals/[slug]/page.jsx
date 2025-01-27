import { Aside } from "@/components/Rentals/Aside";
import { Breadcrumb } from "@/components/Stateless/BreadCrumb";

export default async function Rentals({ params }) {
  const { slug } = await params;
  return (
    <main>
      <Breadcrumb />
      <section>
        <div className="container">
          <div className="flex flex-col justify-between gap-6 py-12 lg:flex-row">
            <div className="w-full">

            </div>
            <Aside slug={slug} />
          </div>
        </div>
      </section>
    </main>
  );
}
