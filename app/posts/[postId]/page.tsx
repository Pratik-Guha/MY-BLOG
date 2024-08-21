import getFormattedDate from '@/lib/getFormatteddate'
import { getPostData, getSortedPostsData } from '@/lib/posts'
import { notFound } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'

export function generateStaticParams() {
    const posts = getSortedPostsData()

    return posts.map((post) => ({
        postId: post.id
    }))
}
export function generateMetadata({ params }: { params: { postId: string } }): Metadata {
    const posts = getSortedPostsData(); // deduped
  
    const { postId } = params;
    const post = posts.find((post) => post.id === postId);
  
    if (!post) {
      return {
        title: "The Post is not found",
      };
    }
  
    return {
      title: post.title,
    };
  }
  

export default async function Post({params}:{params:{postId:string}}) {

    const posts=getSortedPostsData() //deduped

    const {postId}=params
    if(!posts.find(post=>post.id===postId)){
            notFound()
    }
    const {title,date,contentHtml}=await  getPostData(postId)

    const pubDate=getFormattedDate(date)
  return (
    <main className='px-6 prose prose-xl prose-slate dark:prose-invert mx-auto'>
      <h1 className='text-3xl mt-4 mb-0'>
        {title}
      </h1>
      <p className='mt-1'>
        {pubDate}
      </p>
      <article>
        <section dangerouslySetInnerHTML={{__html:contentHtml}} />
            <p>
            <Link href={"/"}>
             <span className='text-2xl'>←</span>Back to home
             </Link>
            </p>
      </article>
    </main>
  )
}
