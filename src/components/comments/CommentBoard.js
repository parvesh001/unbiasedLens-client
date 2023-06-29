import React from "react";
import Comments from "./Comments";
import CommentInput from "./CommentInput";

export default function CommentBoard({comments}) {
  const commentsLength = comments.length;

  return (
    <section className="mt-3">
      <h6 className="text-light">Comments ({commentsLength})</h6> <hr className="text-light" />
      <Comments comments={comments}/>
      <CommentInput/>
    </section>
  );
}
