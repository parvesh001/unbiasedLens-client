import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DetailedBlogHeader.module.scss";

export default function DetailedBlogHeader({ author, blogPost }) {
  const navigate = useNavigate();
  return (
    <section className={styles.blogHeaderContainer}>
      <div
        className="d-flex gap-3 align-items-center"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/author/${author.name}/${author._id}`)}
      >
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
