import React from 'react'
import Link from 'next/link'
import getFormattedDate from '@/lib/getFormatteddate'
import {Meta} from '@/types'
type Props={
    post:Meta
}
export default function ListItem({post}:Props) {
    const {id,title,date}=post
    const formattedDate=getFormattedDate(date)
  return (
    <li className='mt-4 text-2xl dark:text-white/90 '>
      <Link className='underline mb-4 hover:text-black70 dark:hover:text-slate-300 ' href={`/posts/${id}`}>
      {title}
      </Link>
      <p className='text-sm mt-1'>{formattedDate} </p>
    </li>
  )
}
