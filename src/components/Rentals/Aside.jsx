import { Form } from "./Form/Form";

export function Aside({ slug }) {
  return (
    <div className="lg:w-2/6">
      <Form slug={decodeURIComponent(slug)} />
    </div>
  );
}
