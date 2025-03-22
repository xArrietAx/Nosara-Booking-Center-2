import Image from "next/image";

export function Header({ post }) {
  return (
    <div className="space-y-8 mb-12">
      <h1 className="heading-4">{post.title}</h1>
      <div className="flex flex-wrap items-center gap-5 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src="/blog/user.webp"
              alt=""
              width={150}
              height={150}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="font-bold">{post.author}</p>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1">
            <i className="icon-[mage--calendar-2] text-text size-4" />
            <p>{post.date}</p>
          </div>
          <div className="flex items-center gap-1">
            <i className="icon-[mage--clock] text-text size-4" />
          <p>{post.duration} mins</p>
          </div>
        </div>
      </div>
    </div>
  );
}
