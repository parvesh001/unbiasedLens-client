import React from "react";

export default function Alert({ scenario, message }) {
  return (
    <>
      {scenario === "success" && (
        <div
          className="alert alert-success alert-dismissible fade show position-absolute position-absolute top-0 start-50 translate-middle-x mt-5"
          role="alert"
          style={{ width: "40rem", maxWidth: "96vw" }}
        >
          <strong>Success!</strong> {message}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      {scenario === "error" && (
        <div
          className="alert alert-danger alert-dismissible fade show position-absolute top-0 start-50 translate-middle-x mt-5"
          role="alert"
          style={{ width: "40rem", maxWidth: "96vw" }}
        >
          <strong>Failed!</strong> {message}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
    </>
  );
}
