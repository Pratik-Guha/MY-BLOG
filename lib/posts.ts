import { BlogPost } from '@/types'
import  { compileMDX} from 'next-mdx-remote/rsc'
import { Meta } from '@/types'
import rehypeAutoLinkinHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import Video from '@/app/components/Video'
import CustomImage from '@/app/components/CustomImage'

type Filetree={
    "tree":[
        {"path":string,}
    ]
}

export async function getPostByName(fileName:string):Promise<BlogPost | undefined>{
    
    const res = await fetch(`https://raw.githubusercontent.com/Pratik-Guha/test-blog/main/${fileName}`,{
        headers:{
            Accept:"application/vnd.github+json",
            Authorization:`Bearer ${process.env.GITHUB_TOKEN}`,
            'X-GitHub-Api-Version':'2022-11-28',
        }
    })

    if(!res.ok) return undefined

    const rawMDX = await res.text()
    if(rawMDX === '404 : Not Found'){
        return undefined
    }

    const { frontmatter, content}= await compileMDX<{ title :string ,date :string,tags :string[] }>({
            source:rawMDX,
            components:{
                Video,
                CustomImage
            },
            options:{
                parseFrontmatter:true,
                mdxOptions:{
                    rehypePlugins:[
                        rehypeHighlight,
                        rehypeSlug,
                        [
                            rehypeAutoLinkinHeadings,{
                                behavior:"wrap"
                            }
                        ]
                    ]
                }
            }
        })
    const id =fileName.replace(/\.mdx$/,'')

    const BlogPostObj :BlogPost ={
        meta :{ id ,title:frontmatter.title,date:frontmatter.date,tags:frontmatter.tags},
        content
    }

    return BlogPostObj
}
export async function getPostsMeta(): Promise< Meta[] | undefined>{
    const res= await fetch("https://api.github.com/repos/Pratik-Guha/test-blog/git/trees/main?recursive=1",{
        headers:{
            Accept:"application/vnd.github+json",
            Authorization:`Bearer ${process.env.GITHUB_TOKEN}`,
            'X-GitHub-Api-Version':'2022-11-28',
        }
    })
    if(!res.ok) return undefined
    const repoFiletree:Filetree =await res.json()

    const filesArray = repoFiletree.tree.map(obj => obj.path).filter(
        path=>path.endsWith(".mdx")
    )

    const posts:Meta[]=[]

    for(const file of filesArray){
        const post =await getPostByName(file)

        if(post){
            const {meta}=post
            posts.push(meta)
        }
    }

    return posts.sort((a,b)=>a.date<b.date?1:-1)
}