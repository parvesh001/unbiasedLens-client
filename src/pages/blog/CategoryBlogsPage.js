import React from "react";
import { useParams } from "react-router-dom";
import styles from "./CategoryBlogsPage.module.scss";
import Blogs from "../../components/blog/Blogs";


export default function CategoryBlogsPage() {
  const { blogCategory } = useParams();
  const title = blogCategory.toUpperCase().replace(/-/g, " ").trim();
  const endpoint = `blog-posts?category=${blogCategory}`

  return (
    <div className={` ${styles.categoryBlogPage}`}>
      <h2 className="text-light fs-4 fs-md-2 mb-2 mb-md-4">{title}</h2>
      <Blogs uniqueEndpoint={endpoint} />
    </div>
  );
}
