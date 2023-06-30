import React from "react";
import { useParams } from "react-router-dom";
import BlogCards from "../../components/blog/BlogCards";
import ErrorBoundary from '../../components/errorBoundary/ErrorBoundary'
import styles from './CategoryBlog.module.scss'

export default function CategoryBlogs() {
  const { blogCategory } = useParams();
  const title = blogCategory.toUpperCase().replace(/-/g, " ").trim();
  
  return (
    <div className={` ${styles.categoryBlogPage}`}>
      <h2 className="text-light fs-4 fs-md-2 mb-2 mb-md-4">{title}</h2>
      <ErrorBoundary>
        <BlogCards category={blogCategory} />
      </ErrorBoundary>
    </div>
  );
}


