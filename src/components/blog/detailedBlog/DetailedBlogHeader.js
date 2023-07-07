import React from "react";
import Author from "../../author/Author";
import styles from "./DetailedBlogHeader.module.scss";

export default function DetailedBlogHeader({ author, blogPost }) {
  return (
    <section className={styles.blogHeaderContainer}>
      <Author
        id={author._id}
        name={author.name}
        email={author.email}
        photo={author.photo}
      />
      <div className={styles.blogIntro}>
        <img src={blogPost.image} className="card-img" alt="blog" />
        <div className={styles.blogTitle}>
          <h5>{blogPost.title}</h5>
        </div>
      </div>
    </section>
  );
}
