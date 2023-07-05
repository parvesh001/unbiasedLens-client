import React from "react";
import { useParams } from "react-router-dom";
import styles from "./CategoryBlogsPage.module.scss";
import CategoryBlogs from "../../components/blog/categoryBlogs/CategoryBlogs";

export default function CategoryBlogsPage() {
  const { blogCategory } = useParams();
  const title = blogCategory.toUpperCase().replace(/-/g, " ").trim();

  return (
    <div className={` ${styles.categoryBlogPage}`}>
      <h2 className="text-light fs-4 fs-md-2 mb-2 mb-md-4">{title}</h2>
      <CategoryBlogs category={blogCategory} />
    </div>
  );
}
