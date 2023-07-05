import React from 'react'
import { useParams } from 'react-router-dom'
import Blogs from '../../components/blog/Blogs';
import styles from './AuthorBlogPage.module.scss'

export default function AuthorBlogsPage() {
    const {id} = useParams()
    let endpoint = `authors/author/${id}/posts`
  return (
    <div className={styles.authorBlogPage}>
       <h2 className="text-light fs-4 fs-md-2 mb-2 mb-md-4">YOUR BLOGS</h2>
      <Blogs uniqueEndpoint={endpoint} current={true}/>
    </div>
  )
}
