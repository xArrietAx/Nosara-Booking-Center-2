import { Form } from "@/components/Rentals/Form";

export function Aside({ rent }) {
  return (
    <div className="lg:w-2/6">
      <Form rent={rent} />
    </div>
  );
}