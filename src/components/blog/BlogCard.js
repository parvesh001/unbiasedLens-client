import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import styles from "./BlogCard.module.scss";

import BlogInteractions from "./BlogInteractions";
import { useNavigate } from "react-router-dom";

export default function BlogCard({
  post,
  onRead,
  onLike,
  onDislike,
  onRemoveLike,
  onRemoveDislike,
}) {
  const navigate = useNavigate();

  const readClickHandler = () => {
    onRead();
    navigate(`/blogs/category/${post.slug}/${post.id}`);
  };

  return (
    <div className={`card p-0  ${styles.blogCard}`}>
      <div className={styles.cardOverlayShadow} />
      <img
        src={post.image}
        className={`card-img ${styles.blogCardImg}`}
        alt="..."
      />
      <div className="card-img-overlay p-1 p-md-3">
        <div className="card-subtitle">
          <div className="d-flex gap-2" style={{ cursor: "pointer" }}>
            <div className={styles.cardUserImg}>
              <img
                src={post.authorImg}
                className="w-100 rounded-circle"
                alt="author"
              />
            </div>
            <span className={styles.cardUserName}>{post.author}</span>
          </div>
        </div>
        <div className={`text-center mt-2 ${styles.blogPostTitle}`}>
          <p>{post.title}</p>
        </div>
        <div className="position-absolute bottom-0 d-flex justify-content-between w-75">
          <div className="d-flex gap-4">
            <BlogInteractions
              post={post}
              onLike={onLike}
              onDislike={onDislike}
              onRemoveLike={onRemoveLike}
              onRemoveDislike={onRemoveDislike}
            />

            <div className="d-flex flex-column align-items-center">
              <AiOutlineEye className={styles.blogPostViewIcon} />
              <span>{post.views}</span>
            </div>
          </div>
          <div
            className="fs-5"
            style={{ cursor: "pointer" }}
            onClick={readClickHandler}
          >
            <span className={`border-bottom ${styles.readBtn}`}>Read</span>
          </div>
        </div>
      </div>
    </div>
  );
}
