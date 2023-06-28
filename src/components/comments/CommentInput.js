import React from "react";
import Input from "../../UI/Input";
import { MdSend } from "react-icons/md";

export default function CommentInput() {
  return (
    <div className="d-flex align-items-center mt-2 mt-md-5 position-relative">
      <Input
        label="leave a comment here.."
        type="text"
        id="comment-input"
        placeholder="leave a comment here"
      />

      <MdSend
        className="text-primary fs-4 position-absolute end-0 translate-middle mt-2"
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}
