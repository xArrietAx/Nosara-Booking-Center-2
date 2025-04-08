import { Form } from "@/components/VacationRentals/Single/Form"

export function Aside({ house }) {
  return (
    <div className="space-y-8 lg:w-2/6">
      <Form house={house} />
    </div>
  );
}