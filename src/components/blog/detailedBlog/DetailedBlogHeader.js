import React from "react";
import styles from "./DetailedBlogHeader.module.scss";

export default function DetailedBlogHeader({ author, blogPost }) {
  return (
    <section className={styles.blogHeaderContainer}>
      <div className="d-flex gap-3 align-items-center">
        <img
          src={author.photo}
          className={styles.authorImg}
          alt={author.name}
        />
        <div className={styles.author}>
          <p className={styles.authorName}>{author.name}</p>
          <small>{author.email}</small>
        </div>
      </div>
      <div className={styles.blogIntro}>
        <img src={blogPost.image} className="card-img" alt="blog" />
        <div className={styles.blogTitle}>
          <h5>{blogPost.title}</h5>
        </div>
      </div>
    </section>
  );
}
