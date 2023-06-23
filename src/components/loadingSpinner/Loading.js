import React from "react";
import styles from "./Loading.module.scss";

export default function Loading() {
  return (
    <div className="d-flex justify-content-center">
      <div class={styles["lds-ellipsis"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
