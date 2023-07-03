import React from "react";
import styles from "./Loading.module.scss";
import Model from "../../UI/Model";

export default function Loading() {
  return (
    <Model>
      <div className="d-flex justify-content-center">
        <div className={styles["lds-ellipsis"]}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Model>
  );
}
