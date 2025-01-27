import { getPosts } from "./getPosts";

export async function createGallery() {
    return await getPosts().map(item => (item.metadata.image))
}