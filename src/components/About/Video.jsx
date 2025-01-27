import content from "@/content/about.json";
import Image from "next/image";
import { VideoModal } from "./VideoModal";

export function Video() {
  return (
    <section className="relative before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:h-60 before:bg-sectionBg">
      <div className="container">
        <div className="relative rounded-2xl bg-secondary overflow-hidden">
          <Image
            src={content.story.img}
            alt=""
            width={1116}
            height={540}
            className="w-full h-full object-cover"
          />
          <VideoModal />
        </div>
      </div>
    </section>
  );
}
