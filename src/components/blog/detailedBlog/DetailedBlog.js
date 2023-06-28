import React from "react";
import styles from "./DetailedBlog.module.scss";
import DetailedBlogHeader from "./DetailedBlogHeader";
import DetailedBlogBody from "./DetailedBlogBody";
import CommentBoard from "../../comments/CommentBoard";

export default function DetailedBlog() {
  return (
    <div className={styles.detailedBlogContainer}>
      <DetailedBlogHeader />
      <DetailedBlogBody/>
      <CommentBoard/>
    </div>
  );
}
