import React from "react";
import { MdAddAPhoto } from "react-icons/md";
import styles from "./AuthorDetails.module.scss";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AuthorDetails({
  current,
  alreadyFollowed,
  author,
  onFollow,
  onUnfollow,
  onShowProfileViewers,
  onShowFollowers,
  onShowFollowings,
}) {
  const navigate = useNavigate();
  return (
    <div className={styles.authorDetailsContainer}>
      <div className="d-flex flex-column flex-lg-row w-100 justify-content-between">
        <div className={styles.authorMetaData}>
          <motion.div
            role="button"
            onClick={() =>
              navigate(`/author/${author.name}/${author._id}/blogs`)
            }
            whileHover={{ scale: 1.1, y: -3 }}
            transition={{ type: "spring", stiffness: 200, duration: 0.2 }}
          >
            <h6>{author.posts.length}</h6>
            <span>Posts</span>
          </motion.div>
          <motion.div role="button" onClick={onShowFollowers}    whileHover={{ scale: 1.1, y: -3 }}
            transition={{ type: "spring", stiffness: 200, duration: 0.2 }}>
            <h6>{author.followers.length}</h6>
            <span>Followers</span>
          </motion.div>
          <motion.div role="button" onClick={onShowFollowings}    whileHover={{ scale: 1.1, y: -3 }}
            transition={{ type: "spring", stiffness: 200, duration: 0.2 }}>
            <h6>{author.followings.length}</h6>
            <span>Followings</span>
          </motion.div>
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
                onClick={() =>
                  navigate(
                    `/author/${author.name}/${author._id}/upload-profile`
                  )
                }
              />
            </div>
          )}
        </div>
        <div>
          {current ? (
            <motion.button className="btn btn-primary" onClick={onShowProfileViewers}    whileHover={{ scale: 1.1, y: -3 }}
            transition={{ type: "spring", stiffness: 200, duration: 0.2 }}>
              See Profile Viewers
            </motion.button>
          ) : alreadyFollowed ? (
            <button className="btn  btn-outline-primary" onClick={onUnfollow}>
              Unfollow
            </button>
          ) : (
            <button className="btn  btn-outline-primary" onClick={onFollow}>
              Follow
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
