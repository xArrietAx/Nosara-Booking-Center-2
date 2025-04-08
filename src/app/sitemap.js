import { getVacationRentals } from "@/utils/supabase/getVacationRentals";
import { getShuttles } from "@/utils/supabase/getShuttles";
import { getTours } from "@/utils/supabase/getTours";
import { getTags } from "@/utils/blog/getTags";
import { getCategories } from "@/utils/blog/getCategories";
import { getPosts } from "@/utils/blog/getPosts";

export default async function sitemap() {

    const tours = await getTours()
    const vacationRentals = await getVacationRentals()
    const shuttles = await getShuttles()
    const { posts } = await getPosts()
    const categories = await getCategories()
    const tags = await getTags()

    const Tours = tours.map(item => {
        return {
            url: `https://www.nosarabookingcenter.com/Tours/${item.name.replace(/ /g, "-")}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,   
        }
    })

    const VacationRentals = vacationRentals.map(item => {
        return {
            url: `https://www.nosarabookingcenter.com/Vacation-rentals/${item.name.replace(/ /g, "-")}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,   
        }
    })

    const Shuttles = shuttles.map(item => {
        return {
            url: `https://www.nosarabookingcenter.com/Shuttles/${item.type}/${item.route}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,   
        }
    })

    const Posts = posts.map(item => {
        return {
            url: `https://www.nosarabookingcenter.com/Blog/${item.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,   
        }
    })

    const Categories = categories.map(item => {
        return {
            url: `https://www.nosarabookingcenter.com/Blog/Categories/${item.name}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,   
        }
    })

    const Tags =tags.map(item => {
        return {
            url: `https://www.nosarabookingcenter.com/Blog/Tags/${item.name.replace(/ /g, "-")}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,   
        }
    })

    return [
        {
            url: 'https://www.nosarabookingcenter.com',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1.0,
        },
        {
            url: 'https://www.nosarabookingcenter.com/About',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://www.nosarabookingcenter.com/Contact',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: 'https://www.nosarabookingcenter.com/Vacation-rentals',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: 'https://www.nosarabookingcenter.com/Tours',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: 'https://www.nosarabookingcenter.com/Shuttles',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: 'https://www.nosarabookingcenter.com/Blog',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://www.nosarabookingcenter.com/Blog/Tags',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://www.nosarabookingcenter.com/Blog/Categories',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://www.nosarabookingcenter.com/Rentals/ATV',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: 'https://www.nosarabookingcenter.com/Rentals/Golf-cart',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: 'https://www.nosarabookingcenter.com/Rentals/Side-by-side',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: 'https://www.nosarabookingcenter.com/Privacy-policy',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: 'https://www.nosarabookingcenter.com/Cookies-policy',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: 'https://www.nosarabookingcenter.com/Terms-conditions',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        ...Tours,
        ...VacationRentals,
        ...Shuttles,
        ...Posts,
        ...Categories,
        ...Tags
    ];
}