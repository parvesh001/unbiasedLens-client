import React from "react";
import Author from "../author/Author";

export default function Comment({ comment }) {
  const createdTime = new Date(comment.createdAt).toDateString();
  const authorName = comment.author.name;
  const authorPhoto = comment.author.photo;
  const authorId = comment.author._id;
  const authorEmail = comment.author.email;

  return (
    <>
      <div className="mb-2 text-light">
        <Author
          id={authorId}
          name={authorName}
          email={authorEmail}
          photo={authorPhoto}
        />
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
