import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import Blogs from '../../components/blog/Blogs';
import styles from './AuthorBlogPage.module.scss'
import { AuthContext } from '../../context/authContext';

export default function AuthorBlogsPage() {
    const {author} = useContext(AuthContext)
    const {id, name} = useParams()
    let endpoint = `authors/author/${id}/posts?`
    let current = author?._id === id
    
  return (
    <div className={styles.authorBlogPage}>
       <h2 className="text-light text-uppercase fs-4 fs-md-2 mb-2 mb-md-4">{name}'s BLOGS</h2>
      <Blogs uniqueEndpoint={endpoint} current={current}/>
    </div>
  )
}
