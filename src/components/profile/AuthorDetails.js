import React from "react";
import { MdAddAPhoto } from "react-icons/md";
import styles from "./AuthorDetails.module.scss";

export default function AuthorDetails({
  current,
  author,
  onShowProfileViewers,
  onShowFollowers,
  onShowFollowings,
}) {
  return (
    <div className={styles.authorDetailsContainer}>
      <div className="d-flex w-100 justify-content-between">
        <div className={styles.authorMetaData}>
          <div>
            <h6>{author.posts.length}</h6>
            <span>Posts</span>
          </div>
          <div role="button" onClick={onShowFollowers}>
            <h6>{author.followers.length}</h6>
            <span>Followers</span>
          </div>
          <div role="button" onClick={onShowFollowings}>
            <h6>{author.followings.length}</h6>
            <span>Followings</span>
          </div>
        </div>
        <div className={styles.authorInformation}>
          <div>
            <div className={styles.authorImg}>
              <img
                src={author.photo}
                className="rounded-circle"
                width="100%"
                alt={author.name}
              />
            </div>
            <div className={styles.authorNameEmail}>
              <h4>{author.name}</h4>
              <span>{author.email}</span>
            </div>
          </div>
          {current && (
            <div>
              <label htmlFor="upload-photo">
                <MdAddAPhoto className={styles.addPhotoIcon} />
              </label>
              <input type="file" id="upload-photo" hidden />
            </div>
          )}
        </div>
        <div>
          {current && (
            <button className="btn btn-primary" onClick={onShowProfileViewers}>
              See Profile Viewers
            </button>
          )}
          {!current && (
            <button className="btn  btn-outline-primary">Follow</button>
          )}
        </div>
      </div>
    </div>
  );
}
