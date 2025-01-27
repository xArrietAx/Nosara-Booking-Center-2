import { getPosts } from "./getPosts";

export async function getPost(slug) {
    return await getPosts().find(item => item.slug === slug )
}