import React from "react";
import styles from "./CreateBlogPage.module.scss";
import CreateBlog from "../../components/blog/createBlog/CreateBlog";
import ErrorBoundary from "../../components/errorBoundary/ErrorBoundary";

export default function CreateBlogPage() {
  return (
    <div className={styles.createBlogPage}>
      <h6 className={styles.slogan}>
        your voice. your story. write with unbiased lens
      </h6>
      <ErrorBoundary>
        <CreateBlog />
      </ErrorBoundary>
    </div>
  );
}
