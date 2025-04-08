import { Form } from "@/components/Tours/Single/Form";

export function Aside({ tour }) {
  return (
    <div className="space-y-8 lg:w-2/6">
        <Form tour={tour} />
    </div>
  );
}