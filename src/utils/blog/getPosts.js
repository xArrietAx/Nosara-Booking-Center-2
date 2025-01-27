import { parse, compareDesc } from "date-fns";
import { getMDXData } from "../MDX/getMDXData";
import path from "path";

// export function getPosts(page, limit, filters = {}) {

//   const allPosts = getMDXData(path.join(process.cwd(), "src/posts"));

//   if ( !page && !limit && Object.keys(filters).length === 0 ) {
//     return allPosts;
//   }

//   const { sortBy, category, duration } = filters

//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;
//   const posts = allPosts.slice(startIndex, endIndex);

//   const currentStart = startIndex + 1; 
//   const currentEnd = Math.min(endIndex, allPosts.length);

//   return {
//     posts,
//     totalPosts: allPosts.length,
//     totalPages: Math.ceil(allPosts.length / limit),
//     currentRange: `${currentStart}-${currentEnd}`,
//   };
// }

export function getPosts(page, limit, filters = {}) {
  
  const allPosts = getMDXData(path.join(process.cwd(), "src/posts"));

  if (!page && !limit && Object.keys(filters).length === 0) {
    return allPosts;
  }

  const { sortBy, category, duration } = filters;

  let filteredPosts = [...allPosts];

  if (category) {
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.metadata.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (duration) {
    const [minDuration, maxDuration] = duration.split("-").map(Number);
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.metadata.duration >= minDuration &&
        post.metadata.duration <= maxDuration
    );
  }

  if (sortBy) {
    if (sortBy === "nameAsc") {
      filteredPosts.sort((a, b) =>
        a.metadata.title.localeCompare(b.metadata.title)
      );
    } else if (sortBy === "recent") {
      filteredPosts.sort((a, b) =>
        compareDesc(
          parse(a.metadata.date, "dd MMM yyyy", new Date()),
          parse(b.metadata.date, "dd MMM yyyy", new Date())
        )
      );
    }
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const posts = filteredPosts.slice(startIndex, endIndex);

  const currentStart = startIndex + 1;
  const currentEnd = Math.min(endIndex, filteredPosts.length);

  return {
    posts,
    totalPosts: filteredPosts.length,
    totalPages: Math.ceil(filteredPosts.length / limit),
    currentRange: `${currentStart}-${currentEnd}`,
  };
}

