import { Button } from "../ui/Button";
import { HiArrowNarrowLeft } from "@/icons/index";
import { Heading } from "@/shared/Heading";
import content from "@/content/home.json";
import Link from "next/link";
import { BlogCarousel } from "./BlogCarousel";

export function Blog() {
  return (
    <section className="section-space">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Heading
            as="h6"
            title={content.blog.title}
            desc={content.blog.desc}
            className="md:w-3/4 lg:w-4/6 xl:w-fit"
            classNameTitle="heading-2"
          />

          <div className="flex justify-end gap-2 w-full md:w-fit">
            <Button
              isIconOnly
              variant="secondary"
              hover="primary"
              className="blog-btn-prev"
            >
              <HiArrowNarrowLeft />
            </Button>
            <Button
              isIconOnly
              variant="secondary"
              hover="primary"
              className="blog-btn-next rotate-180"
            >
              <HiArrowNarrowLeft />
            </Button>
          </div>
        </div>

        <div className="mt-10">
          <BlogCarousel />
        </div>

        <div className="flex justify-center mt-12">
          <Button as={Link} href="Vacation_rentals">
            View More <HiArrowNarrowLeft className="rotate-180 size-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}
