import React from "react";
import { useNavigate } from "react-router-dom";

export default function AuthorListItem({ name, photo, id }) {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex gap-2 align-items-center mb-2"
      onClick={() => navigate(`/author/${name}/${id}`)}
      style={{cursor:'pointer'}}
    >
      <div>
        <img src={photo} className="rounded-circle" width="30" alt={name} />
      </div>
      <div>
        <span className="text-secondary fw-semibold">{name}</span>
      </div>
    </div>
  );
}
