import React, { useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import useHttp from "../../hooks/use-http";
import styles from "./Author.module.scss";

export default function Author({ name, id, photo, email, className }) {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { sendRequest: viewAuthorProfile } = useHttp();

  const authorClickHandler = async () => {
    if (token) {
      try {
        await viewAuthorProfile({
          endpoint: `view/author/${id}`,
          method: "POST",
          headers: { Authorization: "Bearer " + token },
        });
      } catch (err) {
        console.log(err)
      }
    }
    navigate(`/author/${name}/${id}`);
  };

  return (
   <>
    <div className={`${styles.authorContainer} ${className}`} onClick={authorClickHandler}>
      <img src={photo} className={styles.authorImg} alt={name} />
      <div className={styles.author}>
        <p className={styles.authorName}>{name}</p>
        <small>{email}</small>
      </div>
    </div>
   </>
  );
}
