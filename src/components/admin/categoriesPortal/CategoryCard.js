import React from "react";
import styles from "./CategoryCard.module.scss";

const CategoryCard = ({ category, onDelete, onUpdate }) => {
  const { name, description } = category;

  const handleDelete = () => {
    onDelete(category.id);
  };

  const handleUpdate = () => {
    onUpdate(category.id);
  };

  return (
    <div className={styles.categoryCard}>
      <h3 className={styles.categoryName}>{name}</h3>
      <p className={styles.categoryDescription}>{description}</p>
      <div className={styles.buttons}>
        <button className={styles.deleteButton} onClick={handleDelete}>
          Delete
        </button>
        <button className={styles.updateButton} onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
