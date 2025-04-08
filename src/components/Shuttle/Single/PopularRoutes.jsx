import { getPopularRoutes } from "@/utils/supabase/getPopularRoutes";
import Image from "next/image";
import Link from "next/link";

export async function PopularRoutes() {

  const { data } = await getPopularRoutes();

    return <div className="p-7 border border-border rounded-lg">
    <h2 className="text-xl-bold inline-block w-full pb-5 border-b border-border mb-8">
      Popular routes
    </h2>
    <ul className="flex flex-col gap-8">
      {data.slice(0, 5).map(item => {
        return (
          <li key={item.id}>
            <div className="flex items-center gap-3">
              <div className="flex-none w-20 h-20 rounded-lg overflow-hidden">
                <Image
                  src={item.gallery[0]}
                  alt=""
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <Link className="link text-md-bold line-clamp-2" href={`/Shuttles/${item.type}/${item.route}`}>
                  {item.name}
                </Link>
                  <p className="text-sm-medium text-text">
                   From ${item.type === "Shared" ? `${item.price.from} / person` : item.price.from}
                  </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  </div>
}