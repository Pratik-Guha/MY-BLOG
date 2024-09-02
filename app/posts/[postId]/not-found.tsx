import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='text-center'>
    <h1 className='text-4xl font-bold mt-10'>
     Sorry 😥 The requested post does not exist .
    </h1>
    <Link href={'/'}>
      <span className="text-2xl">←</span>Back to home
    </Link>
    </div>
  )
}
