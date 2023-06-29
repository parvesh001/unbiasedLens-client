import React from "react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import styles from './BlogInteractions.module.scss'

export default function BlogInteractions({
  post,
  onLike,
  onRemoveLike,
  onDislike,
  onRemoveDislike,
}) {
  return (
    <>
      <div className="d-flex flex-column align-items-center">
        {!post.isLiked && (
          <AiOutlineLike
            className={styles.blogInteractionIcon}
            style={{ cursor: "pointer" }}
            onClick={onLike}
          />
        )}
        {post.isLiked && (
          <AiFillLike
            className={styles.blogInteractionIcon}
            style={{ cursor: "pointer" }}
            onClick={onRemoveLike}
          />
        )}
        <span>{post.likes}</span>
      </div>
      <div className="d-flex flex-column align-items-center">
        {!post.isDisliked && (
          <AiOutlineDislike
            className={styles.blogInteractionIcon}
            onClick={onDislike}
            style={{ cursor: "pointer" }}
          />
        )}
        {post.isDisliked && (
          <AiFillDislike
            className={styles.blogInteractionIcon}
            onClick={onRemoveDislike}
            style={{ cursor: "pointer" }}
          />
        )}
        <span>{post.dislikes}</span>
      </div>
    </>
  );
}
