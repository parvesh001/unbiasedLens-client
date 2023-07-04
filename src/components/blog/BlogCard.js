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
  current,
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
      <div className="card-img-overlay d-grid p-1 p-md-3">
        <div className="card-subtitle">
          <div className="d-flex gap-2" style={{ cursor: "pointer" }} onClick={()=>navigate(`/author/${post.author}/${post.authorId}`)}>
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
        <div className="align-self-end d-flex justify-content-between">
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
          <div className="d-flex gap-2">
            <div
              className="fs-6"
              style={{ cursor: "pointer" }}
              onClick={readClickHandler}
            >
              <span className={`border-bottom ${styles.readBtn}`}>Read</span>
            </div>
            {current && (
              <div
                className="fs-6"
                style={{ cursor: "pointer" }}
                onClick={readClickHandler}
              >
                <span className={`border-bottom ${styles.readBtn}`}>
                  Update
                </span>
              </div>
            )}
            {current && (
              <div
                className="fs-6"
                style={{ cursor: "pointer" }}
                onClick={readClickHandler}
              >
                <span className={`border-bottom ${styles.readBtn}`}>
                  Delete
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
