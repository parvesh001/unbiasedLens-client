import React from "react";
import { MdAddAPhoto } from "react-icons/md";
import styles from "./AuthorDetails.module.scss";
import { useNavigate } from "react-router-dom";

export default function AuthorDetails({
  current,
  author,
  onShowProfileViewers,
  onShowFollowers,
  onShowFollowings,
}) {
  const navigate = useNavigate();
  return (
    <div className={styles.authorDetailsContainer}>
      <div className="d-flex flex-column flex-lg-row w-100 justify-content-between">
        <div className={styles.authorMetaData}>
          <div
            role="button"
            onClick={() =>
              navigate(`/author/${author.name}/${author._id}/blogs`)
            }
          >
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
              <MdAddAPhoto
                className={styles.addPhotoIcon}
                onClick={()=>navigate(
                  `/author/${author.name}/${author._id}/upload-profile`
                )}
              />
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
