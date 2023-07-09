import React from "react";
import AddCategoryPortal from "../../components/admin/categoriesPortal/addCategoryPortal/AddCategoryPortal";
import styles from "./AdminAddCategoryPortalPage.module.scss";

export default function AdminAddCategoryPortalPage() {
  return (
    <div className={styles.addCategoryPortalPage}>
      <h2>Add Category</h2>
      <AddCategoryPortal />
    </div>
  );
}
