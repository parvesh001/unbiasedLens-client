import React from "react";
import ModalScrollable from "../../UI/ModalScrollable";
import AuthorListItem from "./AuthorListItem";

export default function AuthorStats({ title, data, emptyMessage, onClose }) {
  let body;
  if (data.length) {
    body = data.map((d) => (
      <AuthorListItem key={d._id} id={d._id} name={d.name} photo={d.photo} />
    ));
  } else {
    body = (
      <p className="text-center text-secondary fw-semibold">{emptyMessage}</p>
    );
  }

  return <ModalScrollable title={title} body={body} onClose={onClose} />;
}
