import React from "react";
import {
  AiOutlineEye,
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import styles from "./BlogCard.module.scss";

export default function BlogCard({
  post,
  onLike,
  onDislike,
  onRemoveLike,
  onRemoveDislike,
}) {
  return (
    <div className={`card ${styles.blogCard}`}>
      <div className={styles.cardOverlayShadow} />
      <img src={post.image} className="card-img w-100 h-100" alt="..." />
      <div className="card-img-overlay">
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
        <div className="fs-4 text-center mt-2">
          <p>{post.title}</p>
        </div>
        <div className="position-absolute bottom-0 d-flex justify-content-between w-75">
          <div className="d-flex gap-4">
            <div className="d-flex flex-column align-items-center">
              {!post.isLiked && (
                <AiOutlineLike
                  className="fs-4"
                  style={{ cursor: "pointer" }}
                  onClick={() => onLike(post.id)}
                />
              )}
              {post.isLiked && (
                <AiFillLike
                  className="fs-4 text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => onRemoveLike(post.id)}
                />
              )}
              <span>{post.likes}</span>
            </div>
            <div className="d-flex flex-column align-items-center">
              {!post.isDisliked && (
                <AiOutlineDislike
                  className="fs-4"
                  onClick={() => onDislike(post.id)}
                  style={{ cursor: "pointer" }}
                />
              )}
              {post.isDisliked && (
                <AiFillDislike
                  className="fs-4 text-primary"
                  onClick={() => onRemoveDislike(post.id)}
                  style={{ cursor: "pointer" }}
                />
              )}
              <span>{post.dislikes}</span>
            </div>
            <div className="d-flex flex-column align-items-center">
              <AiOutlineEye className="fs-4" />
              <span>{post.views}</span>
            </div>
          </div>
          <div className="fs-5" style={{ cursor: "pointer" }}>
            <span className="border-bottom">Read</span>
          </div>
        </div>
      </div>
    </div>
  );
}
