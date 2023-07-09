import React from "react";
import AddCategoryPortalForm from "./AddCategoryPortalForm";
import styles from "./AddCategoryPortal.module.scss";

export default function AddCategoryPortal() {
  return (
    <div className={styles.addCategoryPortal}>
      <AddCategoryPortalForm />
    </div>
  );
}
