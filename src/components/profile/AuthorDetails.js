import React from "react";
import styles from "./AuthorDetails.module.scss";

export default function CurrentAuthorDetails() {
 
  let current = true;
  return (
    <div className={styles.currentAuthorDetailsContainer}>
      <div className="d-flex w-100 justify-content-between">
        <div className={styles.currentAuthorMetaData}>
          <div>
            <h6>33</h6>
            <span>Posts</span>
          </div>
          <div>
            <h6>66</h6>
            <span>Followers</span>
          </div>
          <div>
            <h6>66</h6>
            <span>Followings</span>
          </div>
        </div>
        <div className={styles.currentAuthorInformation}>
          <div className={styles.currentAuthorImg}>
            <img
              src="/img/user1.jpg"
              className="rounded-circle"
              width="100%"
              alt="user name"
            />
          </div>
          <div className={styles.currentAuthorNameEmail}>
            <h4>Parvesh</h4>
            <span>parvesh830@gmail.com</span>
          </div>
        </div>
        <div>
         {current &&  <button className="btn btn-primary">See Profile Viewers</button>}
         {!current &&  <button className="btn  btn-outline-primary">Follow</button>}
        </div>
      </div>
    </div>
  );
}
