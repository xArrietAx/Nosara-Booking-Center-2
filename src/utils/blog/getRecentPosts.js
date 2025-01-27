import { getPosts } from "./getPosts";
import { parse, compareDesc } from "date-fns";

export async function getRecentPosts() {
  const recentPosts = await getPosts().sort((a, b) => {
    let dateA = parse(a.metadata.date, "dd MMM yyyy", new Date());
    let dateB = parse(b.metadata.date, "dd MMM yyyy", new Date());
    let result = compareDesc(dateA, dateB);
    return result;
  });
  return recentPosts;
}
