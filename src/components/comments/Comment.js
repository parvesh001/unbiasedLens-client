import React from "react";
import { useNavigate } from "react-router-dom";

export default function Comment({comment }) {
  const createdTime = new Date(comment.createdAt).toDateString();
  const navigate = useNavigate();
  const authorName = comment.author.name;
  const authorPhoto = comment.author.photo;
  const authorId = comment.author._id;

  return (
    <>
      <div className="mb-2 text-light">
        <img
          src={authorPhoto}
          width="40px"
          className="rounded-circle me-2"
          alt={authorName}
        />
        <span className="fw-medium" style={{ cursor: "pointer" }} onClick={()=>navigate(`/author/${authorName}/${authorId}`)}>
          {authorName}
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
