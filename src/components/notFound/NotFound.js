import React from "react";
import styles from "./NotFound.module.scss";

export default function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <div>
        <img
          src="/img/no-data-found.png"
          className="img-fluid"
          alt="no data found"
        />
      </div>
    </div>
  );
}
