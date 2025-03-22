import { getPosts } from "./getPosts";

export async function createGallery() {

    const { posts } = await getPosts()

    return posts.map(item => (item.metadata.image))
}