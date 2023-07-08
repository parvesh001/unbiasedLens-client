import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPortalLinks() {
  const navigate = useNavigate();
  return (
    <>
      <li className="nav-item">
        <button
          className="btn btn-primary mx-md-2 mt-3 mt-md-0"
          onClick={() => navigate("/admin-portal/authors")}
        >
          Authors
        </button>
      </li>

      <li className="nav-item">
        <button className="btn btn-primary mx-md-2 mt-3 mt-md-0" onClick={""}>
          Categories
        </button>
      </li>
      <li className="nav-item">
        <button className="btn btn-primary mx-md-2 mt-3 mt-md-0" onClick={""}>
          Add Category
        </button>
      </li>
    </>
  );
}
