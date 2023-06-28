import React from "react";
import Comments from "./Comments";
import CommentInput from "./CommentInput";

export default function CommentBoard() {
  return (
    <section className="mt-3">
      <h6 className="text-light">Comments (2)</h6> <hr className="text-light" />
      <Comments />
      <CommentInput/>
    </section>
  );
}
