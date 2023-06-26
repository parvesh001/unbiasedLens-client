import React from "react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";

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
            className="fs-4"
            style={{ cursor: "pointer" }}
            onClick={onLike}
          />
        )}
        {post.isLiked && (
          <AiFillLike
            className="fs-4 text-danger"
            style={{ cursor: "pointer" }}
            onClick={onRemoveLike}
          />
        )}
        <span>{post.likes}</span>
      </div>
      <div className="d-flex flex-column align-items-center">
        {!post.isDisliked && (
          <AiOutlineDislike
            className="fs-4"
            onClick={onDislike}
            style={{ cursor: "pointer" }}
          />
        )}
        {post.isDisliked && (
          <AiFillDislike
            className="fs-4 text-primary"
            onClick={onRemoveDislike}
            style={{ cursor: "pointer" }}
          />
        )}
        <span>{post.dislikes}</span>
      </div>
    </>
  );
}
