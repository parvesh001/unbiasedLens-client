import React from "react";
import styles from "./DetailedBlogBody.module.scss";

export default function DetailedBlogBody({ content }) {
  return (
    <section className={styles.detailedBlogBody}>
      <p>{content}</p>
    </section>
  );
}
