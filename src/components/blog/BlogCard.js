import React from "react";
import styles from "./BlogCard.module.scss";

export default function BlogCard() {
  return (
    <div className={`card ${styles.blogCard}`}>
      <div className={styles.cardOverlayShadow} />
      <img src="/img/pexels.jpg" class="card-img w-100 h-100" alt="..." />
      <div class="card-img-overlay">
        <div className="card-subtitle">
          <div className="d-flex gap-2" style={{cursor:'pointer'}}>
            <div className={styles.cardUserImg}>
              <img
                src="/img/user-1.jpg"
                className="w-100 rounded-circle"
                alt="author"
              />
            </div>
            <span className={styles.cardUserName}>Jatin</span>
          </div>
        </div>
        <div className="fs-4 text-center mt-2">Inroduction To JavaScript</div>
        <div className="position-absolute bottom-0 d-flex justify-content-between w-75">
          <div>
           <span>Like</span>
           <span>Dislike</span>
           <span>views</span>
          </div>
          <span>Read More</span>
        </div>
      </div>
    </div>
  );
}
