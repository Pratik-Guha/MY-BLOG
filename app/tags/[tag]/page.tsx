import { getPostsMeta } from "@/lib/posts";
import ListItem from "@/app/components/ListItem";
import Link from "next/link";
import { title } from "process";

export const revalidate=86400

type Props={
    params:{
        tag:string
    }
}

export async function generateStaticParams() {
    const posts =await getPostsMeta()

    if(!posts) return []

    const tags=new Set(posts.map((post)=>post.tags).flat())

    return Array.from(tags).map((tag)=>({
        tag
    }))
}

export function generateMetadata({params:{tag}}:Props) {

    return {
        title:`Posts about ${tag}`
    }
}

export default  async function TagPostList({params:{tag}}:Props) {

    const posts=await getPostsMeta()
    if(!posts) return <h1 className="mt-12 text-center">Sorry there is no post available</h1>

    const tagPosts=posts.filter((post)=>post.tags.includes(tag))

    if(!tagPosts.length){
        return (
            <div className=" text-center">
                <p className="mt-10">Sorry there is no post available for the tag {tag}</p>
                <Link href={"/"}>
                <span className="text-2xl">←</span>Back to Home
                </Link>
            </div>
        )
    }

    return (
        <div>
            <h2 className="text-4xl font-bold mt-4 mb-0">
                Results for :#{tag}
            </h2>
            <section  className="mt-6 mx-auto max-w-2xl">
                <ul className="w-full list-none p-0">
                    {tagPosts.map(post=>(
                        <ListItem key={post.id} post={post}/>
                    ))}
                </ul>
            </section>
        </div>
    )
}