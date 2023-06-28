import React from "react";

export default function Comment() {
  return (
    <>
      <div className="mb-2 text-light">
        <img
          src="/img/user1.jpg"
          width="40px"
          className="rounded-circle me-2"
          alt="author"
        />
        <span className="fw-medium" style={{ cursor: "pointer" }}>
          Parvesh Verma
        </span>
      </div>
      <div className="ps-5 mt-1 text-light">
        <p className="mb-0 lh-0">
          This is very informative blog sir, i appreciate your efforts.
        </p>
        <small className="fw-lighter" style={{fontSize:'12px'}}>20-5-2023</small>
        <hr />
      </div>
    </>
  );
}
