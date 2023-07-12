import React from "react";
import styles from "./Pagination.module.scss";
import { motion } from "framer-motion";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className={styles.pagination}>
      <ul className={styles.pageList}>
        {pageNumbers.map((pageNumber) => (
          <motion.li
            key={pageNumber}
            className={`${styles.pageItem} ${
              pageNumber === currentPage ? styles.active : ""
            }`}
            onClick={() => onPageChange(pageNumber)}
            whileHover={{scale:1.1, y:-3, border:'1px solid #007BFF'}}
            transition={{type:'spring', duration:.4}}
            initial={{y:'-100vw'}}
            animate={{y:0}}
          >
            {pageNumber}
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
