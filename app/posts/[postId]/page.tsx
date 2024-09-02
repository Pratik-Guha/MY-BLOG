import getFormattedDate from "@/lib/getFormatteddate";
import { getPostsMeta, getPostByName } from "@/lib/posts";
import { notFound } from "next/navigation";
import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import 'highlight.js/styles/github-dark.css'
export const revalidate = 86400;

type Props = {
  params: {
    postId: string;
  };
};
export async function generateStaticParams() {
    const posts =await getPostsMeta()

    if(!posts) return []

    return posts.map((post) => ({
        postId: post.id
    }))
}
export async function generateMetadata({ params: { postId } }: Props) {
  const post = await getPostByName(`${postId}.mdx`); // deduped

  if (!post) {
    return {
      title: "The Post is not found",
    };
  }

  return {
    title: post.meta.title,
  };
}

export default async function Post({ params: { postId } }: Props) {
  const post = await getPostByName(`${postId}.mdx`); //deduped

  if (!post) notFound();

  const {meta,content}=post
  const pubDate=getFormattedDate(meta.date)

  const tags = meta.tags.map((tag,i)=>(
    <Link href={`/tags/${tag}`} key={i}>{tag}</Link>
  ))
  return (
    <main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
      <h2 className="text-3xl mt-4 mb-0">{meta.title}</h2>
      <p className="mt-1 text-sm">{pubDate}</p>
      <article>
        {content}
      </article>
      <section>
        <h3>
          Related :
        </h3>
        <div className="flex flex-wrap gap-4">
          {tags}
        </div>
      </section>
      <p className="mb-10">
        <Link href={"/"}>
          <span className="text-2xl">←</span>Back to home
        </Link>
      </p>
    </main>
  );
}
