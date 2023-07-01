import React from "react";
import ReactDOM from "react-dom";

export default function Alert({ scenario, message, dismiss }) {
  return ReactDOM.createPortal(
    <div className="position-fixed top-0 start-50 translate-middle-x mt-5 z-3">
      <div
        className={`alert alert-${
          scenario === "error" ? "danger" : "success"
        } d-flex justify-content-between align-items-center p-2 p-md-3`}
        role="alert"
        style={{ width: "40rem", maxWidth: "96vw" }}
      >
        <p>
          <strong className="text-uppercase me-2">{scenario}!</strong> {message}
        </p>
        <button type="button" className="btn-close" onClick={dismiss}></button>
      </div>
    </div>,
    document.getElementById("alert-root")
  );
}
