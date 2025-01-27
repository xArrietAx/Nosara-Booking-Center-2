import { getTags } from "@/utils/blog/getTags";

export async function getTag(slug) {
    const tags = await getTags();
    const tag = tags.find(item => item.name === slug);
    return tag;
}