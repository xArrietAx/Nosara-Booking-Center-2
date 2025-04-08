import { getPosts } from "./getPosts";

export async function getPost(slug) {
    const { posts } = await getPosts()
    return posts.find(item => item.slug === slug )
}