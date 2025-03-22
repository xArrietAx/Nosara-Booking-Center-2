import { getPosts } from "./getPosts";

const imagesCollection = {
  Adventure: "/blog/Adventure.webp",
  Wildlife:"/blog/Wildlife.webp",
  Nature:"/blog/Nature.webp",
  Travel: "/blog/Travel.webp",
  Discover: "/blog/Discover.webp",
  Cultural: "/blog/Cultural.webp",
  Gastronomy: "/blog/Gastronomy.webp",
  Wellness: "/blog/Wellness.webp"
}

export async function getCategories(page, limit) {
  const {posts} = await getPosts();

  const categoryCounts = posts.reduce((acc, post) => {
    acc[post.metadata.category] = (acc[post.metadata.category] || 0) + 1;
    return acc;
  }, {});

  const allCategories = Object.entries(categoryCounts)
    .map(([category, count]) => ({
      name: category,
      count,
      label: "Posts",
      url: `/Blog/Categories/${category}`,
      img: imagesCollection[category] || "/DefaultImage.webp",
      icon: "icon-[ph--files]",
    }))
    .sort((a, b) => b.count - a.count);

  if (!page && !limit) {
    return allCategories;
  }

  const startIndex = (page - 1) * limit; 
  const endIndex = page * limit; 

  const categories = allCategories.slice(startIndex, endIndex);

  const currentStart = startIndex + 1;
  const currentEnd = Math.min(endIndex, allCategories.length);

  return {
    categories,
    totalCategories: allCategories.length,
    allCategories,
    totalPages: Math.ceil(allCategories.length / limit),
    currentRange: `${currentStart}-${currentEnd}`
  };
}
