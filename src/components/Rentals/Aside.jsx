import { Form } from "./Form/Form";

export function Aside({ slug }) {
    return <div className="lg:w-2/3">
        <div className="p-10 rounded-3xl bg-secondary">
            <h2 className="heading-3 pb-3 border-b border-border">
                $120
                <span className="text-md-medium text-text">/ From</span>
            </h2>
            <Form slug={decodeURIComponent(slug)} />       
        </div>
    </div>
}