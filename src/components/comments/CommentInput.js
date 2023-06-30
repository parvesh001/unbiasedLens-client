import React, { useState } from "react";
import Input from "../../UI/Input";
import { MdSend } from "react-icons/md";

export default function CommentInput({onComment}) {
  const [comment, setComment] = useState("");

  const commentInputChangeHandler = (event) => {
    setComment(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if(!comment.trim().length) return;
    onComment(comment)
  };

  return (
    <form
      onSubmit={formSubmitHandler}
      className="d-flex align-items-center mt-2 mt-md-5 position-relative"
    >
      <Input
        label="leave a comment here.."
        type="text"
        id="comment-input"
        placeholder="leave a comment here"
        onChange={commentInputChangeHandler}
      />

      <button
        type="submit"
        className="position-absolute end-0 translate-middle mt-2 border-0 bg-transparent"
      >
        <MdSend className="text-primary fs-4" style={{ cursor: "pointer" }} />
      </button>
    </form>
  );
}
