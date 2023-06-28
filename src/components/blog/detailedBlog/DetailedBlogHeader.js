import React from "react";
import styles from "./DetailedBlogHeader.module.scss";

export default function DetailedBlogHeader() {
  return (
    <section className={styles.blogHeaderContainer}>
      <div className="d-flex gap-3 align-items-center">
        <img src="/img/user1.jpg" className={styles.authorImg} alt="author" />
        <div className={styles.author}>
          <p className={styles.authorName}>Parvesh Verma</p>
          <small>vparves@gmail.com</small>
        </div>
      </div>
      <div className={styles.blogIntro}>
        <img src="/img/js.jpg" className="card-img" alt="blog" />
        <div className={styles.blogTitle}>
          <h5>Why You Should Love JS</h5>
        </div>
      </div>
    </section>
  );
}
