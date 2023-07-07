import React from "react";
import ModalScrollable from "../../UI/ModalScrollable";
import Author from "../author/Author";

export default function AuthorStats({ title, data, emptyMessage, onClose }) {
  let body;
  if (data.length) {
    body = data.map((d) => (
      <Author
        key={d._id}
        id={d._id}
        name={d.name}
        photo={d.photo}
        email={d.email}
        className="mb-2"
      />
    ));
  } else {
    body = (
      <p className="text-center text-secondary fw-semibold">{emptyMessage}</p>
    );
  }

  return <ModalScrollable title={title} body={body} onClose={onClose} />;
}
