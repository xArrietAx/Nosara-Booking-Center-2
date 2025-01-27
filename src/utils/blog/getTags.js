import constants from "@/config/constants.json";
import { getPosts } from "./getPosts";

export async function getTags(page, limit) {
  const posts = await getPosts();

  const tagCounts = posts.reduce((acc, post) => {
    post.metadata.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  const allTags = Object.entries(tagCounts)
    .map(([tag, count]) => ({
      name: tag,
      count,
      label: "Posts",
      url: `Tags/${tag}`,
      img: constants[tag] || "/DefaultImage.webp",
      icon: "PiFiles",
    }))
    .sort((a, b) => b.count - a.count);

  if (!page && !limit) {
    return allTags;
  }

  const startIndex = (page - 1) * limit; 
  const endIndex = page * limit; 

  const tags = allTags.slice(startIndex, endIndex);

  const currentStart = startIndex + 1;
  const currentEnd = Math.min(endIndex, allTags.length); 

  return {
    tags,
    totalTags: allTags.length,
    allTags,
    totalPages: Math.ceil(allTags.length / limit),
    currentRange: `${currentStart}-${currentEnd}`, 
  };
}
