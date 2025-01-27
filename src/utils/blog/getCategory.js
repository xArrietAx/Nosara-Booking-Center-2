import { getCategories } from "@/utils/blog/getCategories";

export async function getCategory(slug) {
    const categories = await getCategories();
    const category = categories.find(item => item.name === slug);
    return category;
}