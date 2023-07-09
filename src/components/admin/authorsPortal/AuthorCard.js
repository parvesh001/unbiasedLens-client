import React from "react";
import styles from "./AuthorCard.module.scss";
import { useNavigate } from "react-router-dom";

const AuthorCard = ({ author, isBlocked, onToggleBlock }) => {
  const { name, email, photo, _id } = author;
  const navigate = useNavigate()

  const handleToggleBlock = () => {
    onToggleBlock(author.id);
  };

  return (
    <div className={styles.authorCard}>
      <div className={styles.authorInfo} onClick={()=>navigate(`/author/${name}/${_id}`)}>
        <div className={styles.authorPhoto}>
          <img src={photo} alt={name} />
        </div>
        <div className={styles.authorDetails}>
          <h3>{name}</h3>
          <p>{email}</p>
        </div>
      </div>
      <button
        className={`${styles.blockButton} ${isBlocked ? styles.blocked : ""}`}
        onClick={handleToggleBlock}
      >
        {isBlocked ? "Unblock" : "Block"}
      </button>
    </div>
  );
};

export default AuthorCard;
