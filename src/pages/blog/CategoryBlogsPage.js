import React from "react";
import { useParams } from "react-router-dom";
import styles from "./CategoryBlogsPage.module.scss";
import Blogs from "../../components/blog/Blogs";
import { motion } from "framer-motion";

export default function CategoryBlogsPage() {
  const { blogCategory } = useParams();
  const title = blogCategory.toUpperCase().replace(/-/g, " ").trim();
  const endpoint = `blog-posts?category=${blogCategory}`;

  return (
    <div className={` ${styles.categoryBlogPage}`}>
      <motion.h2
        className="text-light fs-4 fs-md-2 mb-2 mb-md-4"
        initial={{ y: "-100px" }}
        animate={{ y: 0 }}
        transition={{ delay: 0.4, type: "spring" }}
      >
        {title}
      </motion.h2>
      <Blogs uniqueEndpoint={endpoint} />
    </div>
  );
}
