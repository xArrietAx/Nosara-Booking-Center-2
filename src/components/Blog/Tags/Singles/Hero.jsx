import { Heading } from "@/components/Stateless/Heading";

export function Hero({ data }) {
  const { name, count, label } = data;

  return (
    <section>
      <div className="container">
        <div className="relative flex items-center justify-center h-0 p-[40%] rounded-xl mt-12 text-center bg-sectionBg sm:p-[30%] md:p-[25%] lg:p-[20%] xl:p-[16%]">
          <div
            style={{
              backgroundImage: "url('/sectionBg.webp')",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className="absolute top-0 left-0 w-full h-full"
          />
          <Heading
            as="h1"
            title={name}
            desc={
              <>
              <i className="icon-[ph--files] size-6" />
                {count} {label}
              </>
            }
            className="absolute"
            classNameTitle="heading-2 break-words"
            classNameDesc="flex items-center justify-center gap-1"
          />
        </div>
      </div>
    </section>
  );
}
