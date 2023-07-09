import React from "react";
import styles from "./Pagination.module.scss";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className={styles.pagination}>
      <ul className={styles.pageList}>
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`${styles.pageItem} ${
              pageNumber === currentPage ? styles.active : ""
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
