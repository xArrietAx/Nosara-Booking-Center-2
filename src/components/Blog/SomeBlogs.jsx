import { MdCalendarMonth, HiOutlineClock } from "@/icons/index";
import { BtnInfo } from "../Stateless/BtnInfo";
import content from "@/content/blog.json";
import { getRecentPosts } from "@/utils/blog/getRecentPosts";
import Image from "next/image";
import Link from "next/link";

export async function SomeBlogs() {
  
  const posts = await getRecentPosts();

  return (
    <section className="section-space">
      <div className="container">
        <div className="flex flex-col gap-6 lg:flex-row">
          <Left post={posts[0]} />
          <Right posts={posts} />
        </div>
      </div>
    </section>
  );
}

function Right({ posts }) {
  return (
      <ul className="flex flex-col gap-6">
        {posts.slice(1, 5).map((item) => {
          return (
            <li key={item.slug}>
              <div className="flex gap-6">
                <div className="flex-none min-w-[7.5rem] max-w-[7.5rem] h-[7.5rem] rounded-lg overflow-hidden">
                  <Image
                    src={item.metadata.image}
                    alt=""
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-3 my-auto">
                  {" "}
                  <Link
                    href={`/Blog/${item.slug}`}
                    className="link text-xl-bold line-clamp-3"
                  >
                    {item.metadata.title}
                  </Link>
                  <div className="text-md-bold flex flex-wrap items-center gap-3 text-text">
                    <div className="flex items-center gap-1">
                      <MdCalendarMonth />{" "}
                      <span className="line-clamp-1">{item.metadata.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <HiOutlineClock />{" "}
                      <span className="line-clamp-1">
                        {item.metadata.duration} mins
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
  );
}

function Left({ post }) {

  return (
    <div className="relative h-0 p-[43%] lg:p-[27%] lg:pb-[18.1%]">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="relative w-full h-full">
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Image
              src={post.metadata.image}
              alt=""
              width={700}
              height={700}
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="absolute top-0 bottom-0 left-0 right-0 z-10 w-full h-full rounded-br-2xl rounded-bl-2xl bg-repeat-x bg-bottom"
            style={{ backgroundImage: `url('${content.someBlogs.shadow}')` }}
          >
            <div className="space-y-5 absolute bottom-0 w-full p-9">
              <div className="flex flex-col gap-4">
                <BtnInfo size="xs" variant="secondary" className={`w-fit`}>
                  {post.metadata.category}
                </BtnInfo>
                <Link
                  className="heading-5 text-white max-xs:line-clamp-2"
                  href={`Blog/${post.slug}`}
                >
                  {post.metadata.title}
                </Link>
              </div>
              <div className="flex items-center gap-5 text-white">
                <div className="flex items-center gap-3">
                  <Image
                    src={post.metadata.authorImage}
                    alt={post.metadata.author}
                    width={50}
                    height={50}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <p className="text-sm-bold">{post.metadata.author}</p>
                </div>
                <div className="w-[1px] h-[20px] bg-white" />
                <p className="text-sm-medium">{post.metadata.date}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}