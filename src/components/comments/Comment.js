import React from "react";

export default function Comment({comment }) {
  const createdTime = new Date(comment.createdAt).toDateString()
  return (
    <>
      <div className="mb-2 text-light">
        <img
          src={comment.author.photo}
          width="40px"
          className="rounded-circle me-2"
          alt={comment.author.name}
        />
        <span className="fw-medium" style={{ cursor: "pointer" }}>
          {comment.author.name}
        </span>
      </div>
      <div className="ps-5 mt-1 text-light">
        <p className="mb-0 lh-0">{comment.content}</p>
        <small className="fw-lighter" style={{ fontSize: "12px" }}>
          {createdTime}
        </small>
        <hr />
      </div>
    </>
  );
}
