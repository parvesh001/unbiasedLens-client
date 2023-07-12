import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import styles from "./BlogCard.module.scss";

import BlogInteractions from "./BlogInteractions";
import { useNavigate } from "react-router-dom";
import Author from "../author/Author";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";

export default function BlogCard({
  post,
  onRead,
  onLike,
  onDislike,
  onRemoveLike,
  onRemoveDislike,
  current,
}) {
  const navigate = useNavigate();

  const readClickHandler = () => {
    onRead();
    navigate(`/blogs/category/${post.slug}/${post.id}`);
  };

  return (
    <motion.div
      className={`card p-0  ${styles.blogCard}`}
      whileHover={{ boxShadow: "0px 2px 20px rgba(0.0.0.4)", y: -10 }}
      animate={{ x: 0, opacity: 1 }}
      initial={{ x: "100vw", opacity: 0 }}
      transition={{type:'spring', stiffness: 100, duration: 1.5 }}
    >
      <div className={styles.cardOverlayShadow} />
      <LazyLoadImage
        src={post.image}
        className={`card-img ${styles.blogCardImg}`}
        alt={post.title}
        effect="blur"
        placeholderSrc="/img/pexels-img.jpg"
      />
      <div className="card-img-overlay d-grid p-2 p-md-3">
        <div className="card-subtitle">
          <Author
            id={post.authorId}
            name={post.author}
            email={post.authorEmail}
            photo={post.authorImg}
          />
        </div>
        <div className={`text-center mt-2 ${styles.blogPostTitle}`}>
          <p>{post.title}</p>
        </div>
        <div className="align-self-end d-flex justify-content-between">
          <div className="d-flex gap-4">
            <BlogInteractions
              post={post}
              onLike={onLike}
              onDislike={onDislike}
              onRemoveLike={onRemoveLike}
              onRemoveDislike={onRemoveDislike}
            />

            <div className="d-flex flex-column align-items-center">
              <AiOutlineEye className={styles.blogPostViewIcon} />
              <span>{post.views}</span>
            </div>
          </div>
          <div className="d-flex gap-2">
            <div
              className="fs-6"
              style={{ cursor: "pointer" }}
              onClick={readClickHandler}
            >
              <span className={`border-bottom ${styles.readBtn}`}>Read</span>
            </div>
            {current && (
              <div
                className="fs-6"
                style={{ cursor: "pointer" }}
                onClick={readClickHandler}
              >
                <span className={`border-bottom ${styles.readBtn}`}>
                  Update
                </span>
              </div>
            )}
            {current && (
              <div
                className="fs-6"
                style={{ cursor: "pointer" }}
                onClick={readClickHandler}
              >
                <span className={`border-bottom ${styles.readBtn}`}>
                  Delete
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
