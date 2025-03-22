import { getPosts } from "./getPosts";

export async function getPostsByCategory(category, page, limit) {

  const { posts: allPosts } = await getPosts();

  const filteredPosts = allPosts.filter(
    (post) => post.metadata.category === category
  );

  const totalPosts = filteredPosts.length; 
  const totalPages = Math.ceil(totalPosts / limit);
  const startIndex = (page - 1) * limit; 
  const endIndex = page * limit; 

  const posts = filteredPosts.slice(startIndex, endIndex);

  const currentStart = startIndex + 1;
  const currentEnd = Math.min(endIndex, totalPosts);

  return {
    posts,
    totalPosts,
    totalPages,
    currentRange: `${currentStart}-${currentEnd}`,
  };
}
