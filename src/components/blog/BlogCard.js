import React, { useContext } from "react";
import { AiOutlineEye } from "react-icons/ai";
import styles from "./BlogCard.module.scss";
import { AuthContext } from "../../context/authContext";
import BlogInteractions from "./BlogInteractions";

export default function BlogCard({
  post,
  onLike,
  onDislike,
  onRemoveLike,
  onRemoveDislike,
}) {
  const { isLogedIn } = useContext(AuthContext);

  return (
    <div className={`card p-0  ${styles.blogCard}`}>
      <div className={styles.cardOverlayShadow} />
      <img
        src={post.image}
        className={`card-img ${styles.blogCardImg}`}
        alt="..."
      />
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
            {isLogedIn && (
              <BlogInteractions
                post={post}
                onLike={onLike}
                onDislike={onDislike}
                onRemoveLike={onRemoveLike}
                onRemoveDislike={onRemoveDislike}
              />
            )}
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
