import { Form } from "@/components/Shuttle/Single/Form";
import { PopularRoutes } from "./PopularRoutes";

export function Aside({ type, route, price }) {
  return (
    <div className="space-y-8 lg:w-2/6">
      <Form type={type} route={route} price={price} />
      <PopularRoutes />
    </div>
  );
}