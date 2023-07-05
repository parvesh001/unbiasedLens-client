import React from 'react'
import { useParams } from 'react-router-dom'
import AuthorBlogs from '../../components/blog/authorBlogs/AuthorBlogs'

export default function AuthorBlogsPage() {
    const {id} = useParams()
  return (
    <div>
      <AuthorBlogs id={id}/>
    </div>
  )
}
